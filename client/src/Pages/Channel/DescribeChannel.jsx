import React from "react";
import "./DescribeChannel.css";
import {FaEdit, FaUpload} from "react-icons/fa";

const DescribeChannel = ({
  setVideoUploadPage,
  cid,
  setEditCreateChannelButton,
}) => {
  const channel = [
    {
      result: {
        _id: 1,
        name: "abc",
        email: "abc@gmail.com",
        joined_on: "07/06/2025",
        description: "bithead",
      },
    },
  ];
  const currentChannel = channel?.find(
    (c) => c.result._id === Number(cid)
  )?.result;
  const currentUser = {
    result: {
      _id: 1,
      name: "abc",
      email: "abc@gmail.com",
      joined_on: "07/06/2025",
    },
  };
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
