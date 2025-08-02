import React from "react";
import "./Library.css";
import {FaHistory} from "react-icons/fa";
import {AiOutlineLike} from "react-icons/ai";
import {MdOutlineWatchLater} from "react-icons/md";
import LeftSideBar from "../../Component/LeftSideBar/LeftSideBar";
import WHLVideoList from "../../Component/WHL/WHLVideoList";
import {useSelector} from "react-redux";
import changeThemeBasedOnTime from "../../Utils/ChangeThemeBasedOnTime";

const Library = () => {
  const likedVideoList = useSelector((state) => state.likedVideoReducer);
  const watchLaterList = useSelector((state) => state.watchLaterReducer);
  const watchHistoryVideoList = useSelector((state) => state.historyReducer);
  const currentUser = useSelector((state) => state.currentUserReducer);
  const state = currentUser?.result?.state;
  const theme = changeThemeBasedOnTime(state);
  return (
    <div className={theme}>
      <div className="Container_Pages_App">
        <LeftSideBar />
        <div className="Container2_Pages_App">
          <div className="Container_LibraryPage">
            <h1 className="Title_Container_LibraryPage">
              <b>
                <FaHistory />
              </b>
              <b>History</b>
            </h1>
            <div className="Container_VideoList_LibraryPage">
              <WHLVideoList
                page={"History"}
                currentUser={currentUser?.result?._id}
                videoList={watchHistoryVideoList}
              />
            </div>
          </div>
          <div className="Container_LibraryPage">
            <h1 className="Title_Container_LibraryPage">
              <b>
                <MdOutlineWatchLater />
              </b>
              <b>Watch Later</b>
            </h1>
            <div className="Container_VideoList_LibraryPage">
              <WHLVideoList
                page={"Watch Later"}
                currentUser={currentUser?.result?._id}
                videoList={watchLaterList}
              />
            </div>
          </div>
          <div className="Container_LibraryPage">
            <h1 className="Title_Container_LibraryPage">
              <b>
                <AiOutlineLike />
              </b>
              <b>Liked Videos</b>
            </h1>
            <div className="Container_VideoList_LibraryPage">
              <WHLVideoList
                page={"Liked Videos"}
                currentUser={currentUser?.result?._id}
                videoList={likedVideoList}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Library;
