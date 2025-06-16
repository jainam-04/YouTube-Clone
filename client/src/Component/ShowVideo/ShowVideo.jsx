import React from "react";
import "./ShowVideo.css";
import moment from "moment";
import {Link} from "react-router-dom";

const ShowVideo = ({vid}) => {
  return (
    <>
      <Link to={`/videoPage/${vid._id}`}>
        <video
          src={`http://localhost:5000/${vid?.file_path}`}
          className="Video_ShowVideo"
        />
      </Link>
      <div className="Video_Description">
        <div className="Channel_Logo_App">
          <div className="First_Char_Logo_App">
            {vid?.uploader?.charAt(0).toUpperCase()}
          </div>
        </div>

        <div className="Video_Details">
          <p className="Title_Video_ShowVideo">{vid?.video_title}</p>
          <pre className="Video_Views_UploadTime">{vid?.uploader}</pre>
          <pre className="Video_Views_UploadTime">
            {vid?.views} views
            <div className="Dot"></div>
            {moment(vid?.createdAt).fromNow()}
          </pre>
        </div>
      </div>
    </>
  );
};

export default ShowVideo;
