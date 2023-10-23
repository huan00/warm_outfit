import { useState } from 'react'
import { PromptType, RegisterType, ResType } from '../typings/weather'
import { createUserAccount } from '../services'
import OnboardingOne from './onboarding/OnboardingOne'
import OnboardingTwo from './onboarding/OnboardingTwo'
import OnboardingThree from './onboarding/OnboardingThree'

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

const Register = () => {
  const [page, setPage] = useState<string>('one')
  const [data, setData] = useState<RegisterType>({
    email: '',
    username: '',
    password: '',
    confirm_password: '',
    first_name: '',
    last_name: '',
    zip_code: ''
  })
  const [promptData, setPromptData] = useState<PromptType>({
    gender: '',
    sensitivityToCold: ''
  })
  const [errorMsg, setErrorMsg] = useState<ErrorType>({})
  const [resError, setResError] = useState<ResType>()
  const [isPsValid, setIsPsValid] = useState<boolean>(false)

  const handleRegister = async (data: RegisterType, promptData: PromptType) => {
    const errorList: ErrorType = {}

    for (const key of Object.keys(data)) {
      if (data[key as keyof typeof data] === '') {
        errorList[key as keyof typeof errorList] = `missing ${key}`
      }
    }
    setErrorMsg(errorList)

    if (Object.keys(errorMsg).length > 0) return

    const res: ResType | undefined = await createUserAccount(data, promptData)

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
        zip_code: ''
      })
    } else if (res?.status !== 200) {
      setResError(res)
    }
  }

  const renderPage = () => {
    switch (page) {
      case 'one':
        return (
          <OnboardingOne
            setPage={setPage}
            setData={setData}
            data={data}
            errorMsg={errorMsg}
            setErrorMsg={setErrorMsg}
            resError={resError}
            setResError={setResError}
            isPsValid={isPsValid}
            setIsPsValid={setIsPsValid}
          />
        )
      case 'two':
        return (
          <OnboardingTwo
            data={data}
            promptData={promptData}
            setPromptData={setPromptData}
            setPage={setPage}
          />
        )
      case 'three':
        return (
          <OnboardingThree
            data={data}
            promptData={promptData}
            setPromptData={setPromptData}
            setPage={setPage}
            register={handleRegister}
            resError={resError}
          />
        )
    }
  }

  return (
    <div className="flex justify-center sm:w-1/2 h-screen pt-12  self-center">
      {renderPage()}
    </div>
  )
}

export default Register
