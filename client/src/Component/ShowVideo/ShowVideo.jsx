import React from "react";
import "./ShowVideo.css";
import moment from "moment";
import {Link} from "react-router-dom";

const ShowVideo = ({vid}) => {
  return (
    <>
      <Link to={"/"}>
        <video src={vid} className="Video_ShowVideo" />
      </Link>
      <div className="Video_Description">
        <div className="Channel_Logo_App">
          <div className="First_Char_Logo_App">
            {vid?.uploader?.charAt(0).toUpperCase()}
          </div>
        </div>

        <div className="Video_Details">
          <p className="Title_Video_ShowVideo">{vid?.title}</p>
          <pre className="Video_Views_UploadTime">{vid?.uploader}</pre>
          <pre className="Video_Views_UploadTime">
            {vid?.views} views
            <div className="Dot"></div>
            {moment(vid?.createDate).fromNow()}
          </pre>
        </div>
      </div>
    </>
  );
};

export default ShowVideo;
