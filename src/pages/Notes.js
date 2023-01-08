import { Link } from "react-router-dom";
import ScrollToTop from "../helpers/ScrollToTop";
import Header from "../components/Header/Header";
import empty from "../assets/images/empty-box.png";
import close from "../assets/images/cancel.png";
import Loader from "../components/Loader";

const Notes = ({
  note,
  user,
  handleNoteHover,
  handleNoteOut,
  handleClick,
  logout,
  currentUserFromDb,
  handleHideWelcome,
  welcomeMessage,
  waitForUserFromDb,
  notesDataFromDb,
  currentPage,
  globalCoords,
  handleMouseMove,
  coords,
}) => {
  let style = {
    top: `${globalCoords.y - 100}px`,
    left: `${globalCoords.x - 100}px`,
  };
  // console.log(userNote);
  return (
    <>
      <Header
        user={user}
        logout={logout}
        currentUserFromDb={currentUserFromDb}
        currentPage={currentPage}
      />
      <div
        onMouseMove={handleMouseMove}
        className="w-full px-4 sm:px-[100px] py-[100px]"
      >
        {!waitForUserFromDb && !user && <Loader />}
        {waitForUserFromDb && user && <Loader />}
        {welcomeMessage && (
          <div className="w-full px-5 py-3 sm:p-5 mt-4 mb-6 sm:mb-16 border-2 border-[#ffab91] rounded-lg relative">
            <p className="text-[1rem] sm:text-[1.25rem]">
              Hi {currentUserFromDb?.displayName}, welcome to your library.
            </p>
            <img
              className="w-8 h-8 cursor-pointer mr-6 absolute top-1/2 right-0 translate-y-[-50%]"
              alt=""
              src={close}
              onClick={handleHideWelcome}
            />
          </div>
        )}
        <h1 className="text-[1.75rem] sm:text-[2.5rem] mb-8 sm:mb-12 font-bold tracking-wider">
          {!waitForUserFromDb && user && `${currentUserFromDb?.displayName}'s`}{" "}
          {user ? "n" : "N"}otes
        </h1>
        {user && (
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 text-[#252525]">
            {notesDataFromDb.length > 0 ? (
              notesDataFromDb?.map((item, index) => {
                return (
                  <div
                    key={index}
                    onMouseOver={() => handleNoteHover(index)}
                    onMouseOut={() => handleNoteOut(index)}
                    onClick={() => handleClick(index)}
                    className="p-4 sm:p-6 bg-teal-400 cursor-pointer even:bg-[#ffab91] first:bg-[#e7ed9b] last:bg-[#cf94da] first:row-span-2 rounded-lg relative"
                  >
                    <Link to={`/note/${item.id}`}>
                      <div className="overlay w-full h-full absolute top-0 left-0"></div>
                    </Link>
                    <div
                      className={`w-3 h-3 sm:w-[18px] sm:h-[18px] rounded-full absolute top-2 ${
                        item?.hover ? "right-[47%]" : "right-2"
                      } bg-[#252525] transition-all duration-500`}
                    ></div>
                    <h2 className="text-[1.1rem] sm:text-[1.5rem] font-bold mb-2">
                      {item?.title}
                    </h2>
                    <h3>{item?.createdAt}</h3>
                  </div>
                );
              })
            ) : (
              <div className="w-full col-span-2 text-center py-10 border-2 border-teal-400 rounded-xl text-gray-500">
                <img
                  alt="empty"
                  src={empty}
                  className="w-1/3 h-auto mb-4 mx-auto"
                />
                <p className="font-bold text-[2rem]">No notes yet...</p>
                <Link to="/create">
                  <button className="bg-teal-500 text-[0.90rem] mt-8 text-white sm:mt-12 px-5 py-2 rounded-sm hover:bg-teal-400 hover:translate-y-[6px] transition-all duration-300">
                    Create new note
                  </button>
                </Link>
              </div>
            )}
            {/* {eachNote} */}
          </div>
        )}

        {!user && (
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 text-[#252525]">
            {note?.map((item, index) => {
              return (
                <div
                  key={item.id}
                  onMouseOver={() => handleNoteHover(index)}
                  onMouseOut={() => handleNoteOut(index)}
                  onClick={() => handleClick(index)}
                  className="p-4 sm:p-6 bg-teal-400 cursor-pointer even:bg-[#ffab91] first:bg-[#e7ed9b] last:bg-[#cf94da] first:row-span-2 rounded-lg relative"
                >
                  <Link to={`/note/${item.id}`}>
                    <div className="overlay w-full h-full absolute top-0 left-0"></div>
                  </Link>
                  <div
                    className={`w-3 h-3 sm:w-[18px] sm:h-[18px] rounded-full absolute top-2 ${
                      item?.hover ? "right-[47%]" : "right-2"
                    } bg-[#252525] transition-all duration-500`}
                  ></div>
                  <h2 className="text-[1.1rem] sm:text-[1.5rem] font-bold mb-2">
                    {item?.title}
                  </h2>
                  <h3>{item?.date}</h3>
                </div>
              );
            })}
            {/* {eachNote} */}
          </div>
        )}
        <Link to="/create">
          <div className="w-12 h-12 sm:w-[70px] sm:h-[70px] leading-none pt-1 text-[40px] flex justify-center items-center rounded-full cursor-pointer bg-teal-500 hover:bg-teal-400 hover:translate-y-[6px] transition-all duration-300 fixed right-8 bottom-8">
            +
          </div>
        </Link>
        <div
          style={style}
          className={`w-[150px] h-[75px] fixed z-[999] grid grid-cols-4 gap-1 hold`}
          id="cursor"
        >
          <div className="rounded-full bg-teal-400 tile1"></div>
          <div className="rounded-full bg-[#ffab91] tile2"></div>
          <div className="rounded-full bg-[#e7ed9b] tile3"></div>
          <div className="rounded-full bg-[#cf94da] tile4"></div>

          <div className="rounded-full bg-emerald-400 tile5"></div>
          <div className="rounded-full bg-yellow-300 tile6"></div>
          <div className="rounded-full bg-slate-400 tile7"></div>
          <div className="rounded-full bg-red-600 tile8"></div>
        </div>
        <ScrollToTop />
      </div>
    </>
  );
};

export default Notes;
