// import logo from './logo.svg';
import './App.css';
import { useState, React } from 'react';
import Navbar from './Component/Navbar/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import AllRoutes from "./AllRoutes";
import DrawerSlider from "../src/Component/LeftSideBar/DrawerSlider"
import CreateEditChannel from './Pages/Channel/CreateEditChannel';
import VideoUpload from './Pages/VideoUpload/VideoUpload';

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
