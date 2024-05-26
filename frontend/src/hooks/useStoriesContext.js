import { StoriesContext } from "../context/StoriesContext";
import { useContext } from "react";

export const useStoriesContext = () => {
    const context = useContext(StoriesContext)
    if (!context){
        throw Error('useStoriesContext must be used inside a StoriesContextProvider')
    }
    else{
        return context
    }
}