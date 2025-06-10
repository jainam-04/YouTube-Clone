import React from "react";
import ShowVideoList from "../ShowVideoList/ShowVideoList";

const WHLVideoList = ({page, currentUser, videoList}) => {
  return (
    <>
      {currentUser ? (
        <>
          {videoList
            ?.slice()
            .map((m) => {
              return <ShowVideoList video_id={m?._id} key={m?._id} />;
            })}
        </>
      ) : (
        <>
          <h2 style={{color: "white"}}>Please login to watch your {page}</h2>
        </>
      )}
    </>
  );
};

export default WHLVideoList;
