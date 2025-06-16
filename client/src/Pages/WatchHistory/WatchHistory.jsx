import React from "react";
import video1 from "../../Component/Videos/vid.mp4";
import WHL from "../../Component/WHL/WHL";
import {useSelector} from "react-redux";

const WatchHistory = () => {
  const watchHistoryVideoList = useSelector((state) => state.historyReducer);
  return <WHL page={"History"} videoList={watchHistoryVideoList} />;
};

export default WatchHistory;
