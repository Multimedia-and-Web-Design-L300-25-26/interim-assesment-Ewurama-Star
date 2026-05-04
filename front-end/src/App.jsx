import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Explore from './pages/Explore'
import AssetDetail from './pages/AssetDetail'
import Learn from './pages/Learn'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import './App.css'

/* Pages that use the full Navbar + Footer layout */
function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

/* Auth pages — no footer, minimal layout */
function AuthLayout({ children }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      {children}
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/explore" element={<Layout><Explore /></Layout>} />
        <Route path="/asset/:id" element={<Layout><AssetDetail /></Layout>} />
        <Route path="/learn" element={<Layout><Learn /></Layout>} />
        <Route path="/profile" element={<Layout><Profile /></Layout>} />
        <Route path="/signin" element={<AuthLayout><SignIn /></AuthLayout>} />
        <Route path="/signup" element={<AuthLayout><SignUp /></AuthLayout>} />
        {/* 404 fallback */}
        <Route path="*" element={
          <Layout>
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
              <h1 className="text-[48px] font-normal text-gray-900">Page not found</h1>
              <a href="/" className="text-blue-600 hover:underline text-[17px]">Go home</a>
            </div>
          </Layout>
        } />
      </Routes>
    </BrowserRouter>
  )
}
