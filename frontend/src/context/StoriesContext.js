import { createContext, useReducer } from "react"

export const StoriesContext = createContext()

export const StoriesReducer = (state,action) => {
    switch(action.type) {
        case 'SET_STORIES':
            return {
                stories: action.payload
            }
        case 'CREATE_STORY':
            return {
                stories: [action.payload , ...state.stories]
            }
        // case 'DELETE_STORY':
        //     return {
        //         stories: state.stories.filter((stories) => stories._id !== action.payload.story_id)
        //     }
        default :
            return state
    }
}

export const StoriesContextProvider = ( {children} ) => {
    const [state,dispatchStory] = useReducer(StoriesReducer , { stories: [] })
    return(
        <StoriesContext.Provider value={{...state,dispatchStory}}>  
            { children }
        </StoriesContext.Provider>
    )
}