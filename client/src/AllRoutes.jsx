import React from "react";
import {Routes, Route} from "react-router-dom";
import Home from "./Pages/Home/Home";
import Search from "./Pages/Search/Search";
import VideoPage from "./Pages/VideoPage/VideoPage";
import Channel from "./Pages/Channel/Channel";

const AllRoutes = ({setCreateEditChannelButton, videoUploadPage}) => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search/:searchQuery" element={<Search />} />
      <Route path="/videoPage/:vid" element={<VideoPage />} />
      <Route
        path="/channel/:cid"
        element={
          <Channel
            setEditCreateChannelButton={setCreateEditChannelButton}
            videoUploadPage={videoUploadPage}
          />
        }
      />
    </Routes>
  );
};

export default AllRoutes;
