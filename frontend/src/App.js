import React from "react";
import Navigation from "./pages/Navigation";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile"
import Bookmark from "./pages/Bookmark";
import PublishedStories from "./pages/PublishedStories";
import StoryPage from "./pages/StoryPage";
import { BrowserRouter , Routes , Route , Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import "./custom.css"

function App() {
  const { user } = useAuthContext(); 
  return (
    <BrowserRouter>
      <div className="App bg-dark-subtle bg-gradient min-vh-100 custom-scrollbar">
        <Navigation />
        <Routes>
          <Route exact path="/" element={user ? <Home /> : <Navigate to="/signup" />}                    /> 
          <Route path="/about" element={user ? <About /> : <Navigate to="/signup" />}                    /> 
          <Route path="/contact" element={user ? <Contact /> : <Navigate to="/signup" />}                />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/signup" />}                />
          <Route path="/bookmarks" element={user ? <Bookmark /> : <Navigate to="/signup" />}             />
          <Route path="/publications" element={user ? <PublishedStories /> : <Navigate to="/signup" />}  />
          <Route path="/story/:id" element={user ? <StoryPage /> : <Navigate to="/signup" />}            />
          <Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/" />}                       />
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;