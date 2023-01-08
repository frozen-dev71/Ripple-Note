import ScrollToTop from "../helpers/ScrollToTop";
import Header from "../components/Header/Header";
import { Link } from "react-router-dom";
import ModalCreate from "../components/ModalCreate";

const Create = ({
  user,
  logout,
  currentUserFromDb,
  handleNewNoteChange,
  handleCreate,
  setShowModal,
  showModal,
  currentPage,
}) => {
  return (
    <>
      <Header
        user={user}
        logout={logout}
        currentUserFromDb={currentUserFromDb}
        currentPage={currentPage}
      />
      {!user &&
        setTimeout(() => {
          setShowModal(true);
        }, 4000)}
      {showModal && !user && <ModalCreate />}
      <div className="py-16 mt-4 sm:mt-0 sm:py-[100px] px-3 sm:px-[100px]">
        <Link to="/notes">
          <button className="bg-teal-500/80 font-bold text-[0.90rem] mb-8 px-5 py-1 rounded-md hover:bg-teal-400 hover:translate-y-[6px] transition-all duration-300">
            Back to notes
          </button>
        </Link>
        <h1 className="text-[1.75rem] sm:text-[2.5rem] mb-8 sm:mb-10 font-bold tracking-wider">
          Create new sticky note
        </h1>
        <form>
          <div className="w-full sm:w-2/3 p-5 sm:p-8 border-2 border-teal-500 rounded-lg">
            <h1 className="text-[1.5rem] sm:text-[1.75rem] font-bold text-white">
              Title here
            </h1>
            <input
              type="text"
              id="title"
              onChange={handleNewNoteChange}
              placeholder="Note title"
              className="w-full bg-teal-400/20 text-[1.25rem] sm:text-[1.5rem] my-4 p-3 outline-none rounded-lg"
              required
            />
            <h2 className="text-[1rem] mt-5 text-[#ffab91]">
              <span className="text-[#ffab91]">Time of creation :</span>{" "}
              {new Date().toLocaleString() + ""}
            </h2>
          </div>
          <div className="w-full p-5 sm:p-8 mt-8 sm:mt-16 border-2 border-[#ffab91] rounded-lg">
            <p className="text-[1.25rem]">Body here</p>
            <textarea
              type="text"
              id="body"
              onChange={handleNewNoteChange}
              placeholder="Note body"
              className="w-full h-[180px] bg-[#ffab91]/20 text-[1rem] sm:text-[1.5rem] my-4 p-3 outline-none rounded-lg"
              required
            />
          </div>
          <button
            onClick={handleCreate}
            className="w-full sm:w-2/3 bg-teal-500 my-8 sm:my-16 p-5 outline-none rounded-lg"
          >
            Create note
          </button>
        </form>
      </div>
      <ScrollToTop />
    </>
  );
};

export default Create;
