import React from "react";
import "./DescribeChannel.css";
import {FaEdit, FaUpload} from "react-icons/fa";
import {useSelector} from "react-redux";

const DescribeChannel = ({
  setVideoUploadPage,
  cid,
  setEditCreateChannelButton,
}) => {
  const channel = useSelector((state) => state.channelReducer);
  const currentChannel = channel?.filter((c) => c._id === cid)[0];
  const currentUser = useSelector((state) => state.currentUserReducer);
  return (
    <>
      <div className="Container3_Channel">
        <div className="Channel_Logo_Channel">
          <b>{currentChannel?.name.charAt(0).toUpperCase()}</b>
        </div>
        <div className="Description_Channel">
          <b>{currentChannel?.name}</b>
          <p>{currentChannel?.description}</p>
        </div>
        {currentUser?.result._id === currentChannel?._id && (
          <>
            <p
              className="EditButton_Channel"
              onClick={() => setEditCreateChannelButton(true)}
            >
              <FaEdit />
              <b>Edit Channel</b>
            </p>
            <p
              className="UploadButton_Channel"
              onClick={() => setVideoUploadPage(true)}
            >
              <FaUpload />
              <b>Upload Video</b>
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default DescribeChannel;
