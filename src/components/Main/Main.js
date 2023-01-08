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

  return (
    <>
      <Header
        user={user}
        logout={logout}
        currentUserFromDb={currentUserFromDb}
        currentPage={currentPage}
      />
      <main className="bg-home bg-repeat min-h-screen">
        <section
          onMouseMove={handleMouseMove}
          className="w-full min-h-screen bg-[#252525]/95 px-3 sm:px-[100px] sm:pt-[130px] pt-20 pb-8"
        >
          {!waitForUserFromDb && !user && <Loader />}
          {waitForUserFromDb && user && <Loader />}
          {user && (
            <div className="w-[fit-content] px-5 py-2 sm:p-5 mb-4 sm:mb-16 border-2 border-[#ffab91] rounded-lg relative">
              <p className="text-[0.85rem] sm:text-[1rem]">
                Logged in, {currentUserFromDb?.displayName}.
              </p>
            </div>
          )}
        </section>
      </main>
    </>
  );
};
