import "./App.css";
import { Route, Routes } from "react-router-dom";
import React from "react";
import Home from "./Pages/HomePage";

import { useSelector } from "react-redux";


function App() {


  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
   

      {/* Set up routing */}
      <Routes>
        <Route path="/" element={<Home />} />

      </Routes>
    </div>
  );
}

export default App;
