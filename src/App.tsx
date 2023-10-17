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
      className="App flex flex-col md:justify-start w-screen
    bg-cover bg-no-repeat"
      style={{
        // background: 'rgb(238,174,202)',
        background:
          'linear-gradient(50deg, rgba(230,206,141,1) 0%, rgba(29,253,204,1) 57%, rgba(69,185,252,1) 100%)'
      }}
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
