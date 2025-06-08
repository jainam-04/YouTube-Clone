import React from "react";
import {useParams} from "react-router-dom";
import LeftSideBar from "../../Component/LeftSideBar/LeftSideBar";
import ShowVideoGrid from "../../Component/ShowVideoGrid/ShowVideoGrid";
import video1 from "../../Component/Videos/vid.mp4";

const Search = () => {
  const {searchQuery} = useParams();
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
      <div className="Container_Pages_App">
        <LeftSideBar />
        <div className="Container2_Pages_App">
          <ShowVideoGrid vid={videoList} />
        </div>
      </div>
    </>
  );
};

export default Search;
