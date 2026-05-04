import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { API_URL } from '../api/config'
import { useAuth } from '../context/AuthContext'

export default function SignIn() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      })
      const data = await response.json()
      if (response.ok) {
        login(data.data.user)
        navigate('/profile')
      } else {
        setError(data.message || 'Login failed')
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-[#0d0d0f] px-5 py-6">

      {/* Logo top-left */}
      <Link to="/">
        <img src="/logo.svg" alt="Coinbase" className="w-9 h-9" style={{ filter: 'brightness(0) invert(1)' }} />
      </Link>

      {/* Centered form */}
      <div className="flex justify-center mt-16 sm:mt-24">
        <div className="w-full max-w-[480px]">

          <h1 className="text-[32px] sm:text-[36px] font-bold text-white mb-8 leading-tight">
            Sign in to Coinbase
          </h1>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-[15px] font-semibold text-white mb-2">Email</label>
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-4 text-[16px] text-white placeholder-gray-500 bg-transparent border border-[#2a2b2f] rounded-2xl outline-none focus:border-blue-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-[15px] font-semibold text-white mb-2">Password</label>
              <input
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-4 text-[16px] text-white placeholder-gray-500 bg-transparent border border-[#2a2b2f] rounded-2xl outline-none focus:border-blue-500 transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 text-[16px] font-semibold text-white bg-[#3d5af1] rounded-full hover:bg-[#3450e0] transition-colors mt-1"
            >
              Continue
            </button>
          </form>

          {/* OR divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-[#2a2b2f]" />
            <span className="text-[13px] text-gray-500">OR</span>
            <div className="flex-1 h-px bg-[#2a2b2f]" />
          </div>

          {/* Social buttons */}
          <div className="flex flex-col gap-3">
            <button className="w-full flex items-center py-4 px-5 bg-[#1e1f23] rounded-full hover:bg-[#26272c] transition-colors">
              <svg className="w-5 h-5 text-white flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
                <path d="M17.5 6.5c-.83 0-1.5.67-1.5 1.5S16.67 9.5 17.5 9.5 19 8.83 19 8s-.67-1.5-1.5-1.5zm-11 0C5.67 6.5 5 7.17 5 8s.67 1.5 1.5 1.5S8 8.83 8 8s-.67-1.5-1.5-1.5z" />
              </svg>
              <span className="flex-1 text-center text-[15px] font-semibold text-white -ml-5">Sign in with Passkey</span>
            </button>

            <button className="w-full flex items-center py-4 px-5 bg-[#1e1f23] rounded-full hover:bg-[#26272c] transition-colors">
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span className="flex-1 text-center text-[15px] font-semibold text-white -ml-5">Sign in with Google</span>
            </button>

            <button className="w-full flex items-center py-4 px-5 bg-[#1e1f23] rounded-full hover:bg-[#26272c] transition-colors">
              <svg className="w-5 h-5 text-white flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <span className="flex-1 text-center text-[15px] font-semibold text-white -ml-5">Sign in with Apple</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
