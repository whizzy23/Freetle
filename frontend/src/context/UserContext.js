import { createContext, useReducer } from 'react'

export const UserContext = createContext()

export const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
        return { 
            userData: action.payload
         }
    case 'UPDATE_USER':
        return { 
            userData: [state.userData, action.payload]
        }
    default:
      return state
  }
}

export const UserContextProvider = ({ children }) => {
  const [state, dispatchUser] = useReducer(userReducer, { 
    userData: []
  })

  return (
    <UserContext.Provider value={{ ...state, dispatchUser }}>
      { children }
    </UserContext.Provider>
  )
}