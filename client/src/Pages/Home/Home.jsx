import React from "react";
import "./Home.css";
import LeftSideBar from "../../Component/LeftSideBar/LeftSideBar";
import ShowVideoGrid from "../../Component/ShowVideoGrid/ShowVideoGrid";
import {useSelector} from "react-redux";
import changeThemeBasedOnTime from "../../Utils/ChangeThemeBasedOnTime";

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
  const currentUser = useSelector((state) => state.currentUserReducer);
  const state = currentUser?.result?.state;
  const theme = changeThemeBasedOnTime(state);
  return (
    <div className={theme}>
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
    </div>
  );
};

export default Home;
