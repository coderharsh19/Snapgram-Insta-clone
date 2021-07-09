import "../../Css-styles/Header.css";

import HeaderMenu from "./HeaderMenu";

const Header = ({ slideUp, login, user, logout }) => {
  return (
    <div className="header">
      <div className="header__inner_container">
        <h1>Snapgram</h1>

        {/* CONDITIONAL RENDERING FOR USER*/}
        {user ? (
          <nav className="header__nav">
            <HeaderMenu slideUp={slideUp} />

            <p style={{ fontWeight: "600", userSelect: "none" }}>
              {user ? `Hello, ${user.displayName}` : " "}
            </p>
            <a className="btn header__logout_btn" onClick={logout}>
              Logout
            </a>
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
