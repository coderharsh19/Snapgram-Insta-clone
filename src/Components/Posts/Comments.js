import { useContext, useState } from "react";
import { UserContext } from "../../UserContext";
import { BiTrash } from "react-icons/bi";
import { db } from "../../Config/Firebase";
import firebase from "firebase";

const Comments = ({ username, comment, commentId, postId }) => {
  const user = useContext(UserContext);

  /// Comment deletion (User Can delete only comment that he/she posted)
  const deleteComment = () => {
    db.collection("posts")
      .doc(postId)
      .collection("comments")
      .doc(commentId)
      .delete();
  };

  return (
    <div className="comment">
      <h3 className="comment__username">{username}</h3>
      <p className="comment__text">{comment}</p>

      {user && user.email.replace("@gmail.com", "") === username ? (
        <BiTrash className="comment__delete" onClick={deleteComment} />
      ) : (
        ""
      )}
    </div>
  );
};

export default Comments;
