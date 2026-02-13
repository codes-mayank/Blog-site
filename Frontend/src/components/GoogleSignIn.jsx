import { GoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useUser } from '../context/UserContext'

function GoogleSignIn({ buttonText = 'signin_with', onError }) {
  const navigate = useNavigate()
  const { login } = useUser()
  const [loading, setLoading] = useState(false)

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true)

    try {
      const response = await fetch('http://localhost:8000/auth/google/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          token: credentialResponse.credential
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.detail || 'Google authentication failed')
      }

      // Use the same login function from UserContext
      login(data)
      navigate('/')
    } catch (err) {
      const errorMessage = err.message || 'Google authentication failed. Please try again.'
      if (onError) {
        onError(errorMessage)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleError = () => {
    const errorMessage = 'Google authentication failed. Please try again.'
    if (onError) {
      onError(errorMessage)
    }
  }

  return (
    <div className="relative w-full">
      {loading && (
        <div className="absolute inset-0 bg-white/90 flex items-center justify-center rounded-lg z-10">
          <span className="text-text-secondary text-sm">Authenticating...</span>
        </div>
      )}
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleError}
        text={buttonText}
        shape="rectangular"
        theme="outline"
        size="large"
        // width="100%"
      />
    </div>
  )
}

export default GoogleSignIn