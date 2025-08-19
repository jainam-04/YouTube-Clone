import React, {useEffect, useState} from "react";
import logo from "./logo.ico";
import "./Navbar.css";
import {Link, useNavigate} from "react-router-dom";
import {RiVideoAddLine} from "react-icons/ri";
import {IoMdNotificationsOutline} from "react-icons/io";
import {BiUserCircle} from "react-icons/bi";
import SearchBar from "./SearchBar/SearchBar";
import Auth from "../../Pages/Auth/Auth";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentUser} from "../../Action/CurrentUser";
import {jwtDecode} from "jwt-decode";
import changeThemeBasedOnTime from "../../Utils/ChangeThemeBasedOnTime";
import {logout} from "../../Action/Auth.js";

const Navbar = ({setEditCreateChannelButton, toggleDrawer}) => {
  const [authButton, setAuthButton] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.currentUserReducer);
  const state = currentUser?.result?.state;
  const theme = changeThemeBasedOnTime(state);
  useEffect(() => {
    const token = currentUser?.token;
    if (token) {
      const decodeToken = jwtDecode(token);
      if (decodeToken.exp * 1000 < new Date().getTime()) {
        dispatch(setCurrentUser(null));
        dispatch(logout(navigate, true));
      }
    }
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("profile"))));
  }, [currentUser?.token, dispatch]);
  return (
    <div className={theme}>
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
        <Link to={"/call"} className="Vid_Bell_Navbar">
          <RiVideoAddLine size={22} />
        </Link>
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
              <Link to={"/auth"} className="Auth_Button">
                <BiUserCircle size={22} />
                <b>Sign In</b>
              </Link>
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
    </div>
  );
};

export default Navbar;
