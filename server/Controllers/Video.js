import VideoFiles from "../Models/VideoFiles.js";
import path from "path";
import fs from "fs";
import { spawn } from "child_process";
import { uploadFolderToStorj } from "../Helper/StorjUpload.js";
import { initProgress, setProgress, getProgress, completeProgress, failProgress } from "../utils/Progress.js";

function basenameNoExt(file) {
      const base = path.basename(file);
      const dot = base.lastIndexOf('.');
      return dot >= 0 ? base.slice(0, dot) : base;
}

// quick ffprobe to get duration (seconds)
async function probeDurationSeconds(input) {
      return new Promise((resolve) => {
            const pr = spawn("ffprobe", [
                  "-v", "error",
                  "-show_entries", "format=duration",
                  "-of", "default=noprint_wrappers=1:nokey=1",
                  input
            ]);
            let out = "";
            pr.stdout.on("data", d => out += d.toString());
            pr.on("close", () => {
                  const s = parseFloat(out.trim());
                  resolve(Number.isFinite(s) ? s : 0);
            });
      });
}

// extract time=hh:mm:ss.xx from ffmpeg stderr
function parseFfmpegTime(line) {
      const m = /time=(\d{2}):(\d{2}):(\d{2}\.?\d*)/.exec(line);
      if (!m) return null;
      const [, hh, mm, ss] = m;
      return (+hh) * 3600 + (+mm) * 60 + parseFloat(ss);
}

export const uploadVideo = async (req, res) => {
      if (!req.file) return res.status(404).json({ message: "Please upload a mp4 video file only!" });

      try {
            const { title, channel, uploader, clientVideoId } = req.body;
            const inputFilePath = req.file.path;
            const fileName = req.file.originalname;
            const derivedId = basenameNoExt(fileName);
            const jobId = clientVideoId || derivedId;              // <— client sends this; fallback to name
            const outputDir = path.join("Uploads", jobId);

            initProgress(jobId);
            setProgress(jobId, { phase: "received", percent: 5, detail: "File received" });

            fs.mkdirSync(outputDir, { recursive: true });

            const totalDuration = await probeDurationSeconds(inputFilePath);

            // FFmpeg (we'll report 5% → 70%)
            setProgress(jobId, { phase: "ffmpeg", percent: 5, detail: "Starting HLS conversion" });

            const ffmpeg = spawn("ffmpeg", [
                  "-i", inputFilePath,
                  "-filter_complex",
                  `[0:v]split=4[v1][v2][v3][v4];` +
                  `[v1]scale=w=1920:h=1080[v1out];` +
                  `[v2]scale=w=1280:h=720[v2out];` +
                  `[v3]scale=w=854:h=480[v3out];` +
                  `[v4]scale=w=640:h=360[v4out]`,
                  "-map", "[v1out]", "-c:v:0", "libx264", "-b:v:0", "5000k", "-maxrate:v:0", "5350k", "-bufsize:v:0", "7500k",
                  "-map", "[v2out]", "-c:v:1", "libx264", "-b:v:1", "2800k", "-maxrate:v:1", "2996k", "-bufsize:v:1", "4200k",
                  "-map", "[v3out]", "-c:v:2", "libx264", "-b:v:2", "1400k", "-maxrate:v:2", "1498k", "-bufsize:v:2", "2100k",
                  "-map", "[v4out]", "-c:v:3", "libx264", "-b:v:3", "800k", "-maxrate:v:3", "856k", "-bufsize:v:3", "1200k",
                  "-map", "a:0", "-c:a:0", "aac", "-b:a:0", "192k", "-ac", "2",
                  "-map", "a:0", "-c:a:1", "aac", "-b:a:1", "128k", "-ac", "2",
                  "-map", "a:0", "-c:a:2", "aac", "-b:a:2", "96k", "-ac", "2",
                  "-map", "a:0", "-c:a:3", "aac", "-b:a:3", "64k", "-ac", "2",
                  "-f", "hls",
                  "-hls_time", "5",
                  "-hls_playlist_type", "vod",
                  "-hls_flags", "independent_segments",
                  "-hls_segment_filename", `${outputDir}/stream_%v/data%03d.ts`,
                  "-master_pl_name", "master.m3u8",
                  "-var_stream_map", "v:0,a:0 v:1,a:1 v:2,a:2 v:3,a:3",
                  `${outputDir}/stream_%v/playlist.m3u8`
            ]);

            ffmpeg.stderr.on("data", (data) => {
                  const line = data.toString();
                  // console.log(FFmpeg: ${line});
                  const t = parseFfmpegTime(line);
                  if (t != null && totalDuration > 0) {
                        const frac = Math.min(t / totalDuration, 1);
                        // map 5% → 70% for ffmpeg progress
                        const percent = Math.max(5, Math.min(70, Math.round(5 + frac * (70 - 5))));
                        setProgress(jobId, { phase: "ffmpeg", percent, detail: "Converting to HLS" });
                  }
            });

            ffmpeg.on("close", async (code) => {
                  if (code !== 0) {
                        failProgress(jobId, `FFmpeg failed with code: ${code}`);
                        return res.status(500).json({ message: `FFmpeg failed with code: ${code}`, jobId });
                  }

                  try {
                        setProgress(jobId, { phase: "upload", percent: 72, detail: "Uploading to Storj" });

                        const bucketName = process.env.STORJ_BUCKET_NAME;

                        // Progress mapping for Storj: 72% → 98% during file upload; 98% → 100% during rewrite
                        const masterUrl = await uploadFolderToStorj(
                              outputDir,
                              bucketName,
                              jobId,
                              (done, total) => {
                                    // first pass uploads: unknown split between upload & rewrite; we just map linearly 72..100
                                    const frac = Math.min(done / total, 1);
                                    const p = Math.round(72 + frac * (100 - 72));
                                    setProgress(jobId, { phase: p < 98 ? "upload" : "rewrite", percent: p, detail: p < 98 ? "Uploading" : "Rewriting playlists" });
                              }
                        );

                        const newVideo = new VideoFiles({
                              video_title: title,
                              file_name: fileName,
                              file_path: masterUrl,
                              file_type: req.file.mimetype,
                              file_size: req.file.size,
                              video_channel: channel,
                              uploader: uploader
                        });
                        await newVideo.save();

                        try { fs.unlinkSync(inputFilePath); } catch { }
                        try { fs.rmSync(outputDir, { recursive: true, force: true }); } catch { }

                        completeProgress(jobId);
                        res.status(200).json({ message: "File uploaded and stored on storj successfully", jobId, masterUrl });
                  } catch (error) {
                        failProgress(jobId, error.message);
                        console.log(`Upload to storj Error: ${error.message}`);
                        res.status(500).json({ message: "Failed to upload the video on storj", jobId });
                  }
            });
      } catch (error) {
            return res.status(404).json({ message: error.message });
      }
};

export const getAllVideos = async (req, res) => {
      try {
            const files = await VideoFiles.find();
            res.status(200).send(files);
      } catch (error) {
            res.status(404).json({ message: error.message });
      }
};

// new: progress endpoint
export const getProgressById = async (req, res) => {
      const { jobId } = req.params;
      return res.json(getProgress(jobId));
};