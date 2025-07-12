import "./App.css";
import { Route, Routes } from "react-router-dom";
import React from "react";
import Home from "./Pages/HomePage";
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import VerifyEmail from "./Pages/VerifyEmail";

import { useSelector } from "react-redux";


function App() {


  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
   

      {/* Set up routing */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail/>} />

        <Route path="/" element={<Home />} />

      </Routes>
    </div>
  );
}

export default App;
