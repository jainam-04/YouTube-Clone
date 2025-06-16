import React from "react";
import ShowVideo from "../ShowVideo/ShowVideo";
import {useSelector} from "react-redux";

const ShowVideoList = ({video_id}) => {
  const videoList = useSelector((state) => state.videoReducer);
  return (
    <>
      <div className="Container_ShowVideoGrid">
        {videoList?.data
          .filter((q) => q._id === video_id)
          .map((vi) => {
            return (
              <div className="Video_Box_App" key={vi._id}>
                <ShowVideo vid={vi} />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ShowVideoList;
