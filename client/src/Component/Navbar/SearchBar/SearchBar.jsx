import React, {useState} from "react";
import "./SearchBar.css";
import {BsMicFill} from "react-icons/bs";
import {FaSearch} from "react-icons/fa";
import SearchList from "./SearchList";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import changeThemeBasedOnTime from "../../../Utils/ChangeThemeBasedOnTime.js";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchList, setSearchList] = useState(false);
  const titleArray = useSelector((state) => state.videoReducer)
    ?.data?.filter((q) =>
      q.video_title.toUpperCase().includes(searchQuery?.toUpperCase())
    )
    .map((m) => m?.video_title);
  const currentUser = useSelector((state) => state.currentUserReducer);
  const state = currentUser?.result?.state;
  const theme = changeThemeBasedOnTime(state);
  return (
    <div className={theme}>
      <div className="SearchBar_Container">
        <div className="SearchBar_Container2">
          <div className="Search_Div">
            <input
              type="text"
              className="iBox_SearchBar"
              placeholder="Search"
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              onClick={(e) => setSearchList(true)}
            />
            <Link to={`/search/${searchQuery}`}>
              <FaSearch className="SearchIcon_SearchBar" />
            </Link>
            <BsMicFill className="Mic_SearchBar" />
            {searchQuery && searchList && (
              <SearchList
                setSearchQuery={setSearchQuery}
                titleArray={titleArray}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
