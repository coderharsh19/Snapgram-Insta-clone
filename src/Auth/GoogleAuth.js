import { auth, db, storage, provider } from "../Config/Firebase";

export const login = async () => {
  await auth
    .signInWithPopup(provider)
    .then((res) => {
      let user = res.user;
      setUser(user);
      return user;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const logout = async () => {
  await auth
    .signOut()
    .then(() => {
      console.log("Signout successful");
      setUser(null);
    })
    .catch((error) => {
      console.log(error.message);
    });
};
