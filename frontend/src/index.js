import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BookmarkContextProvider } from './context/BookmarkContext';
import { StoriesContextProvider } from './context/StoriesContext';
import { AuthContextProvider } from './context/AuthContext';
import { UserContextProvider } from './context/UserContext';
import { BooksContextProvider } from './context/BooksContext';
import { CommentContextProvider } from './context/commentContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <UserContextProvider>
        <BookmarkContextProvider>
          <CommentContextProvider>
            <StoriesContextProvider>
              <BooksContextProvider>
                <App />
              </BooksContextProvider>
              <ToastContainer position="bottom-center" autoClose={500} hideProgressBar newestOnTop closeOnClick
              rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover theme="dark" />
            </StoriesContextProvider>
          </CommentContextProvider>
        </BookmarkContextProvider>
      </UserContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
