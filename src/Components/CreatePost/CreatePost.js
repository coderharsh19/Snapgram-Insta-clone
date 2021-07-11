import "../../Css-styles/CreatePost.css";
import { MdAddAPhoto } from "react-icons/md";
import { UserContext } from "../../UserContext";
import { useState, useContext } from "react";

import firebase from "firebase";
import { storage, db } from "../../Config/Firebase";

const CreatePost = ({ slideUpload }) => {
  const user = useContext(UserContext);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progressBar, setProgressBar] = useState(0);
  const [fileName, setFilename] = useState("");

  // let selectedImage;

  const imageUploadHandler = (e) => {
    // console.log(e.target.files[0]);
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      console.log(e.target.files[0]);
      setFilename(`Selected image: ${e.target.files[0].name}`);
    }
  };

  const postUploadHandler = (e) => {
    e.preventDefault();

    if (image) {
      const dataUploader = storage.ref(`/images/${image.name}`).put(image);

      dataUploader.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.floor(
            Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
          );
          setProgressBar(progress);
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          storage
            .ref("images")
            .child(`${image.name}`)
            .getDownloadURL()
            .then((imageUrl) => {
              db.collection("posts").add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                caption: caption,
                username: user.email.replace("@gmail.com", ""),
                uploadedImage: imageUrl,
                userPhoto: user.photoURL,
                imageName: image.name,
              });
            });
          setCaption("");
          setFilename("");
          setProgressBar(0);
          setImage("null");
        }
      );
    }
  };

  return (
    <section className={slideUpload ? "upload" : "slide"}>
      <form action="">
        <label htmlFor="fileUpload">
          <MdAddAPhoto style={{ fontSize: "1.5rem", color: "#ff6c0c" }} />
        </label>
        <input
          id="fileUpload"
          type="file"
          size="60"
          onChange={imageUploadHandler}
          accept="image/*"
        />
        <textarea
          value={caption}
          onChange={(e) => {
            setCaption(e.target.value);
          }}
          rows="6"
          cols="50"
          className="upload__caption"
          placeholder="What's on your mind?"
        />
        <button className="upload__button" onClick={postUploadHandler}>
          Post
        </button>
        <h1 className="upload__progress">
          {progressBar !== 0 ? progressBar : ""}
        </h1>
        <p id="file_name">{fileName}</p>
      </form>
    </section>
  );
};

export default CreatePost;
