import userIcon from '../../assets/user_icon.png'
import { useNavigate } from 'react-router-dom'
import { RegisterType } from '../../typings/weather'

import InputField from '../../components/InputField'
import CustomBtn from '../../components/CustomBtn'
import { useState } from 'react'

type ErrorType = {
  email?: string
  username?: string
  password?: string
  confirm_password?: string
  first_name?: string
  last_name?: string
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

type PropsType = {
  setPage: React.Dispatch<React.SetStateAction<string>>
  data: RegisterType
  setData: React.Dispatch<React.SetStateAction<RegisterType>>
  errorMsg: ErrorType
  setErrorMsg: React.Dispatch<React.SetStateAction<ErrorType>>
  resError: ResType | undefined
  setResError: React.Dispatch<React.SetStateAction<ResType | undefined>>
  isPsValid: boolean
  setIsPsValid: React.Dispatch<React.SetStateAction<boolean>>
}

const OnboardingOne = ({
  setPage,
  setData,
  data,
  errorMsg,
  setErrorMsg,
  resError,
  setResError,
  isPsValid,
  setIsPsValid
}: PropsType) => {
  const navigate = useNavigate()
  const [isNextDisable, setIsNextDisable] = useState<boolean>(true)

  const handleInputField = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setData({ ...data, [event.target.name]: event.target.value })
    checkInput()
  }

  const checkPassword = () => {
    if (data.password !== data.confirm_password) {
      setIsPsValid(true)
    } else {
      setIsPsValid(false)
    }
  }

  const checkInput = () => {
    if (data.password !== data.confirm_password) return
    if (
      data.email &&
      data.first_name &&
      data.last_name &&
      data.username &&
      data.zip_code
    ) {
      setIsNextDisable(false)
    } else setIsNextDisable(true)
  }

  const handleNext = () => {
    checkInput()
    setPage('two')
  }

  const navigateToLogin = (): void => navigate('/login')

  return (
    <div
      className="flex h-full items-center relative
    md:h-full md:max-w-[1280px] md:justify-center md:self-center"
    >
      <div className="flex flex-col w-full h-full flex-1 justify-between items-center relative py-4">
        <div className="flex flex-col w-full justify-evenly items-center">
          <img src={userIcon} alt="user icon" className="w-1/4 mb-2" />
        </div>

        <div className="w-11/12 md:w-1/2">
          <InputField
            onChange={handleInputField}
            name="email"
            placeholder="Email"
            inputType="email"
            value={data.email}
            errorColor={errorMsg?.email ? true : false}
          />
          <InputField
            onChange={handleInputField}
            name="username"
            placeholder="Username"
            value={data.username}
            errorColor={errorMsg?.username ? true : false}
          />
          <div className="flex justify-between">
            <div className="flex w-[49%]">
              <InputField
                onChange={handleInputField}
                name="password"
                placeholder="Password"
                value={data.password}
                inputType="password"
                errorColor={isPsValid}
              />
            </div>
            <div className="flex w-[49%]">
              <InputField
                onChange={handleInputField}
                name="confirm_password"
                placeholder="Confirm Password"
                value={data.confirm_password}
                inputType="password"
                errorColor={isPsValid}
                onBlur={checkPassword}
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex w-[49%]">
              <InputField
                onChange={handleInputField}
                name="first_name"
                placeholder="First Name"
                value={data.first_name}
                errorColor={errorMsg?.first_name ? true : false}
              />
            </div>
            <div className="flex w-[49%]">
              <InputField
                onChange={handleInputField}
                name="last_name"
                placeholder="Last Name"
                value={data.last_name}
                errorColor={errorMsg?.last_name ? true : false}
              />
            </div>
          </div>

          <InputField
            onChange={handleInputField}
            name="zip_code"
            placeholder="Zip Code"
            value={data.zip_code}
            inputType="number"
            errorColor={errorMsg?.zip_code ? true : false}
          />
        </div>

        <div className="w-3/4 bottom-6 sm:relative flex flex-col items-center">
          <div className="w-full md:w-1/2">
            <CustomBtn
              title="Next"
              onClick={handleNext}
              bgColor="bg-black"
              disable={isNextDisable}
            />
          </div>
          <div className="mt-4">
            <p>
              already have an account?{' '}
              <span className="cursor-pointer" onClick={navigateToLogin}>
                click here
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OnboardingOne
