import React from "react";
import "./Home.css";
import LeftSideBar from "../../Component/LeftSideBar/LeftSideBar";

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
        </div>
      </div>
    </>
  );
};

export default Home;
