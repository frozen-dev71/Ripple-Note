import Header from "../components/Header/Header";
import { Link } from "react-router-dom";
import eye from "../assets/images/eye.png";
import ScrollToTop from "../helpers/ScrollToTop";
import Loader from "../components/Loader";

const Login = ({
  togglePassword,
  showPassword,
  login,
  handleLoginChange,
  showLoader,
}) => {
  return (
    <>
      {showLoader && <Loader />}
      <Header />
      <div className="w-full min-h-[85vh] px-4 my-16 text-white flex items-center justify-center relative">
        <Link to="/" className="absolute top-10 left-2 block sm:hidden">
          <button className="bg-teal-500/80 font-bold text-[0.90rem] mb-8 px-5 py-1 rounded-md hover:bg-teal-400 hover:translate-y-[6px] transition-all duration-300">
            Back to home
          </button>
        </Link>
        <div className="w-full sm:w-[550px] p-5 sm:p-10 rounded-2xl border-2 border-teal-400">
          <h1 className="font-bold text-[1.75rem] text-center">Login</h1>
          <form>
            <input
              type="email"
              id="email"
              onChange={handleLoginChange}
              placeholder="email"
              className="w-full bg-teal-400/20 my-4 p-3 outline-none rounded-lg"
            />
            <div className="w-full relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                onChange={handleLoginChange}
                placeholder="password"
                className="w-full bg-teal-400/20 my-4 p-3 outline-none rounded-lg"
              />
              <img
                alt="reveal"
                src={eye}
                className="w-5 h-5 absolute top-1/2 right-3 translate-y-[-50%] cursor-pointer"
                onClick={togglePassword}
              />
            </div>
            <button
              onClick={login}
              className="w-full bg-teal-400 my-4 p-3 outline-none rounded-lg"
            >
              Login
            </button>
            <p>
              Don't have an account?{" "}
              <Link to="/register" className="text-teal-400">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
      <ScrollToTop />
    </>
  );
};

export default Login;
