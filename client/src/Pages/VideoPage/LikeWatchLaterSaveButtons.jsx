import React, {useEffect, useState} from "react";
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
  RiDownloadLine,
  RiDownloadCloudFill,
} from "react-icons/ri";
import {useDispatch, useSelector} from "react-redux";
import {likeVideo} from "../../Action/Video.js";
import {addToLikedVideo, deleteLikedVideo} from "../../Action/LikedVideo.js";
import {addToWatchLater, deleteWatchLater} from "../../Action/WatchLater.js";
import {
  addDownloadedVideos,
  deleteDownloadedVideos,
} from "../../Action/DownloadedVideos.js";

const LikeWatchLaterSaveButtons = ({vv, vid}) => {
  const dispatch = useDispatch();
  const [saveVideo, setSaveVideo] = useState(false);
  const [dislikeButton, setDislikeButton] = useState(false);
  const [likeButton, setLikeButton] = useState(false);
  const [downloadVideo, setDownloadVideo] = useState(false);
  const currentUser = useSelector((state) => state.currentUserReducer);
  const likedVideoList = useSelector((state) => state.likedVideoReducer);
  const watchLaterList = useSelector((state) => state.watchLaterReducer);
  const downloadedVideosList = useSelector(
    (state) => state.downloadedVideosReducer
  );
  useEffect(() => {
    likedVideoList?.data
      ?.filter(
        (q) => q.video_id === vid && q.viewer === currentUser?.result?._id
      )
      .map((m) => setLikeButton(true));
    watchLaterList?.data
      ?.filter(
        (q) => q.video_id === vid && q.viewer === currentUser?.result?._id
      )
      .map((m) => setSaveVideo(true));
    downloadedVideosList?.data
      ?.filter(
        (q) => q.video_id === vid && q.viewer === currentUser?.result?._id
      )
      .map((m) => setDownloadVideo(true));
  }, []);
  const toggleSavedVideo = () => {
    if (currentUser) {
      if (saveVideo) {
        setSaveVideo(false);
        dispatch(
          deleteWatchLater({video_id: vid, viewer: currentUser?.result?._id})
        );
      } else {
        setSaveVideo(true);
        dispatch(
          addToWatchLater({video_id: vid, viewer: currentUser?.result?._id})
        );
      }
    } else {
      alert("Please login to save video");
    }
  };
  const toggleLikeVideo = (e, lk) => {
    if (currentUser) {
      if (likeButton) {
        setLikeButton(false);
        dispatch(likeVideo({id: vid, like: lk - 1}));
        dispatch(
          deleteLikedVideo({video_id: vid, viewer: currentUser?.result?._id})
        );
      } else {
        setLikeButton(true);
        dispatch(likeVideo({id: vid, like: lk + 1}));
        dispatch(
          addToLikedVideo({video_id: vid, viewer: currentUser?.result?._id})
        );
        setDislikeButton(false);
      }
    } else {
      alert("Please login to save video");
    }
  };
  const toggleDislikeVideo = (e, lk) => {
    if (currentUser) {
      if (dislikeButton) {
        setDislikeButton(false);
      } else {
        setDislikeButton(true);
        if (likeButton) {
          dispatch(likeVideo({id: vid, like: lk - 1}));
          dispatch(
            deleteLikedVideo({video_id: vid, viewer: currentUser?.result?._id})
          );
        }
        setLikeButton(false);
      }
    } else {
      alert("Please login to save video");
    }
  };
  const toggleDownloadVideo = () => {
    if (currentUser) {
      const viewerId = currentUser?.result?._id;
      const userPlan = currentUser?.result?.premium_plan;
      const planStartDate = new Date(
        currentUser?.result?.premium_plan_start_date
      );
      const now = new Date();
      const milliSecondsPerDay = 24 * 60 * 60 * 1000;
      const planIsValid = () => {
        if (userPlan === "free") {
          return true;
        }
        const diff = now - planStartDate;
        switch (userPlan) {
          case "daily":
            return diff < milliSecondsPerDay;
          case "weekly":
            return diff < milliSecondsPerDay * 7;
          case "monthly":
            return diff < milliSecondsPerDay * 30;
          case "yearly":
            return diff < milliSecondsPerDay * 365;
          default:
            return false;
        }
      };
      if (userPlan === "free") {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const downloadsToday = downloadedVideosList?.data?.filter(
          (item) =>
            item.viewer === viewerId &&
            new Date(item.createdAt).getTime() >= today.getTime()
        );
        if (downloadsToday.length >= 1) {
          alert(
            "Free users can only download 1 video per day. Please upgrade..."
          );
          return;
        }
      }
      if (userPlan !== "free" && !planIsValid()) {
        alert(
          "Your premium plan is expired. Please renew or upgrade to continue downloading..."
        );
        return;
      }
      if (downloadVideo) {
        setDownloadVideo(false);
        dispatch(
          deleteDownloadedVideos({
            video_id: vid,
            viewer: currentUser?.result?._id,
          })
        );
      } else {
        setDownloadVideo(true);
        dispatch(
          addDownloadedVideos({video_id: vid, viewer: currentUser?.result?._id})
        );
      }
    } else {
      alert("Please login to download video...");
    }
  };
  return (
    <>
      <div className="Buttons_Container_VideoPage">
        <div className="Button_VideoPage">
          <BsThreeDots />
        </div>
        <div className="Button_VideoPage">
          <div
            className="Like_VideoPage"
            onClick={(e) => toggleLikeVideo(e, vv?.like)}
          >
            {likeButton ? (
              <>
                <AiFillLike size={22} className="Buttons_VideoPage" />
              </>
            ) : (
              <>
                <AiOutlineLike size={22} className="Buttons_VideoPage" />
              </>
            )}
            <b>{vv?.like}</b>
          </div>
          <div
            className="Like_VideoPage"
            onClick={(e) => toggleDislikeVideo(e, vv.like)}
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
            <b>DISLIKE</b>
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
          <div
            className="Like_VideoPage"
            onClick={(e) => toggleDownloadVideo(e)}
          >
            {downloadVideo ? (
              <>
                <RiDownloadCloudFill size={22} className="Buttons_VideoPage" />
                <b>Downloaded</b>
              </>
            ) : (
              <>
                <RiDownloadLine size={22} className="Buttons_VideoPage" />
                <b>Download</b>
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
