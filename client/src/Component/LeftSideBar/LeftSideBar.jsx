import React from "react";
import "./LeftSideBar.css";
import shorts from "./shorts.png";
import {AiOutlineHome} from "react-icons/ai";
import {
  MdOutlineExplore,
  MdOutlineSubscriptions,
  MdOutlineVideoLibrary,
} from "react-icons/md";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import changeThemeBasedOnTime from "../../Utils/ChangeThemeBasedOnTime.js";

const LeftSideBar = () => {
  const currentUser = useSelector((state) => state.currentUserReducer);
  const state = currentUser?.result?.state;
  const theme = changeThemeBasedOnTime(state);
  return (
    <div className={theme}>
      <div className="Container_LeftSideBar">
        <NavLink to={"/"} className="Icon_SideBar_Div">
          <AiOutlineHome size={22} className="Icon_SideBar" />
          <div className="Text_SideBar_Icon">Home</div>
        </NavLink>
        <div className="Icon_SideBar_Div">
          <MdOutlineExplore size={22} className="Icon_SideBar" />
          <div className="Text_SideBar_Icon">Explore</div>
        </div>
        <div className="Icon_SideBar_Div">
          <img
            src={shorts}
            alt="shorts image"
            className="Icon_SideBar"
            width={22}
          />
          <div className="Text_SideBar_Icon">Shorts</div>
        </div>
        <div className="Icon_SideBar_Div">
          <MdOutlineSubscriptions size={22} className="Icon_SideBar" />
          <div className="Text_SideBar_Icon" style={{fontSize: "12px"}}>
            Subscription
          </div>
        </div>
        <NavLink to={"/library"} className="Icon_SideBar_Div">
          <MdOutlineVideoLibrary size={22} className="Icon_SideBar" />
          <div className="Text_SideBar_Icon">Library</div>
        </NavLink>
      </div>
    </div>
  );
};

export default LeftSideBar;
