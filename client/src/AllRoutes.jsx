import React from "react";
import {Routes, Route} from "react-router-dom";
import Home from "./Pages/Home/Home";
import Search from "./Pages/Search/Search";
import VideoPage from "./Pages/VideoPage/VideoPage";
import Channel from "./Pages/Channel/Channel";
import Library from "./Pages/Library/Library";

const AllRoutes = ({setEditCreateChannelButton, setVideoUploadPage}) => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search/:searchQuery" element={<Search />} />
      <Route path="/videoPage/:vid" element={<VideoPage />} />
      <Route
        path="/channel/:cid"
        element={
          <Channel
            setEditCreateChannelButton={setEditCreateChannelButton}
            setVideoUploadPage={setVideoUploadPage}
          />
        }
      />
      <Route path="/library" element={<Library />} />
    </Routes>
  );
};

export default AllRoutes;
