import React from "react";
// import video1 from "../../Component/Videos/vid.mp4";
import WHL from "../../Component/WHL/WHL";
import {useSelector} from "react-redux";

const LikedVideos = () => {
  const likedVideoList = useSelector((state) => state.likedVideoReducer);
  return <WHL page={"Liked Videos"} videoList={likedVideoList} />;
};

export default LikedVideos;
