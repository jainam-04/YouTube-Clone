import React from "react";
// import video1 from "../../Component/Videos/vid.mp4";
import WHL from "../../Component/WHL/WHL";
import {useSelector} from "react-redux";

const WatchLater = () => {
  const watchLaterVideoList = useSelector((state) => state.watchLaterReducer);
  return <WHL page={"Watch Later"} videoList={watchLaterVideoList} />;
};

export default WatchLater;
