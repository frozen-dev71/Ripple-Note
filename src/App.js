import { Main } from "./components/Main/Main";
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import notedata from "./datas/notedatamock.json";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Create from "./pages/Create";
import Notes from "./pages/Notes";

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

  const [showLoader, setShowLoader] = useState(false);
  const navigate = useNavigate();

  //function to create user doc on sign up
  const createUserDocument = async (email, name) => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        email: email,
        displayName: name,
        createdAt: new Date(),
      });
      alert("fds");
      console.log("Document written with ID: ", docRef.id);
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  };

  //to handle reg form data submit to firebase
  const register = async (e) => {
    e.preventDefault();
    setShowLoader(true);

    try {
      await createUserWithEmailAndPassword(
        auth,
        regForm.email,
        regForm.password
      );
      setShowLoader(false);
      navigate("/notes");
      await createUserDocument(regForm.email, regForm.displayName);
    } catch (error) {
      setShowLoader(false);
      console.log(error.message);
      alert("USER ALREADY EXISTS!!");
    }
  };

  //to log in users
  const login = async (e) => {
    e.preventDefault();
    setShowLoader(true);

    try {
      await signInWithEmailAndPassword(
        auth,
        loginForm.email,
        loginForm.password
      );
      setShowLoader(false);
      navigate("/notes");
    } catch (error) {
      setShowLoader(false);
      console.log(error.message);
      alert("INVALID USER CREDENTIALS!!");
    }
  };

  //to log out users
  const logout = async () => {
    signOut(auth).then(() => {
      navigate("/");
    });
  };

  //to set the default notes in state
  const [note, setNote] = useState(notedata);

  const [notesDataFromDb, setNotesDataFromDb] = useState(
    JSON.parse(localStorage.getItem("notesDataFromDb")) || []
  );
  const [allNotesFromDb, setAllNotesFromDb] = useState(
    JSON.parse(localStorage.getItem("allNotesDataFromDb")) || []
  );
  // console.log(notesDataFromDb);
  const [updateNotes, setUpdateNotes] = useState(false);

  //to set hover state of each sticky note
  function handleNoteHover(index) {
    const newNote = [...note];
    newNote[index].hover = true;
    setNote(newNote);
    const newUserNote = [...notesDataFromDb];
    newUserNote[index].hover = true;
    setNotesDataFromDb(newUserNote);
  }

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
      <Route
        path="/create"
        element={
          <Create
            user={user}
            currentUserFromDb={currentUserFromDb}
            currentPage={currentPage}
            // logout={logout}
            // handleNewNoteChange={handleNewNoteChange}
            // handleCreate={handleCreate}
            // newNote={newNote}
            // showModal={showModal}
            // setShowModal={setShowModal}
          />
        }
      />

      <Route
        path="/notes"
        element={
          <Notes
            user={user}
            note={note}
            handleNoteHover={handleNoteHover}
            // handleNoteOut={handleNoteOut}
            // handleClick={handleClick}
            // logout={logout}
            // currentUserFromDb={currentUserFromDb}
            // welcomeMessage={welcomeMessage}
            // handleHideWelcome={handleHideWelcome}
            waitForUserFromDb={waitForUserFromDb}
            notesDataFromDb={notesDataFromDb}
            currentPage={currentPage}
            globalCoords={globalCoords}
            handleMouseMove={handleMouseMove}
            coords={coords}
          />
        }
      />
    </Routes>
  );
}

export default App;
