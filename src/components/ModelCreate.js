import { Link } from "react-router-dom";

const ModalCreate = () => {
  return (
    <div className="w-full h-[100vh] fixed top-0 left-0 bg-black/90 flex justify-center items-center z-50 swell">
      <div className="w-[80%] md:w-[40%] p-6 md:p-12 rounded-lg bg-[#252525] border border-teal-400">
        <div className="text-white text-[1.2rem] md:text-[2rem] font-bold flex justify-center items-center text-center">
          Hi there, sign up to start creating and saving ripple notes.
          <br /> it won't take long!
        </div>
        <div className="flex gap-8 mt-6 w-full">
          <Link to="/login" className="w-1/2">
            <button className="bg-[#5EC2B7] text-black w-full font-bold text-[0.90rem] mr-5 px-5 py-2 sm:py-3 rounded-md hover:bg-teal-500 hover:translate-y-[6px] transition-all duration-300">
              Sign In
            </button>
          </Link>
          <Link to="/register" className="w-1/2">
            <button className="bg-teal-400 text-black w-full font-bold text-[0.90rem] px-5 py-2 sm:py-3 rounded-md hover:bg-teal-500 hover:translate-y-[6px] transition-all duration-300">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ModalCreate;
