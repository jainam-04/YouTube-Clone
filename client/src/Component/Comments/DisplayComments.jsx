import React, {useState} from "react";
import "./Comments.css";
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import {editComment, deleteComment} from "../../Action/Comments.js";
import changeThemeBasedOnTime from "../../Utils/ChangeThemeBasedOnTime.js";

const DisplayComments = ({
  cid,
  userid,
  comment_on,
  comment_body,
  user_commented
}) => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [commentBody, setCommentBody] = useState("");
  const [commentId, setCommentId] = useState("");
  const currentUser = useSelector((state) => state.currentUserReducer);
  const state = currentUser?.result?.state;
  const theme = changeThemeBasedOnTime(state);
  const handleEdit = (cmtid, cmtbody) => {
    setEdit(true);
    setCommentId(cmtid);
    setCommentBody(cmtbody);
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!commentBody) {
      alert("Please type your comment...");
    } else {
      dispatch(
        editComment({
          id: commentId,
          commentBody: commentBody,
        })
      );
      setCommentBody("");
    }
    setEdit(false);
  };
  const handleDelete = (id) => {
    dispatch(deleteComment(id));
  };

  return (
    <div className={theme}>
      {edit ? (
        <form
          className="Comments_Submit_Form_Comments"
          onSubmit={handleOnSubmit}
        >
          <input
            type="text"
            className="Comment_iBox"
            onChange={(e) => setCommentBody(e.target.value)}
            placeholder="Edit comment"
            value={commentBody}
          />
          <input
            type="submit"
            className="Comment_Add_Button_Comments"
            value="Change"
          />
        </form>
      ) : (
        <p className="Comment_Body">{comment_body}</p>
      )}
      <p className="UserCommented">
        {" "}
        - {user_commented} commented {moment(comment_on).fromNow()}
      </p>
      {currentUser?.result?._id === userid && (
        <p className="Edit_Delete_DisplayComment">
          <i onClick={() => handleEdit(cid, comment_body)}>Edit</i>
          <i onClick={() => handleDelete(cid)}>Delete</i>
        </p>
      )}
    </div>
  );
};

export default DisplayComments;
