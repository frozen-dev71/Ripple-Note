import { Main } from "./components/Main/Main";
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import { auth, db } from "./firebase/firebase-config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import {
  getDocs,
  addDoc,
  collection,
  query,
  where,
  setDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

function App() {
  const location = useLocation();
  let currentPage = location.pathname;

  //to track cursour movement
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const [globalCoords, setGlobalCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    setCoords({
      x: event.clientX - event.target.offsetLeft,
      y: event.clientY - event.target.offsetTop,
    });
  };

  useEffect(() => {
    // 👇️ get global mouse coordinates
    const handleWindowMouseMove = (event) => {
      setGlobalCoords({
        x: event.screenX,
        y: event.screenY,
      });
    };
    window.addEventListener("mousemove", handleWindowMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove);
    };
  }, []);

  //to save reg form input
  const [regForm, setRegForm] = useState({
    displayName: "",
    email: "",
    password: "",
  });

  //to handle form input change chnage
  function handleRegChange(event) {
    const { id, value } = event.target;
    setRegForm((prevState) => {
      return {
        ...prevState,
        [id]: value,
      };
    });
  }

  //to save login form input
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

    //to handle form input change chnage
    function handleLoginChange(event) {
      const { id, value } = event.target;
      setLoginForm((prevState) => {
        return {
          ...prevState,
          [id]: value,
        };
      });
    }

  //to save current user from auth in state
  const [user, setUser] = useState({});
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  //to save current user from db
  const [currentUserFromDb, setCurrentUserFromDb] = useState({});
  const [waitForUserFromDb, setWaitForUserFromDb] = useState(false);

//to get users saved in db
  useEffect(() => {
    const getUserDetails = async () => {
      setWaitForUserFromDb(true);
      const userQuery = query(
        collection(db, "users"),
        where("email", "==", user?.email)
      );
      try {
        const querySnapshot = await getDocs(userQuery);
        querySnapshot.forEach((doc) => {
          setCurrentUserFromDb(doc.data());
        });
        setWaitForUserFromDb(false);
      } catch (err) {
        console.log(err.message);
        setWaitForUserFromDb(false);
      }
    };
    getUserDetails();
  }, [user]);


  

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Main
            currentPage={currentPage}
            globalCoords={globalCoords}
            handleMouseMove={handleMouseMove}
            coords={coords}
          />
        }
      />

      <Route
        path="/login"
        element={
          <Login
          // showPassword={showPassword}
          // togglePassword={togglePassword}
          // handleLoginChange={handleLoginChange}
          // showLoader={showLoader}
          // login={login}
          // user={user}
          />
        }
      />

<Route
        path="/register"
        element={
          <Register
            // showPassword={showPassword}
            // togglePassword={togglePassword}
            // handleRegChange={handleRegChange}
            // showLoader={showLoader}
            // register={register}
            // user={user}
            regForm={regForm}
          />
        }
      />

    </Routes>
  );
}

export default App;
