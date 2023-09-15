import React from 'react'
import { menu_dots, user_icon } from '../assets'

const Navbar = () => {
  return (
    <div className="w-full h-12 flex justify-between items-center bg-slate-800 px-4">
      <div>
        <p className="text-white">Warm-Weather</p>
      </div>
      <div className="text-white flex w-1/2 justify-end">
        <img src={user_icon} alt="user icon" className="w-8 h-8 ml-4" />
        <img src={menu_dots} alt="user icon" className="w-8 h-8 ml-4" />
      </div>
    </div>
  )
}

export default Navbar
