import { useState } from "react";

import { db } from "../../Config/Firebase";
import firebase from "firebase";

const CommentForm = ({ id, user, comments }) => {
  const [commentInput, setCommentInput] = useState("");

  //// Pushing comments to comments sub collection based on individual posts ID
  const commentHandler = (e) => {
    e.preventDefault();

    db.collection("posts")
      .doc(id)
      .collection("comments")
      .add({
        username: user.email.replace("@gmail.com", ""),
        comment: commentInput,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setCommentInput("");
        console.log("Comment added to db");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form className="comment_form">
      <textarea
        name=""
        id=""
        cols="15"
        rows="3"
        className="comment_form__input"
        placeholder="Type your comment here..."
        value={commentInput}
        onChange={(e) => {
          setCommentInput(e.target.value);
        }}
      ></textarea>
      <button
        type="submit"
        className="comment_form__button"
        onClick={commentHandler}
      >
        Post
      </button>
    </form>
  );
};

export default CommentForm;
