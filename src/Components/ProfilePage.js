import { useState, useEffect } from "react";
import SinglePost from "./Posts/SinglePost";
import "../Css-styles/Posts.css";
import { useContext } from "react";
import { UserContext } from "../UserContext";

import { db } from "../Config/Firebase";

const Profile = ({ userProfile }) => {
  const user = useContext(UserContext);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let userProfile = localStorage.getItem("profileUser");
    db.collection("posts")
      .where("username", "==", userProfile)
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
          />
        );
      })}
    </section>
  );
};

export default Profile;
