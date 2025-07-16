import React from "react";
import {useSelector} from "react-redux";
import WHL from "../../Component/WHL/WHL";

const DownloadedVideos = () => {
  const downloadedVideosList = useSelector(
    (state) => state.downloadedVideosReducer
  );
  return <WHL page={"Downloaded Videos"} videoList={downloadedVideosList} />;
};

export default DownloadedVideos;
