import { useState, useEffect } from "react";
import SinglePost from "./SinglePost";
import "../../Css-styles/Posts.css";
import { useContext } from "react";
import { UserContext } from "../../UserContext";

import { db } from "../../Config/Firebase";

const Posts = ({ getUsername }) => {
  const user = useContext(UserContext);

  const [posts, setPosts] = useState([]);

  /// Retriving comments from Firebase DB on page reload
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            postId: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []);

  return (
    <section
      className="posts"
      style={{
        filter: user ? "blur(0px)" : "blur(6px)",
        userSelect: user ? "" : "none",
      }}
    >
      {posts.map(({ postId, post }) => {
        return (
          <SinglePost
            postId={postId}
            key={postId}
            uploadedImage={post.uploadedImage}
            caption={post.caption}
            username={post.username}
            userPhoto={post.userPhoto}
            getUsername={getUsername}
          />
        );
      })}
    </section>
  );
};

export default Posts;
