import { useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import firebase from "firebase";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import Header from "./Components/Header/Header";
import Profile from "./Components/ProfilePage";

import Home from "./Components/Home";

import { auth, provider } from "../src/Config/Firebase";

function App() {
  const [slideUpload, setSlideUpload] = useState(false);
  const [user, setUser] = useState(null);

  let userProfile;

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

  const getUsername = (e) => {
    userProfile = e.target.innerText.toLowerCase();
    localStorage.setItem("profileUser", userProfile);
  };

  return (
    <UserContext.Provider value={user}>
      <Router>
        <div className="App">
          <Header
            slideUp={() => {
              setSlideUpload(!slideUpload);
            }}
            login={login}
            user={user}
            logout={logout}
          />
          <Switch>
            <Route path="/" exact>
              <Home
                user={user}
                slideUpload={slideUpload}
                getUsername={getUsername}
                setSlideUpload={setSlideUpload}
              />
            </Route>
          </Switch>
          <Switch>
            <Route path="/:id" exact>
              <Profile userProfile={userProfile} />
            </Route>
          </Switch>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
