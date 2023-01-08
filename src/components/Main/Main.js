import hero from "../../assets/images/searching-icon.svg";
import crown from "../../assets/images/handy-line.png";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
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
            <div className="w-[fit-content] px-5 py-2 sm:p-5 mb-4 sm:mb-16 border-2 border-[#5EC2B7] rounded-lg relative">
              <p className="text-[0.85rem] sm:text-[1rem]">
                Logged in, {currentUserFromDb?.displayName}.
              </p>
            </div>
          )}
		   <div className="block sm:flex items-center">
            <div className="w-full sm:w-1/2 sm:mr-auto mb-10 sm:mb-0">
              <img alt="" src={hero} className="w-[70%] mx-auto h-auto swing" />
            </div>
            <div className="w-full sm:w-[50%] text-center relative">
              <div className="relative">
                <img
                  alt=""
                  src={crown}
                  className="w-[80px] h-[80px] hidden sm:block absolute left-[-5%] top-[-40px]"
                />
                <h1 className="text-[1.75rem] sm:text-[2.5rem] font-bold mb-5 sm:mb-[30px]">
                  Create & save your sticky notes for free!
                </h1>
              </div>
              <p className="tracking-wider">
                Keeping track of your notes just got a lot easier! Create,
                organise, and store your notes with this easy-to-use free tool.
                Created notes are organized into neat rows of edittable sticky
                notes. <br />
                <br />- Designed and Built by{" "}
                <span className="text-teal-400">Berk Beleli</span>.
                <br /> Really, what will you all do without me. you're welcome.
              </p>
              {!user && (
                <Link to="/register">
                  <button className="bg-teal-500 text-[0.90rem] mt-8 sm:mt-12 px-5 py-2 rounded-sm hover:bg-teal-400 hover:translate-y-[6px] transition-all duration-300">
                    Sign Up to get started
                  </button>
                </Link>
              )}
              {user && (
                <Link to="/create">
                  <button className="bg-teal-500 text-[0.90rem] mt-8 sm:mt-12 px-5 py-2 rounded-sm hover:bg-teal-400 hover:translate-y-[6px] transition-all duration-300">
                    Create new note
                  </button>
                </Link>
              )}
            </div>
            <Link to="/create">
              <div className="w-12 h-12 sm:w-[70px] sm:h-[70px] leading-none pt-1 text-[40px] flex justify-center items-center rounded-full cursor-pointer bg-teal-500 hover:bg-teal-400 hover:translate-y-[6px] transition-all duration-300 fixed right-8 bottom-8">
                +
              </div>
            </Link>
          </div>
          <div
            style={style}
            className={`w-[150px] h-[75px] fixed z-[999] grid grid-cols-4 gap-1 hold`}
            id="cursor"
          >
            <div className="rounded-full bg-teal-400 tile1"></div>
            <div className="rounded-full bg-[#5EC2B7] tile2"></div>
            <div className="rounded-full bg-[#e7ed9b] tile3"></div>
            <div className="rounded-full bg-[#cf94da] tile4"></div>

            <div className="rounded-full bg-emerald-400 tile5"></div>
            <div className="rounded-full bg-yellow-300 tile6"></div>
            <div className="rounded-full bg-slate-400 tile7"></div>
            <div className="rounded-full bg-red-600 tile8"></div>
          </div>
        </section>
      </main>
    </>
  );
};
export default Main;