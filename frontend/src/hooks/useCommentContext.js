import { CommentContext } from "../context/commentContext";
import { useContext } from "react";

export const useCommentContext = () => {
    const context = useContext(CommentContext)
    if (!context){
        throw Error('useCommentContext must be used inside a CommentContextProvider')
    }
    else{
        return context
    }
}