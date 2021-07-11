import { useState, useEffect } from "react";
import SinglePost from "./Posts/SinglePost";
import "../Css-styles/Posts.css";
import { useContext } from "react";
import { UserContext } from "../UserContext";

import { db } from "../Config/Firebase";

const Profile = ({ profileUser }) => {
  const user = useContext(UserContext);

  const [posts, setPosts] = useState([]);

  /// Retriving comments from Firebase DB on page reload

  useEffect(() => {
    db.collection("posts")
      .where("username", "==", profileUser)
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            postId: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, [profileUser]);

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
          />
        );
      })}
    </section>
  );
};

export default Profile;
