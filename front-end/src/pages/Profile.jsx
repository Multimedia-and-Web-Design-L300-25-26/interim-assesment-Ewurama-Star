import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../api/config'
import { useAuth } from '../context/AuthContext'

export default function Profile() {
  const { user, loading: authLoading, logout, checkAuth } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/signin')
    }
  }, [user, authLoading, navigate])

  if (authLoading) return <div className="p-10 text-center">Loading...</div>
  if (!user) return null

  return (
    <div className="max-w-2xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <p className="mb-4"><strong>Name:</strong> {user.name}</p>
        <p className="mb-4"><strong>Email:</strong> {user.email}</p>
        <p className="mb-4"><strong>Member Since:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
      </div>
      <button 
        onClick={async () => {
          await fetch(`${API_URL}/auth/logout`, { credentials: 'include' })
          logout()
          navigate('/signin')
        }}
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  )
}
