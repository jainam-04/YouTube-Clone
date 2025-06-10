import React from "react";
import video1 from "../Videos/vid.mp4";
import ShowVideo from "../ShowVideo/ShowVideo";

const ShowVideoList = ({video_id, key}) => {
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
  return (
    <>
      <div className="Container_ShowVideoGrid">
        {videoList
          .filter((q) => q._id === video_id)
          .map((vi) => {
            return (
              <div className="Video_Box_App" key={key}>
                <ShowVideo vid={vi} />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ShowVideoList;
