import React from "react";
import "./YourVideos.css";
import LeftSideBar from "../../Component/LeftSideBar/LeftSideBar";
import ShowVideoGrid from "../../Component/ShowVideoGrid/ShowVideoGrid";
import {useSelector} from "react-redux";

const YourVideos = () => {
  const currentUser = useSelector((state) => state.currentUserReducer);
  const YourVideosVideoList = useSelector((state) => state.videoreducer)
    ?.data?.filter((q) => q.video_channel === currentUser?.result?._id)
    .reverse();
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
