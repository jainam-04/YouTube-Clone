import React, {useEffect} from "react";
import "./VideoPage.css";
import {Link, useParams} from "react-router-dom";
import moment from "moment";
import LikeWatchLaterSaveButtons from "./LikeWatchLaterSaveButtons";
import Comments from "../../Component/Comments/Comments";
import {useDispatch, useSelector} from "react-redux";
import {viewVideo} from "../../Action/Video.js";
import {addToHistory} from "../../Action/History.js";

const VideoPage = () => {
  const {vid} = useParams();
  const dispatch = useDispatch();
  const videoList = useSelector((state) => state.videoReducer);
  const currentUser = useSelector((state) => state.currentUserReducer);
  const vv = videoList?.data?.filter((q) => q._id === vid)[0];
  const handleViews = () => {
    dispatch(viewVideo({id: vid}));
  };
  const handleHistory = () => {
    dispatch(
      addToHistory({
        video_id: vid,
        viewer: currentUser?.result?._id,
      })
    );
  };
  useEffect(() => {
    if (currentUser) {
      handleHistory();
    }
    handleViews();
  }, []);
  return (
    <>
      <div className="Container_VideoPage">
        <div className="Container2_VideoPage">
          <div className="Video_Display_Screen_VideoPage">
            <video
              src={`http://localhost:5000/${vv?.file_path}`}
              className="Video_ShowVideo_VideoPage"
              controls
            ></video>
            <div className="Video_Details_VideoPage">
              <div className="Video_Buttons_Title_VideoPage_Container">
                <p className="Video_Title_VideoPage">{vv?.title}</p>
                <div className="Views_Date_Buttons_VideoPage">
                  <div className="Views_VideoPage">
                    {vv?.views} views <div className="Dot"></div>{" "}
                    {moment(vv?.createdAt).fromNow()}
                  </div>
                  <LikeWatchLaterSaveButtons vv={vv} vid={vid} />
                </div>
              </div>
              <Link to={"/"} className="Channel_Details_VideoPage">
                <b className="Channel_Logo_VideoPage">
                  <div className="First_Char_Logo_App">
                    {vv?.uploader.charAt(0).toUpperCase()}
                  </div>
                </b>
                <p className="Channel_Name_VideoPage">{vv?.uploader}</p>
              </Link>
              <div className="Comments_VideoPage">
                <h2>
                  <u>Comments</u>
                </h2>
                <Comments video_id={vv?._id} />
              </div>
            </div>
          </div>
          <div className="MoreVideoBar">More Videos</div>
        </div>
      </div>
    </>
  );
};

export default VideoPage;
