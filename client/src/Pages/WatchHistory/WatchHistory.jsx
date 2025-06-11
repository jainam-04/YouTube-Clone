import React from "react";
import video1 from "../../Component/Videos/vid.mp4";
import WHL from "../../Component/WHL/WHL";

const WatchHistory = () => {
  const watchHistoryVideoList = [
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
  return <WHL page={"History"} videoList={watchHistoryVideoList} />;
};

export default WatchHistory;
