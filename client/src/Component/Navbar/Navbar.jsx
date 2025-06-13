import React, {useEffect, useState} from "react";
import logo from "./logo.ico";
import "./Navbar.css";
import {Link} from "react-router-dom";
import {RiVideoAddLine} from "react-icons/ri";
import {IoMdNotificationsOutline} from "react-icons/io";
import {BiUserCircle} from "react-icons/bi";
import SearchBar from "./SearchBar/SearchBar";
import Auth from "../../Pages/Auth/Auth";
import {googleLogout, useGoogleLogin} from "@react-oauth/google";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../Action/Auth";
import {setCurrentUser} from "../../Action/CurrentUser";
import {jwtDecode} from "jwt-decode";

const Navbar = ({setEditCreateChannelButton, toggleDrawer}) => {
  const [authButton, setAuthButton] = useState(false);
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUserReducer);
  const successLogin = () => {
    if (profile.email) {
      dispatch(login({email: profile.email}));
    }
  };
  const google_login = useGoogleLogin({
    onSuccess: (tokenResponse) => setUser(tokenResponse),
    onError: (error) => console.log("Login Failed!", error),
  });
  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
          successLogin();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);
  const logout = () => {
    dispatch(setCurrentUser(null));
    localStorage.clear();
    googleLogout();
  };
  useEffect(() => {
    const token = currentUser?.token;
    if (token) {
      const decodeToken = jwtDecode(token);
      if (decodeToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("profile"))));
  }, [currentUser?.token, dispatch]);
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
              <p className="Auth_Button" onClick={() => google_login()}>
                <BiUserCircle size={22} />
                <b>Sign In</b>
              </p>
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
