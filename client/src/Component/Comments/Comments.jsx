import React, {useState} from "react";
import "./Comments.css";
import DisplayComments from "./DisplayComments";

const Comments = ({video_id}) => {
  const [commentText, setCommentText] = useState("");
  const currentUser = {
    result: {
      _id: 1,
      name: "abc",
      email: "abc@gmail.com",
      joined_on: "07/06/2025",
    },
  };
  const commentList = [
    {
      _id: 1,
      comment_body: "hello",
      user_commented: "abc",
    },
    {
      _id: 2,
      comment_body: "hello",
      user_commented: "abc",
    },
    {
      _id: 3,
      comment_body: "hello",
      user_commented: "abc",
    },
    {
      _id: 4,
      comment_body: "hello",
      user_commented: "abc",
    },
  ];
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (currentUser) {
      if (!commentText) {
        alert("Please type your comment!!");
      } else {
        setCommentText("");
      }
    } else {
      alert("Please login to comment!!");
    }
  };
  return (
    <>
      <form className="Comments_Submit_Form_Comments">
        <input
          type="text"
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="add comments here..."
          value={commentText}
          className="Comment_iBox"
        />
        <input
          type="submit"
          className="Comment_Add_Button_Comments"
          value="add"
        />
      </form>
      <div className="Display_Comment_Container">
        {commentList
          ?.filter((q) => video_id === q?._id)
          .reverse()
          .map((m) => {
            return (
              <>
                <DisplayComments
                  cid={m._id}
                  userid={m.userid}
                  comment_body={m.comment_body}
                  comment_on={m.comment_on}
                  user_commented={m.user_commented}
                />
              </>
            );
          })}
      </div>
    </>
  );
};

export default Comments;
