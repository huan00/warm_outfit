import React, { useEffect, useState } from 'react'
import { menu_dots, user_icon } from '../assets'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const [token, setToken] = useState<string>()
  // const [user, setUser] = useState<string | undefined>()
  const navigate = useNavigate()
  const handleUserClick = (): void => {
    if (token) {
      navigate('/profile')
    } else {
      navigate('/login')
    }
  }

  useEffect(() => {
    const tokenExist = sessionStorage.getItem('warm_weather_token')
    setToken(tokenExist ? tokenExist : undefined)
  }, [token])

  return (
    <div className="w-full h-12 flex justify-between items-center bg-slate-800 px-4">
      <div>
        <p
          className="text-white cursor-pointer"
          onClick={() => {
            navigate('/')
          }}
        >
          Warm-Weather
        </p>
      </div>
      <div className="text-white flex w-1/2 justify-end">
        <img
          src={user_icon}
          alt="user icon"
          className="w-8 h-8 ml-4 cursor-pointer"
          onClick={handleUserClick}
        />
        <img
          src={menu_dots}
          alt="user icon"
          className="w-8 h-8 ml-4 cursor-pointer"
        />
      </div>
    </div>
  )
}

export default Navbar
