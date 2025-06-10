import React from "react";
import "./Library.css";
import {FaHistory} from "react-icons/fa";
import {AiOutlineLike} from "react-icons/ai";
import {MdOutlineWatchLater} from "react-icons/md";
import video1 from "../../Component/Videos/vid.mp4";
import LeftSideBar from "../../Component/LeftSideBar/LeftSideBar";
import WHLVideoList from "../../Component/WHL/WHLVideoList";

const Library = () => {
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
  return (
    <>
      <div className="Container_Pages_App">
        <LeftSideBar />
        <div className="Container2_Pages_App">
          <div className="Container_LibraryPage">
            <h1 className="Title_Container_LibraryPage">
              <b>
                <FaHistory />
              </b>
              <b>History</b>
            </h1>
            <div className="Container_VideoList_LibraryPage">
              <WHLVideoList
                page={"History"}
                currentUser={currentUser?.result?._id}
                videoList={videoList}
              />
            </div>
          </div>
          <div className="Container_LibraryPage">
            <h1 className="Title_Container_LibraryPage">
              <b>
                <MdOutlineWatchLater />
              </b>
              <b>Watch Later</b>
            </h1>
            <div className="Container_VideoList_LibraryPage">
              <WHLVideoList
                page={"Watch Later"}
                currentUser={currentUser?.result?._id}
                videoList={videoList}
              />
            </div>
          </div>
          <div className="Container_LibraryPage">
            <h1 className="Title_Container_LibraryPage">
              <b>
                <AiOutlineLike />
              </b>
              <b>Liked Videos</b>
            </h1>
            <div className="Container_VideoList_LibraryPage">
              <WHLVideoList
                page={"Liked Videos"}
                currentUser={currentUser?.result?._id}
                videoList={videoList}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Library;
