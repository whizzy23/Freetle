import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { toast } from 'react-toastify'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatchAuth } = useAuthContext()

  const signup = async (name, email, password, confirmPassword) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/signup`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ name, email, password, confirmPassword })
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatchAuth({type: 'LOGIN', payload: json})

      // update loading state
      setIsLoading(false)

      toast.success('Sign up successful!')
    }
  }

  return { signup, isLoading, error }
}