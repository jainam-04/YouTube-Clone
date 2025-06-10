import React, {useState} from "react";
import "./LikeWatchLaterSaveButtons.css";
import {BsThreeDots} from "react-icons/bs";
import {
  AiFillLike,
  AiFillDislike,
  AiOutlineLike,
  AiOutlineDislike,
} from "react-icons/ai";
import {MdPlaylistAddCheck} from "react-icons/md";
import {
  RiHeartAddFill,
  RiPlayListAddFill,
  RiShareForwardLine,
} from "react-icons/ri";

const LikeWatchLaterSaveButtons = ({vv, vid}) => {
  const [saveVideo, setSaveVideo] = useState(false);
  const [dislikeButton, setDislikeButton] = useState(false);
  const [likeButton, setLikeButton] = useState(false);
  const currentUser = {
    result: {
      _id: 1,
      name: "abc",
      email: "abc@gmail.com",
      joined_on: "07/06/2025",
    },
  };
  const toggleSavedVideo = () => {
    if (currentUser) {
      if (saveVideo) {
        setSaveVideo(false);
      } else {
        setSaveVideo(true);
      }
    } else {
      alert("Please login to save video");
    }
  };
  const toggleLikeVideo = () => {
    if (currentUser) {
      if (likeButton) {
        setLikeButton(false);
      } else {
        setLikeButton(true);
        setDislikeButton(false);
      }
    } else {
      alert("Please login to save video");
    }
  };
  const toggleDislikeVideo = () => {
    if (currentUser) {
      if (dislikeButton) {
        setDislikeButton(false);
      } else {
        setDislikeButton(true);
        setLikeButton(false);
      }
    } else {
      alert("Please login to save video");
    }
  };
  return (
    <>
      <div className="Buttons_Container_VideoPage">
        <div className="Button_VideoPage">
          <BsThreeDots />
        </div>
        <div className="Button_VideoPage">
          <div className="Like_VideoPage" onClick={(e) => toggleLikeVideo(e)}>
            {likeButton ? (
              <>
                <AiFillLike size={22} className="Buttons_VideoPage" />
              </>
            ) : (
              <>
                <AiOutlineLike size={22} className="Buttons_VideoPage" />
              </>
            )}
            <b>{vv.like}</b>
          </div>
          <div
            className="Like_VideoPage"
            onClick={(e) => toggleDislikeVideo(e)}
          >
            {dislikeButton ? (
              <>
                <AiFillDislike size={22} className="Buttons_VideoPage" />
              </>
            ) : (
              <>
                <AiOutlineDislike size={22} className="Buttons_VideoPage" />
              </>
            )}
            <b>{vv.dislike}</b>
          </div>
          <div className="Like_VideoPage" onClick={(e) => toggleSavedVideo(e)}>
            {saveVideo ? (
              <>
                <MdPlaylistAddCheck size={22} className="Buttons_VideoPage" />
                <b>Saved</b>
              </>
            ) : (
              <>
                <RiPlayListAddFill size={22} className="Buttons_VideoPage" />
                <b>Save</b>
              </>
            )}
          </div>
          <div className="Like_VideoPage">
            <>
              <RiHeartAddFill size={22} className="Buttons_VideoPage" />
              <b>Thanks</b>
            </>
          </div>
          <div className="Like_VideoPage">
            <>
              <RiShareForwardLine size={22} className="Buttons_VideoPage" />
              <b>Share</b>
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default LikeWatchLaterSaveButtons;
