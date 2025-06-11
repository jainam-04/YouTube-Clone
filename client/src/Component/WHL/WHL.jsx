import React from "react";
import "./WHL.css";
import LeftSideBar from "../LeftSideBar/LeftSideBar";
import WHLVideoList from "./WHLVideoList";

const WHL = ({page, videoList}) => {
  const currentUser = {
    result: {
      _id: 1,
      name: "abc",
      email: "abc@gmail.com",
      joined_on: "07/06/2025",
    },
  };
  return (
    <>
      <div className="Container_Pages_App">
        <LeftSideBar />
        <div className="Container2_Pages_App">
          <p className="Container_WHL">
            <div className="Box_WHL LeftSide_WHL">
              <b>Your {page} shown here</b>
              {page === "History" && (
                <div className="Clear_History_Button">Clear History</div>
              )}
            </div>
            <div className="RightSide_WHL">
              <h1>{page}</h1>
              <div className="WHL_List">
                <WHLVideoList
                  page={page}
                  currentUser={currentUser}
                  videoList={videoList}
                />
              </div>
            </div>
          </p>
        </div>
      </div>
    </>
  );
};

export default WHL;
