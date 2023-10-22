import { useState } from 'react'
import InputField from '../components/InputField'
import CustomBtn from '../components/CustomBtn'
import { loginAccount } from '../services'
import { useNavigate } from 'react-router-dom'

type UserCred = {
  username: string
  password: string
}

type PropsType = {
  setToken: React.Dispatch<React.SetStateAction<string | undefined>>
}

const Login = ({ setToken }: PropsType) => {
  const navigate = useNavigate()
  const [loginError, setLoginError] = useState(false)
  const [userCred, setUserCred] = useState<UserCred>({
    username: '',
    password: ''
  })

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setUserCred({ ...userCred, [event.target.name]: event.target.value })
  }

  const handleLogin = async () => {
    if (userCred.username && userCred.password) {
      const res = await loginAccount(userCred)

      if (res.response) {
        setLoginError(true)
      }

      if (res.data) {
        sessionStorage.setItem('warm_weather_token', res.token)
        sessionStorage.setItem('warm_weather_user', JSON.stringify(res.data))
        setToken(res.token)
        setLoginError(false)
        navigate('/')
      }
    }
  }
  const navigateToRegister = (): void => navigate('/register')

  return (
    <div className="w-3/4 md:w-1/4 h-screen flex flex-col justify-center self-center">
      <InputField
        placeholder="Username"
        name="username"
        onChange={handleOnChange}
        errorColor={false}
      />
      <InputField
        placeholder="Password"
        name="password"
        inputType="password"
        onChange={handleOnChange}
        errorColor={false}
      />
      {loginError && (
        <p className="text-red-700 font-extrabold bg-black px-2 py-2 rounded-md">
          Login error!! Check user and Password
        </p>
      )}
      <CustomBtn title="Login" onClick={handleLogin} />
      <div className="mt-4">
        <p>
          don't have account?{' '}
          <span className="cursor-pointer" onClick={navigateToRegister}>
            click here
          </span>
        </p>
      </div>
    </div>
  )
}

export default Login
