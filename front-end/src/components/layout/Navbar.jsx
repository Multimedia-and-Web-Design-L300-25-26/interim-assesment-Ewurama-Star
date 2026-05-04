import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { API_URL } from '../../api/config'

/* Main navigation bar — sticky at top, responsive */
export default function Navbar() {
  const { user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const navLinks = [
    { label: 'Cryptocurrencies', path: '/explore' },
    { label: 'Learn', path: '/learn' },
    { label: 'Individuals', path: '/' },
    { label: 'Businesses', path: '/' },
    { label: 'Institutions', path: '/' },
    { label: 'Developers', path: '/' },
    { label: 'Company', path: '/' },
  ]

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  return (
    <header className="w-full border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-10 h-[70px] flex items-center justify-between">

        {/* Logo + desktop nav */}
        <div className="flex items-center gap-10">
          <Link to="/" className="flex-shrink-0">
            <img src="/logo.svg" alt="Coinbase" className="h-11 w-11" />
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="text-[15px] font-semibold text-gray-900 hover:text-gray-600 transition-colors whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Desktop right side */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Search */}
          {searchOpen ? (
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <input
                autoFocus
                type="text"
                placeholder="Search crypto..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 text-[15px] border border-gray-300 rounded-full outline-none focus:border-blue-500"
              />
              <button type="submit" className="text-blue-600 text-[14px] font-semibold">Go</button>
              <button type="button" onClick={() => setSearchOpen(false)} className="text-gray-500 text-[14px]">✕</button>
            </form>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="w-11 h-11 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          )}

          {/* Globe */}
          <button className="w-11 h-11 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
              <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </button>

          {user ? (
            <>
              <Link to="/profile" className="px-5 py-2.5 text-[15px] font-medium text-blue-600 hover:text-blue-700 transition-colors">
                {user.name}
              </Link>
              <button 
                onClick={async () => {
                  await fetch(`${API_URL}/auth/logout`, { credentials: 'include' })
                  logout()
                  navigate('/signin')
                }}
                className="px-5 py-2.5 text-[15px] font-medium text-gray-900 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" className="px-5 py-2.5 text-[15px] font-medium text-gray-900 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
                Sign in
              </Link>
              <Link to="/signup" className="px-5 py-2.5 text-[15px] font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors">
                Sign up
              </Link>
            </>
          )}
        </div>

        {/* Mobile right side */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
          <Link to="/signup" className="px-5 py-2.5 text-[15px] font-medium text-white bg-blue-600 rounded-full">
            Sign up
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
              {menuOpen
                ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
                : <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile search bar */}
      {searchOpen && (
        <div className="lg:hidden px-5 pb-3 border-b border-gray-100">
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <input
              autoFocus
              type="text"
              placeholder="Search crypto..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2.5 text-[15px] border border-gray-300 rounded-full outline-none focus:border-blue-500"
            />
            <button type="submit" className="px-4 py-2.5 text-[14px] font-semibold text-white bg-blue-600 rounded-full">Search</button>
          </form>
        </div>
      )}

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 px-5 py-4 flex flex-col gap-4">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className="text-[17px] font-semibold text-gray-900 py-2 border-b border-gray-100"
            >
              {item.label}
            </Link>
          ))}
          <div className="flex gap-3 pt-2">
            <Link to="/signin" onClick={() => setMenuOpen(false)} className="flex-1 text-center px-5 py-3 text-[15px] font-medium text-gray-900 border border-gray-300 rounded-full">Sign in</Link>
            <Link to="/signup" onClick={() => setMenuOpen(false)} className="flex-1 text-center px-5 py-3 text-[15px] font-medium text-white bg-blue-600 rounded-full">Sign up</Link>
          </div>
        </div>
      )}
    </header>
  )
}
