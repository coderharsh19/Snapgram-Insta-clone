import Posts from "./Posts/Posts";
import CreatePost from "./CreatePost/CreatePost";
import Welcome from "./Welcome";

const Home = ({ user, slideUpload, getUsername, setSlideUpload }) => {
  return (
    <>
      {user && slideUpload ? (
        <CreatePost slideUpload={slideUpload} setSlideUpload={setSlideUpload} />
      ) : (
        ""
      )}
      {user ? <Posts getUsername={getUsername} /> : <Welcome />}
    </>
  );
};

export default Home;
