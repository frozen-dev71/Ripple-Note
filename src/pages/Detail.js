import { Link, useParams } from "react-router-dom";
import ScrollToTop from "../helpers/ScrollToTop";
import Header from "../components/Header/Header";
import Loader from "../components/Loader";
import pencil from "../assets/images/pencil.png";
import trash from "../assets/images/trash.png";

const Detail = ({
  note,
  user,
  logout,
  currentUserFromDb,
  notesDataFromDb,
  handleDelete,
  editorVal,
  showEditpopup,
  handleEditPopup,
  handleUpdateNoteChange,
  waitForUserFromDb,
  handleEdit,
}) => {
  const { id } = useParams();
  const eachNote = note.filter((item) => item.id === Number(id))[0];
  const eachUserNote = notesDataFromDb.filter((item) => item.id === id)[0];

  return (
    <>
      <Header
        user={user}
        logout={logout}
        currentUserFromDb={currentUserFromDb}
      />
      <div className="py-[100px] px-3 sm:px-[100px]">
        {!waitForUserFromDb && !user && <Loader />}
        {waitForUserFromDb && user && <Loader />}
        {/* edit note popup */}
        {showEditpopup && (
          <div className="w-full h-screen bg-[#252525] p-5 sm:p-8 fixed top-16 left-0 z-20 overflow-y-auto no-scrollbar">
            <button
              onClick={() =>
                handleEditPopup(
                  currentUserFromDb.displayName,
                  id,
                  eachUserNote?.title
                )
              }
              className="bg-teal-500/80 font-bold text-[0.90rem] mb-4 px-5 py-1 rounded-md hover:bg-teal-400 hover:translate-y-[6px] transition-all duration-300"
            >
              Cancel edit
            </button>
            <div className="w-full h-[fit-content] sm:w-2/3 p-4 sm:p-6 border-2 border-teal-500 rounded-lg relative">
              <div className="w-full h-full bg-teal-500/70 absolute top-0 left-0 sm:py-2 py-1 sm:px-6 px-4">
                <p className="text-[0.85rem]">Titles are not editable</p>
              </div>
              <div>
                {!user && (
                  <h1 className="text-[1.5rem] sm:text-[2rem] font-bold text-white">
                    {eachNote?.title}
                  </h1>
                )}
                {user && (
                  <h1 className="text-[1.5rem] sm:text-[2rem] font-bold text-white">
                    {eachUserNote?.title}
                  </h1>
                )}
              </div>
              <div>
                {!user && (
                  <h2 className="text-[1rem] mt-5 text-[#5EC2B7]">
                    <span className="text-[#5EC2B7]">Created :</span>{" "}
                    {eachNote?.date}
                  </h2>
                )}
                {user && (
                  <h2 className="text-[1rem] mt-5 text-[#5EC2B7]">
                    <span className="text-[#5EC2B7]">Created :</span>{" "}
                    {eachUserNote?.createdAt}
                  </h2>
                )}
              </div>
            </div>

            <form>
              <div className="w-full p-5 sm:p-8 mt-6 sm:mt-16 border-2 border-[#5EC2B7] rounded-lg">
                <p className="text-[1.25rem]">Body here</p>
                <textarea
                  type="text"
                  id="body"
                  onChange={handleUpdateNoteChange}
                  value={editorVal.body}
                  className="w-full h-[180px] bg-[#5EC2B7]/20 text-[1rem] sm:text-[1.5rem] my-4 p-3 outline-none rounded-lg"
                  required
                />
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleEdit(
                    currentUserFromDb.displayName,
                    id,
                    eachUserNote?.title,
                    editorVal.body
                  );
                  // window.location.reload();
                }}
                className="w-full sm:w-2/3 bg-teal-500 my-8 sm:my-16 p-5 outline-none rounded-lg"
              >
                Edit note
              </button>
            </form>
          </div>
        )}
        <div className="w-full flex justify-between items-start">
          <Link to="/notes">
            <button className="bg-teal-500/80 font-bold text-[0.90rem] mb-8 px-5 py-1 rounded-md hover:bg-teal-400 hover:translate-y-[6px] transition-all duration-300">
              Back
            </button>
          </Link>
          <div className="flex gap-4 justify-between items-center">
            <button
              onClick={() => handleEditPopup(id)}
              className="bg-inherit font-bold text-[0.90rem] mb-8 p-4 sm:p-5 rounded-full border-2 border-[#5EC2B7] hover:bg-[#5EC2B7]/50 hover:translate-y-[6px] transition-all duration-300"
            >
              <img alt="edit" src={pencil} className="w-6 sm:w-8 h-6 sm:h-8" />
            </button>
            <button
              onClick={() => {
                handleDelete(
                  currentUserFromDb.displayName,
                  id,
                  eachUserNote?.title
                );
              }}
              className="bg-inherit font-bold text-[0.90rem] mb-8 p-4 sm:p-5 rounded-full border-2 border-teal-400 hover:bg-teal-400/50 hover:translate-y-[6px] transition-all duration-300"
            >
              <img alt="edit" src={trash} className="w-6 sm:w-8 h-6 sm:h-8" />
            </button>
          </div>
        </div>
        <div className="w-full sm:w-[fit-content] p-5 sm:p-8 border-2 border-teal-500 rounded-lg">
          <div>
            {!user && (
              <h1 className="text-[1.5rem] sm:text-[2rem] font-bold text-white">
                {eachNote?.title}
              </h1>
            )}
            {user && (
              <h1 className="text-[1.5rem] sm:text-[2rem] font-bold text-white">
                {eachUserNote?.title}
              </h1>
            )}
          </div>
          <div>
            {!user && (
              <h2 className="text-[1rem] mt-5 text-[#5EC2B7]">
                <span className="text-[#5EC2B7]">Created :</span>{" "}
                {eachNote?.date}
              </h2>
            )}
            {user && (
              <h2 className="text-[1rem] mt-5 text-[#5EC2B7]">
                <span className="text-[#5EC2B7]">Created :</span>{" "}
                {eachUserNote?.createdAt}
              </h2>
            )}
          </div>
        </div>
        <div className="w-full min-h-[200px] p-5 sm:p-8 mt-16 border-2 border-[#5EC2B7] rounded-lg">
          {!user && <p className="text-[1.25rem]">{eachNote?.body}</p>}
          {user && <p className="text-[1.25rem]">{eachUserNote?.body}</p>}
        </div>
      </div>
      <ScrollToTop />
    </>
  );
};

export default Detail;
