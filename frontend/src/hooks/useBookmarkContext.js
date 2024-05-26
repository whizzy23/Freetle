import { BookmarkContext } from "../context/BookmarkContext";
import { useContext } from "react";

export const useBookmarkContext = () => {
    const context = useContext(BookmarkContext)
    if (!context){
        throw Error('useBookmarkContext must be used inside a BookmarksContextProvider')
    }
    else{
        return context
    }
}