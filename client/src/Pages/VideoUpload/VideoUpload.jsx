import React, {useEffect, useRef, useState} from "react";
import "./VideoUpload.css";
import {buildStyles, CircularProgressbar} from "react-circular-progressbar";
import {useSelector, useDispatch} from "react-redux";
import {uploadVideo} from "../../Action/Video.js";
import changeThemeBasedOnTime from "../../Utils/ChangeThemeBasedOnTime.js";
import axios from "axios";

function baseNameNoExt(name) {
  const dot = name.lastIndexOf(".");
  return dot >= 0 ? name.slice(0, dot) : name;
}

const VideoUpload = ({setVideoUploadPage}) => {
  const [title, setTitle] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const uploadPctRef = useRef();
  const serverPctRef = useRef();
  const pollTimerRef = useRef();
  const jobIdRef = useRef();
  const handleSetVideoFile = (e) => {
    const f = e.target.files?.[0];
    setVideoFile(f || null);
  };
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUserReducer);
  const state = currentUser?.result?.state;
  const theme = changeThemeBasedOnTime(state);
  // polling
  const startPolling = (jobId) => {
    stopPolling();
    jobIdRef.current = jobId;
    pollTimerRef.current = setInterval(async () => {
      try {
        const {data} = await axios.get(`https://youtube-clone-ihgl.onrender.com/video/progress/${jobId}`);
        const server = Math.max(0, Math.min(100, data?.percent ?? 0));
        serverPctRef.current = server;

        // combine: browser upload counts for first quarter of bar
        const combined = Math.max(
          Math.round(uploadPctRef.current * 0.25),
          server
        );
        setProgress(combined);

        if (server >= 100) {
          stopPolling();
          setTimeout(() => setVideoUploadPage(false), 600);
        }
      } catch (e) {
        // ignore transient errors
      }
    }, 1200);
  };

  const stopPolling = () => {
    if (pollTimerRef.current) {
      clearInterval(pollTimerRef.current);
      pollTimerRef.current = null;
    }
  };

  useEffect(() => () => stopPolling(), []);

  const fileOption = {
    onUploadProgress: (progressEvent) => {
      const {loaded, total} = progressEvent;
      const pct = total ? Math.floor((loaded / total) * 100) : 0;
      uploadPctRef.current = pct;
      // show quick feedback before server starts reporting
      const optimistic = Math.round(pct * 0.25);
      setProgress((prev) => Math.max(prev, optimistic));
    },
  };
  const uploadVideoFile = () => {
    if (!title) return alert("Please enter title of the video!!");
    if (!videoFile) return alert("Please attach the video file!!");
    if (videoFile.size > 100 * 1024 * 1024)
      return alert("Please attach the video file less than 100 MB!!");

    const jobId = baseNameNoExt(videoFile.name);
    startPolling(jobId);

    const fileData = new FormData();
    fileData.append("file", videoFile);
    fileData.append("title", title);
    fileData.append("channel", currentUser?.result?._id);
    fileData.append("uploader", currentUser?.result?.name);
    fileData.append("clientVideoId", jobId); // <— important

    dispatch(uploadVideo({fileData, fileOption}))
      .then(() => {
        // server will keep polling until 100%; nothing to do here
      })
      .catch(() => {
        stopPolling();
      });
  };

  return (
    <div className={theme}>
      <div className="Container_VideoUpload">
        <input
          type="submit"
          name="text"
          value={"X"}
          onClick={() => {
            stopPolling();
            setVideoUploadPage(false);
          }}
          className="iButton_X"
        />
        <div className="Container2_VideoUpload">
          <div className="iBox_Div_VideoUpload">
            <input
              type="text"
              placeholder="Enter title of your video"
              maxLength={30}
              className="iBox_VideoUpload"
              onChange={(e) => setTitle(e.target.value)}
            />
            <label
              htmlFor="file"
              className="iBox_VideoUpload Button_VideoUpload"
            >
              <input
                type="file"
                name="file"
                accept="video/mp4"
                style={{fontSize: "1rem"}}
                onChange={handleSetVideoFile}
                className="iBox_VideoUpload"
              />
            </label>
          </div>

          <div className="iBox_Div_VideoUpload">
            <input
              type="submit"
              onClick={uploadVideoFile}
              value={"Upload"}
              className="iBox_VideoUpload Button_VideoUpload"
            />
            <div className="Loader iBox_Div_VideoUpload">
              <CircularProgressbar
                value={progress}
                text={`${progress}`}
                styles={buildStyles({
                  rotation: 0.25,
                  strokeLinecap: "butt",
                  textSize: "20px",
                  pathTransitionDuration: "0.5",
                  pathColor: `rgba(255, 255, 255, ${progress}/100)`,
                  textColor: "#f88",
                  trailColor: "#adff2f",
                  backgroundColor: "#3e98c7",
                })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoUpload;
