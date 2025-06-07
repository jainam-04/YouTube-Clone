import React, {useState} from "react";
import "./SearchBar.css";
import {BsMicFill} from "react-icons/bs";
import {FaSearch} from "react-icons/fa";
import SearchList from "./SearchList";
import {Link} from "react-router-dom";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchList, setSearchList] = useState(false);
  const titleArray = ["Movies", "Animes", "Series"].filter((q) =>
    q.toUpperCase().includes(searchQuery.toUpperCase())
  );
  return (
    <>
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
            <Link>
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
    </>
  );
};

export default SearchBar;
