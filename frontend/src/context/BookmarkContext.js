import { createContext, useReducer } from "react"

export const BookmarkContext = createContext()

export const BookmarkReducer = (state,action) => {
    switch(action.type) {
        case 'SET_BOOKMARKS':
            return {
                bookmarks: action.payload ,
                bookmarkIds: action.payload.map(bookmark => bookmark.bookmarkStory._id)
            }
        case 'ADD_BOOKMARK':
            return {
                bookmarks: [...state.bookmarks, action.payload] ,
                bookmarkIds: [...state.bookmarkIds, action.payload.bookmarkStory._id]
            }
        case 'DELETE_BOOKMARK':
            return {
                bookmarks: state.bookmarks.filter((bookmark) => bookmark.bookmarkStory._id !== action.payload.bookmarkStory) ,
                bookmarkIds: state.bookmarkIds.filter((bookmarkId) => bookmarkId !== action.payload.bookmarkStory._id)
            }
        default :
            return state
    }
}

export const BookmarkContextProvider = ( {children} ) => {
    const [state,dispatchBookmark] = useReducer(BookmarkReducer , { bookmarks: [], bookmarkIds: []})
    return(
        <BookmarkContext.Provider value={{...state,dispatchBookmark}}>  
            { children }
        </BookmarkContext.Provider>
    )
}