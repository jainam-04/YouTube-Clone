import VideoFiles from "../Models/VideoFiles.js";
import path from "path";
import fs from "fs";
import { spawn } from "child_process";

export const uploadVideo = async (req, res) => {
      if (req.file === undefined) {
            res.status(404).json({ message: "Please upload a mp4 video file only!" })
      }
      else {
            try {
                  const { title, channel, uploader } = req.body;
                  const inputFilePath = req.file.path;
                  const fileName = req.file.originalname;
                  const videoId = fileName.split(".")[0];
                  const outputDir = path.join("Uploads", videoId).replace(/\\/g, "/");

                  fs.mkdirSync(outputDir, { recursive: true });

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
                        console.log(`[FFmpeg]: ${data}`);
                  });
                  ffmpeg.on("close", async (code) => {
                        if (code !== 0) {
                              return res.status(500).json({ message: `FFmpeg failed with code: ${code}` });
                        }
                        const newVideo = new VideoFiles({
                              video_title: title,
                              file_name: fileName,
                              file_path: `${outputDir}/master.m3u8`,
                              file_type: req.file.mimetype,
                              file_size: req.file.size,
                              video_channel: channel,
                              uploader: uploader
                        });
                        await newVideo.save();
                        fs.unlink(inputFilePath, (err)=>{
                              if(err){
                                    console.error(`Failed to delete original .mp4: ${err}`);
                              }
                        });
                        res.status(200).send("File Uploaded Successfully!!");
                  });

                  // const file = new VideoFiles({
                  //       video_title: req.body.title,
                  //       file_name: req.file.originalname,
                  //       file_path: req.file.path,
                  //       file_type: req.file.mimetype,
                  //       file_size: req.file.size,
                  //       video_channel: req.body.channel,
                  //       uploader: req.body.uploader
                  // })
                  // console.log(file);
                  // await file.save();
                  // res.status(200).send("File uploaded successfully!!");
            } catch (error) {
                  res.status(404).json({ message: error.message })
                  return
            }
      }
}

export const getAllVideos = async (req, res) => {
      try {
            const files = await VideoFiles.find();
            res.status(200).send(files);
      } catch (error) {
            res.status(404).json({ message: error.message });
            return
      }
}