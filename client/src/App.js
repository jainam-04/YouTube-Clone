// import logo from './logo.svg';
import './App.css';
import { useState, React, useEffect } from 'react';
import Navbar from './Component/Navbar/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import AllRoutes from "./AllRoutes";
import DrawerSlider from "../src/Component/LeftSideBar/DrawerSlider"
import CreateEditChannel from './Pages/Channel/CreateEditChannel';
import VideoUpload from './Pages/VideoUpload/VideoUpload';
import { useDispatch } from 'react-redux';
import { fetchAllChannels } from './Action/ChannelUser.js';
import { getAllVideos } from "./Action/Video.js"
import { getAllComments } from './Action/Comments.js';

function App() {
  const [toggleDrawerSidebar, setToggleDrawerSidebar] = useState({
    display: "none"
  });
  const toggleDrawer = () => {
    if (toggleDrawerSidebar.display === "none") {
      setToggleDrawerSidebar({
        display: "flex"
      });
    }
    else {
      setToggleDrawerSidebar({
        display: "none"
      });
    }
  }
  const [editCreateChannelButton, setEditCreateChannelButton] = useState(false);
  const [videoUploadPage, setVideoUploadPage] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllChannels())
    dispatch(getAllVideos())
    dispatch(getAllComments())
  }, [dispatch])

  return (
    <Router>
      {videoUploadPage && <VideoUpload setVideoUploadPage={setVideoUploadPage} />}
      {editCreateChannelButton && (
        <CreateEditChannel setEditCreateChannelButton={setEditCreateChannelButton} />
      )}
      <Navbar setEditCreateChannelButton={setEditCreateChannelButton} toggleDrawer={toggleDrawer} />
      <DrawerSlider toggleDrawer={toggleDrawer} toggleDrawerSidebar={toggleDrawerSidebar} />
      <AllRoutes setEditCreateChannelButton={setEditCreateChannelButton} setVideoUploadPage={setVideoUploadPage} />
    </Router>
  );
}

export default App;
