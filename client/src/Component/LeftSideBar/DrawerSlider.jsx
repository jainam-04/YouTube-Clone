import React from "react";
import "./LeftSideBar.css";
import {AiFillPlaySquare, AiOutlineHome, AiFillLike} from "react-icons/ai";
import {
  MdOutlineExplore,
  MdOutlineVideoLibrary,
  MdOutlineWatchLater,
  MdSubscriptions,
} from "react-icons/md";
import {FaHistory} from "react-icons/fa";
import {NavLink} from "react-router-dom";
import shorts from "./shorts.png";
import {GrUpgrade} from "react-icons/gr"

const DrawerSlider = ({toggleDrawer, toggleDrawerSidebar}) => {
  return (
    <>
      <div className="Container_DrawerLeftSideBar" style={toggleDrawerSidebar}>
        <div className="Container2_DrawerLeftSideBar">
          <div className="Drawer_LeftSideBar">
            <NavLink to={"/"} className="Icon_SideBar_Div">
              <p>
                <AiOutlineHome
                  size={22}
                  className="Icon_SideBar"
                  style={{margin: "auto 0.7rem"}}
                />
                <div className="Text_SideBar_Icon">Home</div>
              </p>
            </NavLink>
            <div className="Icon_SideBar_Div">
              <p>
                <MdOutlineExplore
                  size={22}
                  className="Icon_SideBar"
                  style={{margin: "auto 0.7rem"}}
                />
                <div className="Text_SideBar_Icon">Explore</div>
              </p>
            </div>
            <div className="Icon_SideBar_Div">
              <p>
                <img
                  src={shorts}
                  alt="shorts"
                  width={22}
                  className="Icon_SideBar"
                  style={{margin: "auto 0.7rem"}}
                />
                <div className="Text_SideBar_Icon">Shorts</div>
              </p>
            </div>
            <div className="Icon_SideBar_Div">
              <p>
                <MdSubscriptions
                  size={22}
                  className="Icon_SideBar"
                  style={{margin: "auto 0.7rem"}}
                />
                <div className="Text_SideBar_Icon">Subscription</div>
              </p>
            </div>
          </div>
          <div className="LibraryButton_DrawerLeftSideBar">
            <NavLink to={"/library"} className="Icon_SideBar_Div">
              <p>
                <MdOutlineVideoLibrary
                  size={22}
                  className="Icon_SideBar"
                  style={{margin: "auto 0.7rem"}}
                />
                <div className="Text_SideBar_Icon">Library</div>
              </p>
            </NavLink>
            <NavLink to={"/history"} className="Icon_SideBar_Div">
              <p>
                <FaHistory
                  size={22}
                  className="Icon_SideBar"
                  style={{margin: "auto 0.7rem"}}
                />
                <div className="Text_SideBar_Icon">History</div>
              </p>
            </NavLink>
            <NavLink to={"/your_videos"} className="Icon_SideBar_Div">
              <p>
                <AiFillPlaySquare
                  size={22}
                  className="Icon_SideBar"
                  style={{margin: "auto 0.7rem"}}
                />
                <div className="Text_SideBar_Icon">Your Videos</div>
              </p>
            </NavLink>
            <NavLink to={"/watch_later"} className="Icon_SideBar_Div">
              <p>
                <MdOutlineWatchLater
                  size={22}
                  className="Icon_SideBar"
                  style={{margin: "auto 0.7rem"}}
                />
                <div className="Text_SideBar_Icon">Watch Later</div>
              </p>
            </NavLink>
            <NavLink to={"/liked_videos"} className="Icon_SideBar_Div">
              <p>
                <AiFillLike
                  size={22}
                  className="Icon_SideBar"
                  style={{margin: "auto 0.7rem"}}
                />
                <div className="Text_SideBar_Icon">Liked Videos</div>
              </p>
            </NavLink>
            <NavLink to={"/upgrade_plan"} className="Icon_SideBar_Div">
              <p>
                <GrUpgrade
                  size={22}
                  className="Icon_SideBar"
                  style={{margin: "auto 0.7rem"}}
                />
                <div className="Text_SideBar_Icon">Upgrade Plan</div>
              </p>
            </NavLink>
          </div>
          <div className="Subscriptions_LeftSideBar">
            <h3>Your Subscriptions</h3>
            <div className="Channel_LeftSideBar">
              <p>C</p>
              <div>Channel</div>
            </div>
            <div className="Channel_LeftSideBar">
              <p>C</p>
              <div>Channel</div>
            </div>
            <div className="Channel_LeftSideBar">
              <p>C</p>
              <div>Channel</div>
            </div>
            <div className="Channel_LeftSideBar">
              <p>C</p>
              <div>Channel</div>
            </div>
          </div>
        </div>
        <div
          className="Conatiner3_LeftSideBar"
          onClick={() => toggleDrawer()}
        ></div>
      </div>
    </>
  );
};

export default DrawerSlider;
