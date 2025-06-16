import React from "react";
import "./WHL.css";
import LeftSideBar from "../LeftSideBar/LeftSideBar";
import WHLVideoList from "./WHLVideoList";
import {useDispatch, useSelector} from "react-redux";
import {deleteHistory} from "../../Action/History";

const WHL = ({page, videoList}) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUserReducer);
  const handleClearHistory = () => {
    if (currentUser) {
      dispatch(deleteHistory({user_id: currentUser?.result?._id}));
    }
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
                <div
                  className="Clear_History_Button"
                  onClick={() => handleClearHistory()}
                >
                  Clear History
                </div>
              )}
            </div>
            <div className="RightSide_WHL">
              <h1>{page}</h1>
              <div className="WHL_List">
                <WHLVideoList
                  page={page}
                  currentUser={currentUser?.result?._id}
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
