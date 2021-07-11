import Comments from "./Comments";
import CommentForm from "./CommentForm";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../UserContext";
import { BiTrash } from "react-icons/bi";
import { db } from "../../Config/Firebase";
import { Link } from "react-router-dom";

const SingePost = ({
  username,
  caption,
  uploadedImage,
  userPhoto,
  postId,
  getUsername,
}) => {
  const user = useContext(UserContext);
  const [comments, setComments] = useState([]);

  /// Retriving comments from Firebase DB on page reload
  useEffect(() => {
    if (postId) {
      db.collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp")
        .onSnapshot((snapshot) => {
          setComments(
            snapshot.docs.map((comment) => ({
              comment: comment.data(),
              commentId: comment.id,
            }))
          );
        });
    }
  }, [postId]);

  /// Post Deletion (User can delete only the posts that he uploaded)
  const deletePost = () => {
    db.collection("posts")
      .doc(postId)
      .delete()
      .then(() => {
        console.log("Post  deleted ");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="single_post">
      <div className="single_post__header">
        <img src={userPhoto} alt="user" className="single_post__thumbnail" />

        <Link to={{ pathname: `/${username}` }}>
          <h3 className="single_post__username" onClick={getUsername}>
            {username}
          </h3>
        </Link>

        <div className="single_post__delete">
          {user && user.email.replace("@gmail.com", "") === username ? (
            <BiTrash
              onClick={deletePost}
              style={{ fontSize: "23px", cursor: "pointer" }}
            />
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="single_post__data">
        <img src={uploadedImage} alt="random" className="single_post__image" />
        <div className="single_post__caption__container">
          <h3 className="single_post__username">{username}</h3>
          <p className="single_post__caption">{caption}</p>
        </div>
      </div>
      <div className="comments__container">
        {comments
          ? comments.map(({ comment, commentId }) => {
              return (
                <Comments
                  key={commentId}
                  username={comment.username}
                  comment={comment.comment}
                  commentId={commentId}
                  postId={postId}
                />
              );
            })
          : ""}
      </div>

      {/*ONLY LOGGED IN USER CAN COMMENT */}
      {user ? (
        <CommentForm key={postId} id={postId} user={user} comments={comments} />
      ) : (
        ""
      )}
    </div>
  );
};

export default SingePost;
