import { menu_dots, user_icon } from '../assets'
import { useNavigate } from 'react-router-dom'

type PropsType = {
  setToken: React.Dispatch<React.SetStateAction<string | undefined>>
  token: string | undefined
}

const Navbar = ({ token, setToken }: PropsType) => {
  const navigate = useNavigate()
  const handleUserClick = () => {
    if (token) {
      navigate('/profile')
    } else {
      navigate('/login')
    }
  }

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
