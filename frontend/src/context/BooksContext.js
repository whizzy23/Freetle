import { createContext, useReducer, useEffect } from "react";

export const BooksContext = createContext();

const booksReducer = (state, action) => {
  switch (action.type) {
    case "SET_BOOKS":
      return { ...state, books: action.payload || [] };

    case "SET_USER_BOOKS":
      return { ...state, userBooks: action.payload || [] };

    case "ADD_BOOK":
      return {
        ...state,
        books: [action.payload, ...(state.books || [])],
        userBooks: state.userBooks ? [action.payload, ...state.userBooks] : state.userBooks,
      };

    case "DELETE_BOOK":
      return {
        ...state,
        books: (state.books || []).filter((book) => book._id !== action.payload),
        userBooks: state.userBooks ? state.userBooks.filter((book) => book._id !== action.payload) : state.userBooks,
      };

    case "UPDATE_BOOK":
      return {
        ...state,
        books: (state.books || []).map((book) =>
          book._id === action.payload._id ? action.payload : book
        ),
        userBooks: state.userBooks
          ? state.userBooks.map((book) =>
              book._id === action.payload._id ? action.payload : book
            )
          : state.userBooks,
      };

    default:
      return state;
  }
};

export const BooksContextProvider = ({ children }) => {
  const [state, dispatchBook] = useReducer(booksReducer, { books: [], userBooks: [] });

  return (
    <BooksContext.Provider value={{ ...state, dispatchBook }}>
      {children}
    </BooksContext.Provider>
  );
};
