import { createContext, useReducer } from "react"

export const StoriesContext = createContext()

export const StoriesReducer = (state,action) => {
    switch(action.type) {
        case 'SET_STORIES':
            return {
                ...state,
                stories: action.payload
            }
        case 'SET_USER_STORIES':
            return {
                ...state,
                userStories: action.payload
            }
        case 'CREATE_STORY':
            return {
                stories: [action.payload , ...state.stories],
                userStories: [action.payload , ...state.userStories]
            }
        case 'DELETE_STORY':
            return {
                stories: state.stories.filter((story) => story._id !== action.payload._id),
                userStories: state.userStories.filter((story) => story._id !== action.payload._id)
            }
        default :
            return state
    }
}

export const StoriesContextProvider = ( {children} ) => {
    const [state,dispatchStory] = useReducer(StoriesReducer , { stories: [] , userStories: [] })
    return(
        <StoriesContext.Provider value={{...state,dispatchStory}}>  
            { children }
        </StoriesContext.Provider>
    )
}