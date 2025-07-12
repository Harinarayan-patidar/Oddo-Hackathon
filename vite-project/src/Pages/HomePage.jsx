import React from "react";
import Header from "../components/core/Auth/Home Page/Header";
import Hero from "../components/core/Auth/Home Page/Hero";
import Features from "../components/core/Auth/Home Page/Features";
import ItemGrid from "../components/core/Auth/Home Page/ItemGrid";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <ItemGrid />
    </div>
  );
};

export default HomePage;
