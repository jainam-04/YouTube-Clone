import React from "react";
import "./SearchList.css";
import {FaSearch} from "react-icons/fa";

const SearchList = ({titleArray, setSearchQuery}) => {
  return (
    <>
      <div className="Container_SearchList">
        {titleArray.map((m) => {
          return (
            <p key={m} onClick={(e) => setSearchQuery(m)} className="TitleItem">
              <FaSearch />{m}
            </p>
          );
        })}
      </div>
    </>
  );
};

export default SearchList;
