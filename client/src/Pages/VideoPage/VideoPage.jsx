import React from "react";
import "./VideoPage.css";
import video1 from "../../Component/Videos/vid.mp4";
import {Link, useParams} from "react-router-dom";
import moment from "moment";
import LikeWatchLaterSaveButtons from "./LikeWatchLaterSaveButtons";
import Comments from "../../Component/Comments/Comments";

const VideoPage = () => {
  const videoList = [
    {
      _id: 1,
      video_src: video1,
      channel: "abc",
      title: "video 1",
      uploader: "abc",
      description: "Description of video 1",
    },
    {
      _id: 2,
      video_src: video1,
      channel: "abc",
      title: "video 2",
      uploader: "abc",
      description: "Description of video 2",
    },
    {
      _id: 3,
      video_src: video1,
      channel: "abc",
      title: "video 3",
      uploader: "abc",
      description: "Description of video 3",
    },
    {
      _id: 4,
      video_src: video1,
      channel: "abc",
      title: "video 4",
      uploader: "abc",
      description: "Description of video 4",
    },
  ];
  const currentUser = {
    result: {
      _id: 1,
      name: "abc",
      email: "abc@gmail.com",
      joined_on: "07/06/2025",
    },
  };
  const {vid} = useParams();
  const vidNumber = parseInt(vid, 10);
  const vv = videoList?.filter((q) => q._id === vidNumber)[0];
  return (
    <>
      <div className="Container_VideoPage">
        <div className="Container2_VideoPage">
          <div className="Video_Display_Screen_VideoPage">
            <video
              src={video1}
              className="Video_ShowVideo_VideoPage"
              controls
            ></video>
            <div className="Video_Details_VideoPage">
              <div className="Video_Buttons_Title_VideoPage_Container">
                <p className="Video_Title_VideoPage">{vv?.title}</p>
                <div className="Views_Date_Buttons_VideoPage">
                  <div className="Views_VideoPage">
                    {vv?.views} views <div className="Dot"></div>{" "}
                    {moment(vv?.createDate).fromNow()}
                  </div>
                  <LikeWatchLaterSaveButtons vv={vv} vid={vid} />
                </div>
              </div>
              <Link to={"/"} className="Channel_Details_VideoPage">
                <b className="Channel_Logo_VideoPage">
                  <div className="First_Char_Logo_App">
                    {vv?.uploader.charAt(0).toUpperCase()}
                  </div>
                </b>
                <p className="Channel_Name_VideoPage">{vv?.uploader}</p>
              </Link>
              <div className="Comments_VideoPage">
                <h2>
                  <u>Comments</u>
                </h2>
                <Comments video_id={vv._id} />
              </div>
            </div>
          </div>
          <div className="MoreVideoBar">More Videos</div>
        </div>
      </div>
    </>
  );
};

export default VideoPage;
