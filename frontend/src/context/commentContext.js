import { createContext, useReducer} from "react";

export const CommentContext = createContext()

export const CommentReducer = (state,action) => {
    switch(action.type) {
        case 'SET_COMMENTS':
            return {
                comments: action.payload
            }
        case 'ADD_COMMENT':
            return {
                comments: [action.payload , ...state.comments]
            }
        case 'DELETE_COMMENT':
            return {
                comments: state.comments.filter((comment) => comment._id !== action.payload._id)
            }
        default :
            return state
    }
}

export const CommentContextProvider = ( {children} ) => {
    const [state,dispatchComment] = useReducer(CommentReducer , { comments: [] })
    return(
        <CommentContext.Provider value={{...state,dispatchComment}}>  
            { children }
        </CommentContext.Provider>
    )
}

