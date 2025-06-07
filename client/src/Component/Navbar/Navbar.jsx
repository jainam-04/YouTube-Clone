import React, {useState} from "react";
import logo from "./logo.ico";
import "./Navbar.css";
import {Link} from "react-router-dom";
import {RiVideoAddLine} from "react-icons/ri";
import {IoMdNotificationsOutline} from "react-icons/io";
import {BiUserCircle} from "react-icons/bi";
import SearchBar from "./SearchBar/SearchBar";
import Auth from "../../Pages/Auth/Auth";

const Navbar = ({setEditCreateChannelButton, toggleDrawer}) => {
  const [authButton, setAuthButton] = useState(false);
  // const currentUser = null;
  const currentUser = {
    result: {
      email: "abc@gmail.com",
      joinedOn: "07/06/2025",
    },
  };
  return (
    <>
      <div className="Container_Navbar">
        <div className="Burger_Logo_Navbar">
          <div className="Burger" onClick={() => toggleDrawer()}>
            <p></p>
            <p></p>
            <p></p>
          </div>
          <Link to={"/"} className="Logo_Div_Navbar">
            <img src={logo} alt="Youtube logo" />
            <p className="Logo_Title_Navbar">YouTube Clone</p>
          </Link>
        </div>
        <SearchBar />
        <RiVideoAddLine size={22} className="Vid_Bell_Navbar" />
        <div className="Apps_Box">
          <p className="AppBox"></p>
          <p className="AppBox"></p>
          <p className="AppBox"></p>
          <p className="AppBox"></p>
          <p className="AppBox"></p>
          <p className="AppBox"></p>
          <p className="AppBox"></p>
          <p className="AppBox"></p>
          <p className="AppBox"></p>
          <p className="AppBox"></p>
        </div>
        <IoMdNotificationsOutline size={22} className="Vid_Bell_Navbar" />
        <div className="Auth_Container_Navbar">
          {currentUser ? (
            <>
              <div
                className="Channel_Logo_App"
                onClick={() => setAuthButton(true)}
              >
                <p className="First_Char_Logo_App">
                  {currentUser?.result.name ? (
                    <>{currentUser?.result.name.charAt(0).toUpperCase()}</>
                  ) : (
                    <>{currentUser?.result.email.charAt(0).toUpperCase()}</>
                  )}
                </p>
              </div>
            </>
          ) : (
            <>
              <BiUserCircle size={22} />
              <b>Sign In</b>
            </>
          )}
        </div>
      </div>
      {authButton && (
        <Auth
          setEditCreateChannelButton={setEditCreateChannelButton}
          setAuthButton={setAuthButton}
          user={currentUser}
        />
      )}
    </>
  );
};

export default Navbar;
