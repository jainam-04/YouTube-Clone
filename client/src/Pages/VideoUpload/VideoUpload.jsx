import React, {useState} from "react";
import "./VideoUpload.css";
import {buildStyles, CircularProgressbar} from "react-circular-progressbar";
import {useSelector, useDispatch} from "react-redux";
import {uploadVideo} from "../../Action/Video.js";
const VideoUpload = ({setVideoUploadPage}) => {
  const [title, setTitle] = useState("");
  const [videoFile, setVideoFile] = useState("");
  const [progress, setProgress] = useState(0);
  const handleSetVideoFile = (e) => {
    setVideoFile(e.target.files[0]);
  };
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUserReducer);
  const fileOption = {
    onUploadProgress: (progressEvent) => {
      const {loaded, total} = progressEvent;
      const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
      setProgress(percentage);
      if (percentage === 100) {
        setTimeout(function () {}, 3000);
        setVideoUploadPage(false);
      }
    },
  };
  const uploadVideoFile = () => {
    if (!title) {
      alert("Please enter title of the video!!");
    } else if (!videoFile) {
      alert("Please attach the video file!!");
    } else if (videoFile.size > 1000000) {
      alert("Please attach the video file less than 1 kb!!");
    } else {
      const fileData = new FormData();
      fileData.append("file", videoFile);
      fileData.append("title", title);
      fileData.append("channel", currentUser?.result?._id);
      fileData.append("uploader", currentUser?.result?.name);
      console.log(videoFile);
      dispatch(uploadVideo({fileData:fileData, fileOption:fileOption}));
    }
  };

  return (
    <>
      <div className="Container_VideoUpload">
        <input
          type="submit"
          name="text"
          value={"X"}
          onClick={() => setVideoUploadPage(false)}
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
                style={{fontSize: "1rem"}}
                onChange={(e) => handleSetVideoFile(e)}
                className="iBox_VideoUpload"
              />
            </label>
          </div>
          <div className="iBox_Div_VideoUpload">
            <input
              type="submit"
              onClick={() => uploadVideoFile()}
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
    </>
  );
};

export default VideoUpload;
