import React from "react";
import "./Home.css";
import LeftSideBar from "../../Component/LeftSideBar/LeftSideBar";
// import video1 from "../../Component/Videos/vid.mp4";
import ShowVideoGrid from "../../Component/ShowVideoGrid/ShowVideoGrid";
import {useSelector} from "react-redux";

const Home = () => {
  const navList = [
    "All",
    "Python",
    "Java",
    "C++",
    "Movies",
    "Science",
    "Animations",
    "Gaming",
    "Comedy",
  ];
  const videoList = useSelector((state) => state.videoReducer)
    ?.data?.filter((q) => q)
    .reverse();
  return (
    <>
      <div className="Container_Pages_App">
        <LeftSideBar />
        <div className="Container2_Pages_App">
          <div className="Navigation_Home">
            {navList.map((m) => {
              return (
                <p key={m} className="Button_Nav_Home">
                  {m}
                </p>
              );
            })}
          </div>
          <ShowVideoGrid vid={videoList} />
        </div>
      </div>
    </>
  );
};

export default Home;
