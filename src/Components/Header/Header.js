import "../../Css-styles/Header.css";
import { Link } from "react-router-dom";

import HeaderMenu from "./HeaderMenu";

const Header = ({ slideUp, login, user, logout, setProfileUser }) => {
  // const clearLocalStorage = () => {
  //   // localStorage.clear();
  //   setProfileUser("");
  // };
  return (
    <div className="header">
      <div className="header__inner_container">
        <Link to="/">
          <h1>Snapgram</h1>
        </Link>

        {/* CONDITIONAL RENDERING FOR USER*/}
        {user ? (
          <nav className="header__nav">
            <HeaderMenu slideUp={slideUp} />
            <div className="header__nav_profile">
              <p style={{ fontWeight: "600", userSelect: "none" }}>
                {user ? `Hello, ${user.displayName}` : " "}
              </p>
              <a className="btn header__logout_btn" onClick={logout}>
                Logout
              </a>
            </div>
          </nav>
        ) : (
          <a className=" btn header__login_btn" onClick={login}>
            Log-in/Sign-Up
          </a>
        )}
      </div>
    </div>
  );
};

export default Header;
