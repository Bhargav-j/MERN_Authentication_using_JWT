import React from "react";
import "./App.css";
import Header from "./components/Header";
import { Routes, Route} from "react-router-dom";
import Login from "./components/Login";
import Welcome from "./components/Welcome";
import Signup from "./components/Signup";
import { useSelector } from "react-redux";

function App() {
  const isloggedIn = useSelector((state) => state.isloggedIn);

  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user" element={<Welcome isloggedIn = {isloggedIn}/>} />
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
