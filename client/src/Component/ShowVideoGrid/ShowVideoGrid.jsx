import React from "react";
import "./ShowVideoGrid.css";
import ShowVideo from "../ShowVideo/ShowVideo";
import {useSelector} from "react-redux";
import changeThemeBasedOnTime from "../../Utils/ChangeThemeBasedOnTime";

const ShowVideoGrid = ({vid}) => {
  const currentUser = useSelector((state) => state.currentUserReducer);
  const state = currentUser?.result?.state;
  const theme = changeThemeBasedOnTime(state);
  return (
    <div className={theme}>
      <div className="Container_ShowVideoGrid">
        {vid?.reverse().map((v) => {
          return (
            <div key={v._id} className="Video_Box_App">
              <ShowVideo vid={v} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShowVideoGrid;
