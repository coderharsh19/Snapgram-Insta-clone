import { AiFillHome, AiFillMessage } from "react-icons/ai";
import { GoPerson } from "react-icons/go";
import { MdAddAPhoto } from "react-icons/md";

const HeaderMenu = ({ slideUp }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    /// Menu items
    <ul className="header__menu">
      <li className="header__menu_items">
        <a>
          <AiFillHome className="header__icons" onClick={scrollToTop} />
        </a>
      </li>
      <li className="header__menu_items">
        <a>
          <AiFillMessage
            className="header__icons inbox"
            onClick={() => {
              alert("Feature will be implemented soon");
            }}
          />
        </a>
      </li>
      <li className="header__menu_items">
        <a>
          <GoPerson
            className="header__icons profile"
            onClick={() => {
              alert("Feature will be implemented soon");
            }}
          />
        </a>
      </li>
      <li className="header__menu_items new_post">
        <a>
          <MdAddAPhoto className="header__icons" onClick={slideUp} />
        </a>
      </li>
    </ul>
  );
};

export default HeaderMenu;
