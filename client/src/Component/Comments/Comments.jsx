import React, {useState} from "react";
import "./Comments.css";
import DisplayComments from "./DisplayComments";
import {useDispatch, useSelector} from "react-redux";
import {postComment} from "../../Action/Comments";

const Comments = ({video_id}) => {
  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState("");
  const currentUser = useSelector((state) => state.currentUserReducer);
  const commentList = useSelector((state) => state.commentReducer);
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (currentUser) {
      if (!commentText) {
        alert("Please type your comment!!");
      } else {
        dispatch(
          postComment({
            video_id: video_id,
            user_id: currentUser?.result?._id,
            comment_body: commentText,
            user_commented: currentUser?.result?.name,
          })
        );
        setCommentText("");
      }
    } else {
      alert("Please login to comment!!");
    }
  };
  return (
    <>
      <form className="Comments_Submit_Form_Comments" onSubmit={handleOnSubmit}>
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
        {commentList?.data
          ?.filter((q) => video_id === q?.video_id)
          .reverse()
          .map((m) => {
            return (
              <DisplayComments
                cid={m._id}
                userid={m.user_id}
                comment_body={m.comment_body}
                comment_on={m.commented_on}
                user_commented={m.user_commented}
              />
            );
          })}
      </div>
    </>
  );
};

export default Comments;
