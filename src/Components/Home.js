import Posts from "./Posts/Posts";
import CreatePost from "./CreatePost/CreatePost";
import Welcome from "./Welcome";

const Home = ({ user, slideUpload, getUsername }) => {
  return (
    <>
      {user && slideUpload ? <CreatePost slideUpload={slideUpload} /> : ""}
      {user ? <Posts getUsername={getUsername} /> : <Welcome />}
    </>
  );
};

export default Home;
