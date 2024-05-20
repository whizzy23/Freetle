import { useAuthContext } from './useAuthContext'
import { useStoriesContext } from './useStoriesContext'

export const useLogout = () => {
  const { dispatchAuth } = useAuthContext()
  const { dispatchStory } = useStoriesContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')
    // dispatch logout action
    dispatchAuth({ type: 'LOGOUT' })
    //clearing stories after logout
    dispatchStory({ type: 'SET_STORIES', payload: [] })
  }

  return { logout }
}