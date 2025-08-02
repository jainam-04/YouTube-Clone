import React from "react";
import ShowVideoList from "../ShowVideoList/ShowVideoList";
import "./WHL.css";
import changeThemeBasedOnTime from "../../Utils/ChangeThemeBasedOnTime";

const WHLVideoList = ({page, currentUser, videoList}) => {
  const state = currentUser?.result?.state;
  const theme = changeThemeBasedOnTime(state);
  return (
    <div className={theme}>
      {currentUser ? (
        <>
          {videoList?.data
            ?.filter((q) => q?.viewer === currentUser)
            .reverse()
            .map((m) => {
              return (
                <>
                  <ShowVideoList video_id={m?.video_id} />
                </>
              );
            })}
        </>
      ) : (
        <>
          <h2 style={{color: "var(--whl-text)", textAlign: "center"}}>
            Please login to watch your {page}
          </h2>
        </>
      )}
    </div>
  );
};

export default WHLVideoList;
