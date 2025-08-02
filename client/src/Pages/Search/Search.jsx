import React from "react";
import {useParams} from "react-router-dom";
import LeftSideBar from "../../Component/LeftSideBar/LeftSideBar";
import ShowVideoGrid from "../../Component/ShowVideoGrid/ShowVideoGrid";
import {useSelector} from "react-redux";
import changeThemeBasedOnTime from "../../Utils/ChangeThemeBasedOnTime";

const Search = () => {
  const {searchQuery} = useParams();
  const videoList = useSelector((state) => state.videoReducer)?.data?.filter(
    (q) => q?.video_title.toUpperCase().includes(searchQuery?.toUpperCase())
  );
  const currentUser = useSelector((state) => state.currentUserReducer);
  const state = currentUser?.result?.state;
  const theme = changeThemeBasedOnTime(state);
  return (
    <div className={theme}>
      <div className="Container_Pages_App">
        <LeftSideBar />
        <div className="Container2_Pages_App">
          <ShowVideoGrid vid={videoList} />
        </div>
      </div>
    </div>
  );
};

export default Search;
