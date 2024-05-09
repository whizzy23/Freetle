import React from "react";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Contact from "./components/Contact";
import About from "./components/About";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile"
import Bookmark from "./components/Bookmark";
import PublishedStories from "./components/PublishedStories";
import { BrowserRouter , Routes , Route } from "react-router-dom";
import "./custom.css"

function App() {
  return (
    <BrowserRouter>
      <div className="App bg-dark-subtle bg-gradient min-vh-100 custom-scrollbar">
        <Navigation />
        <Routes>
          <Route exact path="/" element={<Home />}     /> 
          <Route path="/about" element={<About />}     /> 
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/bookmarks" element={<Bookmark />} />
          <Route path="/publications" element={<PublishedStories />} />
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;