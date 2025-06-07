// import logo from './logo.svg';
import './App.css';
import { useState, React } from 'react';
import Navbar from './Component/Navbar/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import AllRoutes from "./AllRoutes";

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
      <Navbar setEditCreateChannelButton={setEditCreateChannelButton} toggleDrawer={toggleDrawer} />
      <AllRoutes />
    </Router>
  );
}

export default App;
