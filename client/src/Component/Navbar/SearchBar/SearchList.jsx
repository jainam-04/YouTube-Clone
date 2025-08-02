import React from "react";
import "./SearchList.css";
import {FaSearch} from "react-icons/fa";
import {useSelector} from "react-redux";
import changeThemeBasedOnTime from "../../../Utils/ChangeThemeBasedOnTime";

const SearchList = ({titleArray, setSearchQuery}) => {
  const currentUser = useSelector((state) => state.currentUserReducer);
  const state = currentUser?.result?.state;
  const theme = changeThemeBasedOnTime(state);
  return (
    <div className={theme}>
      <div className="Container_SearchList">
        {titleArray.map((m) => {
          return (
            <p key={m} onClick={(e) => setSearchQuery(m)} className="TitleItem">
              <FaSearch />
              {m}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default SearchList;
