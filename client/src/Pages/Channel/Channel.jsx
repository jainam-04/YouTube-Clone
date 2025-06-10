import React from "react";
import video1 from "../../Component/Videos/vid.mp4";
import {useParams} from "react-router-dom";
import LeftSideBar from "../../Component/LeftSideBar/LeftSideBar";
import DescribeChannel from "./DescribeChannel";
import ShowVideoGrid from "../../Component/ShowVideoGrid/ShowVideoGrid";

const Channel = ({setEditCreateChannelButton, setVideoUploadPage}) => {
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
  const {cid} = useParams();
  return (
    <>
      <div className="Container_Pages_App">
        <LeftSideBar />
        <div className="Container2_Pages_App">
          <DescribeChannel
            cid={cid}
            setVideoUploadPage={setVideoUploadPage}
            setEditCreateChannelButton={setEditCreateChannelButton}
          />
          <ShowVideoGrid videoList={videoList} />
        </div>
      </div>
    </>
  );
};

export default Channel;
