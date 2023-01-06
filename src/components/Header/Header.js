import logo from "../../assets/images/noteapp.png";
import menu from "../../assets/images/xboxmenu.png";
import close from "../../assets/images/cancel.png";
import userImg from "../../assets/images/user.png";
import { Link } from "react-router-dom";
import { useState } from "react";

const Header = ({ user, logout, currentUserFromDb, currentPage }) => {
  const [openMenu, setOpenMenu] = useState(false);

  function openDropdown() {
    setOpenMenu((prevState) => !prevState);
  }

  //to close the dropdown after clicking a link
  const hideDropdown = () => {
    setOpenMenu(false);
  };


};
export default Header;
