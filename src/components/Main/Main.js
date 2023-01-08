import hero from "../../assets/images/searching-icon.svg";
import crown from "./images/handy-line.png";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import ScrollToTop from "../../helpers/ScrollToTop";
import Loader from "../Loader";

const Main = ({
	user,
	logout,
	currentUserFromDb,
	waitForUserFromDb,
	currentPage,
	globalCoords,
	handleMouseMove,
	coords,
  }) => {
	
	let style = {
		top: `${globalCoords.y - 100}px`,
		left: `${globalCoords.x - 100}px`,
	  };

	return(

	);
};