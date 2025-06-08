import React, {useState} from "react";
import "./Comments.css";
import moment from "moment";

const DisplayComments = ({
  cid,
  userid,
  comment_on,
  comment_body,
  user_commented,
}) => {
  const [edit, setEdit] = useState(false);
  const [commentBody, setCommentBody] = useState("");
  const [commentId, setCommentId] = useState("");
  const currentUser = {
    result: {
      _id: 1,
      name: "abc",
      email: "abc@gmail.com",
      joinedOn: "07/06/2025",
    },
  };
  const handleEdit = (cmtid, cmtbody) => {
    setEdit(true);
    setCommentId(cmtid);
    setCommentBody(cmtbody);
  };
  return (
    <>
      {edit ? (
        <>
          <form className="Comments_Submit_Form_Comments">
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
        </>
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
          <i>Delete</i>
        </p>
      )}
    </>
  );
};

export default DisplayComments;
