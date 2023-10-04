import InputField from '../components/InputField'
import userIcon from '../assets/user_icon.png'
import CustomBtn from '../components/CustomBtn'
import { useEffect, useState } from 'react'
import { RegisterType } from '../typings/weather'
import { createUserAccount } from '../services'
import { useNavigate } from 'react-router-dom'

type ErrorType = {
  email?: string
  username?: string
  password?: string
  confirm_password?: string
  first_name?: string
  last_name?: string
  address?: string
  city?: string
  state?: string
  zip_code?: string
}

type ResType = {
  token?: string
  data?: {
    token?: string
  }
  status?: number
  statusText?: string
}

const Register = () => {
  const navigate = useNavigate()
  const [data, setData] = useState<RegisterType>({
    email: '',
    username: '',
    password: '',
    confirm_password: '',
    first_name: '',
    last_name: '',
    address: '',
    city: '',
    state: '',
    zip_code: ''
  })
  const [errorMsg, setErrorMsg] = useState<ErrorType>({})
  const [resError, setResError] = useState<ResType>()
  const [isPsValid, setIsPsValid] = useState<boolean>(false)

  useEffect(() => {
    if (data.password !== data.confirm_password) {
      setIsPsValid(true)
    } else {
      setIsPsValid(false)
    }
  }, [data])

  const handleInputField = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setData({ ...data, [event.target.name]: event.target.value })
  }

  const handleRegister = async (data: RegisterType) => {
    const errorList: ErrorType = {}

    for (const key of Object.keys(data)) {
      if (data[key as keyof typeof data] === '') {
        errorList[key as keyof typeof errorList] = `missing ${key}`
      }
    }
    setErrorMsg(errorList)

    if (Object.keys(errorMsg).length > 0) return

    const res: ResType | undefined = await createUserAccount(data)

    if (res !== undefined && res.data?.token) {
      sessionStorage.setItem('warm_weather_token', res.data.token)
      setResError(undefined)
      setErrorMsg({
        email: '',
        username: '',
        password: '',
        confirm_password: '',
        first_name: '',
        last_name: '',
        address: '',
        city: '',
        state: '',
        zip_code: ''
      })
    } else if (res?.status !== 200) {
      setResError(res)
    }
  }

  const navigateToRegister = (): void => navigate('/login')

  return (
    <div
      className="flex h-full items-center relative
    md:h-full md:max-w-[1280px] md:justify-center md:self-center"
    >
      <div className="flex flex-col w-full h-full flex-1 justify-evenly items-center relative">
        <div className="flex flex-col w-full justify-evenly items-center">
          <img src={userIcon} alt="user icon" className="w-1/4 mb-2" />
        </div>

        <div className="w-11/12">
          <InputField
            onChange={handleInputField}
            name="email"
            placeholder="Email"
            inputType="email"
            errorColor={errorMsg?.email ? true : false}
          />
          <InputField
            onChange={handleInputField}
            name="username"
            placeholder="Username"
            errorColor={errorMsg?.username ? true : false}
          />
          <div className="flex justify-between">
            <div className="flex w-[49%]">
              <InputField
                onChange={handleInputField}
                name="password"
                placeholder="Password"
                inputType="password"
                errorColor={isPsValid}
              />
            </div>
            <div className="flex w-[49%]">
              <InputField
                onChange={handleInputField}
                name="confirm_password"
                placeholder="Confirm Password"
                inputType="password"
                errorColor={isPsValid}
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex w-[49%]">
              <InputField
                onChange={handleInputField}
                name="first_name"
                placeholder="First Name"
                errorColor={errorMsg?.first_name ? true : false}
              />
            </div>
            <div className="flex w-[49%]">
              <InputField
                onChange={handleInputField}
                name="last_name"
                placeholder="Last Name"
                errorColor={errorMsg?.last_name ? true : false}
              />
            </div>
          </div>
          <InputField
            onChange={handleInputField}
            name="address"
            placeholder="Address"
            errorColor={errorMsg?.address ? true : false}
          />
          <div className="flex justify-between">
            <div className="flex w-[49%]">
              <InputField
                onChange={handleInputField}
                name="city"
                placeholder="City"
                errorColor={errorMsg?.city ? true : false}
              />
            </div>
            <div className="flex w-[49%]">
              <InputField
                onChange={handleInputField}
                name="state"
                placeholder="State"
                errorColor={errorMsg?.state ? true : false}
              />
            </div>
          </div>
          <InputField
            onChange={handleInputField}
            name="zip_code"
            placeholder="Zip Code"
            errorColor={errorMsg?.zip_code ? true : false}
          />
        </div>

        <div className="w-3/4 absolute bottom-6 sm:relative">
          {resError && (
            <>
              <p className="w-full mb-2 px-2 bg-red-600 rounded text-white">
                Status: {resError.status} - {resError.statusText}
              </p>
              {resError.data &&
                Object.keys(resError.data).map((key) => (
                  <p className="w-full mb-2 px-2 bg-red-600 rounded text-white">
                    {resError.data &&
                      resError.data[key as keyof typeof resError.data]}
                  </p>
                ))}
            </>
          )}
          <CustomBtn title="Register" onClick={() => handleRegister(data)} />
          <div className="mt-4">
            <p>
              already have an account?{' '}
              <span className="cursor-pointer" onClick={navigateToRegister}>
                click here
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
