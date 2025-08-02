import React from "react";
import ShowVideo from "../ShowVideo/ShowVideo";
import {useSelector} from "react-redux";
import "../ShowVideoGrid/ShowVideoGrid.css";
import changeThemeBasedOnTime from "../../Utils/ChangeThemeBasedOnTime";

const ShowVideoList = ({video_id}) => {
  const videoList = useSelector((state) => state.videoReducer);
  const currentUser = useSelector((state) => state.currentUserReducer);
  const state = currentUser?.result?.state;
  const theme = changeThemeBasedOnTime(state);
  return (
    <div className={theme}>
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
    </div>
  );
};

export default ShowVideoList;
