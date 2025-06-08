import React from "react";
import "./ShowVideoGrid.css";
import ShowVideo from "../ShowVideo/ShowVideo";

const ShowVideoGrid = ({vid}) => {
  return (
    <>
      <div className="Container_ShowVideoGrid">
        {vid?.reverse().map((v) => {
          return (
            <div key={v._id} className="Video_Box_App">
              <ShowVideo vid={v} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ShowVideoGrid;
