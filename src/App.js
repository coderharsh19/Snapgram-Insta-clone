import { useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import firebase from "firebase";

import "./App.css";
import Header from "./Components/Header/Header";
import Posts from "./Components/Posts/Posts";

import { auth, provider } from "../src/Config/Firebase";
import Welcome from "./Components/Welcome";
import CreatePost from "./Components/CreatePost/CreatePost";

function App() {
  const [slideUpload, setSlideUpload] = useState(false);
  const [user, setUser] = useState(null);

  /// Keep users logged in on page reloads
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, [user]);

  /// User Login
  const login = () => {
    firebase
      .auth()
      .setPersistence("session")
      .then(async () => {
        const res = await firebase.auth().signInWithPopup(provider);
        const loggedinUser = res.user;
        setUser(loggedinUser);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //User Logout
  const logout = async () => {
    try {
      await auth.signOut();
      console.log("Signout successful");
      setUser(null);
    } catch (error) {
      throw error;
    }
  };

  return (
    <UserContext.Provider value={user}>
      <div className="App">
        <Header
          slideUp={() => {
            setSlideUpload(!slideUpload);
          }}
          login={login}
          user={user}
          logout={logout}
        />

        {user && slideUpload ? <CreatePost slideUpload={slideUpload} /> : ""}
        {user ? "" : <Welcome />}
        <Posts />
      </div>
    </UserContext.Provider>
  );
}

export default App;
