import React from "react";
import {useParams} from "react-router-dom";
import LeftSideBar from "../../Component/LeftSideBar/LeftSideBar";
import ShowVideoGrid from "../../Component/ShowVideoGrid/ShowVideoGrid";
import {useSelector} from "react-redux";

const Search = () => {
  const {searchQuery} = useParams();
  const videoList = useSelector((state) => state.videoReducer)?.data?.filter(
    (q) => q?.video_title.toUpperCase().includes(searchQuery?.toUpperCase())
  );
  return (
    <>
      <div className="Container_Pages_App">
        <LeftSideBar />
        <div className="Container2_Pages_App">
          <ShowVideoGrid vid={videoList} />
        </div>
      </div>
    </>
  );
};

export default Search;
