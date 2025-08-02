import React from "react";
import {useParams} from "react-router-dom";
import LeftSideBar from "../../Component/LeftSideBar/LeftSideBar";
import DescribeChannel from "./DescribeChannel";
import ShowVideoGrid from "../../Component/ShowVideoGrid/ShowVideoGrid";
import {useSelector} from "react-redux";
import changeThemeBasedOnTime from "../../Utils/ChangeThemeBasedOnTime";

const Channel = ({setEditCreateChannelButton, setVideoUploadPage}) => {
  const {cid} = useParams();
  const videoList = useSelector((state) => state.videoreducer)
    ?.data?.filter((q) => q.video_channel === cid)
    .reverse();
  const currentUser = useSelector((state) => state.currentUserReducer);
  const state = currentUser?.result?.state;
  const theme = changeThemeBasedOnTime(state);
  return (
    <div className={theme}>
      <div className="Container_Pages_App">
        <LeftSideBar />
        <div className="Container2_Pages_App">
          <DescribeChannel
            cid={cid}
            setVideoUploadPage={setVideoUploadPage}
            setEditCreateChannelButton={setEditCreateChannelButton}
          />
          <ShowVideoGrid videoList={videoList} />
        </div>
      </div>
    </div>
  );
};

export default Channel;
