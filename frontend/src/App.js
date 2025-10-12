import React from "react";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile"
import Bookmark from "./pages/Bookmark";
import PublishedStories from "./pages/PublishedStories";
import Purchase from "./pages/Purchase";
import StoryPage from "./pages/StoryPage";
import Purchases from "./pages/Purchases";
import NotFound from "./pages/NotFound";
import { BrowserRouter , Routes , Route , Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import "./custom.css"

function App() {
  const { user, isLoading } = useAuthContext(); 
  const loadingElement = (
    <div className="d-flex min-vh-100 justify-content-center align-items-center">
      <p className="fs-4">Loading...</p>
    </div>
  );

  return (
    <BrowserRouter>
      <div className="App bg-dark-subtle bg-gradient min-vh-100 custom-scrollbar">
        <Navigation user={user} isLoading={isLoading} />
        <Routes>
          <Route exact path="/" element={isLoading ? loadingElement : user ? <Home /> : <Navigate to="/signup" />}                    /> 
          <Route path="/about" element={isLoading ? loadingElement : user ? <About /> : <Navigate to="/signup" />}                    /> 
          <Route path="/contact" element={isLoading ? loadingElement : user ? <Contact /> : <Navigate to="/signup" />}                />
          <Route path="/profile" element={isLoading ? loadingElement : user ? <Profile /> : <Navigate to="/signup" />}                />
          <Route path="/bookmarks" element={isLoading ? loadingElement : user ? <Bookmark /> : <Navigate to="/signup" />}             />
          <Route path="/publications" element={isLoading ? loadingElement : user ? <PublishedStories /> : <Navigate to="/signup" />}  />
          <Route path="/purchase" element={isLoading ? loadingElement : user ? <Purchase /> : <Navigate to="/signup" />}              />
          <Route path="/story/:id" element={isLoading ? loadingElement : user ? <StoryPage /> : <Navigate to="/signup" />}            />
          <Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/" />}                                                    />
          <Route path="/purchases" element={isLoading ? loadingElement : user ? <Purchases /> : <Navigate to="/signup" />}            />
          <Route path="*" element={isLoading ? loadingElement : user ? <NotFound /> : <Navigate to="/signup" />}                      />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;