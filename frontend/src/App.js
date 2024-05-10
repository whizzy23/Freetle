import React from "react";
import Navigation from "./pages/Navigation";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile"
import Bookmark from "./pages/Bookmark";
import PublishedStories from "./pages/PublishedStories";
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