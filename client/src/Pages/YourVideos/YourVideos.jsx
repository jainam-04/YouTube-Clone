import React from "react";
import "./YourVideos.css";
import video1 from "../../Component/Videos/vid.mp4";
import LeftSideBar from "../../Component/LeftSideBar/LeftSideBar";
import ShowVideoGrid from "../../Component/ShowVideoGrid/ShowVideoGrid";

const YourVideos = () => {
  const YourVideosVideoList = [
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
  const currentUser = 1;
  return (
    <>
      <div className="Container_Pages_App">
        <LeftSideBar />
        <div className="Container2_Pages_App">
          <div className="Container_YourVideos">
            <h1>Your Videos</h1>
            {currentUser ? (
              <>
                <ShowVideoGrid vid={YourVideosVideoList} />
              </>
            ) : (
              <>
                <h3>Please login to see your uploaded videos</h3>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default YourVideos;
