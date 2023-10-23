import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Profile from './pages/Profile'
import { useEffect, useState } from 'react'

function App() {
  const [token, setToken] = useState<string>()

  useEffect(() => {
    const tokenExist = sessionStorage.getItem('warm_weather_token')
    setToken(tokenExist ? tokenExist : undefined)
  }, [token])

  return (
    <div
      className="App flex flex-col md:justify-start w-screen min-h-screen
    bg-cover bg-no-repeat"
    >
      {/* bg-image-hero  */}
      <Navbar token={token} setToken={setToken} />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="register" Component={Register} />
        <Route path="login" Component={() => <Login setToken={setToken} />} />
        <Route
          path="profile"
          Component={() => <Profile setToken={setToken} />}
        />
      </Routes>
    </div>
  )
}

export default App
