import React from 'react'
import { PromptType, RegisterType, ResType } from '../../typings/weather'
import RadioInput from '../../components/RadioInput'
import CustomBtn from '../../components/CustomBtn'
import { useNavigate } from 'react-router-dom'

type PropsType = {
  setPage: React.Dispatch<React.SetStateAction<string>>
  data: RegisterType
  promptData: PromptType
  setPromptData: React.Dispatch<React.SetStateAction<PromptType>>
  register: (data: RegisterType, prom: PromptType) => Promise<void>
  resError: ResType | undefined
}

const SENSITIVITY = [
  'I feel cold',
  'I feel a bit cold',
  'I feel content',
  'I feel toasty',
  'I feel hot'
]

const OnboardingThree = ({
  data,
  promptData,
  setPromptData,
  register,
  setPage,
  resError
}: PropsType) => {
  const navigate = useNavigate()
  const onClickSelect = (title: string) => {
    setPromptData({ ...promptData, sensitivityToCold: title })
  }

  const handleRegister = () => {
    register(data, promptData)
    if (resError) {
    } else {
      navigate('/')
    }
  }

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="w-full flex justify-center mt-10">
        <p className="w-2/3 text-2xl text-center">
          On a sunny 72˚ day, how do you normally feel?
        </p>
      </div>
      <div className="w-full flex justify-center">
        <div className="w-full md:w-1/2 flex flex-col">
          {SENSITIVITY.map((item) => (
            <RadioInput
              key={item}
              title={item}
              radio={promptData.sensitivityToCold === item ? true : false}
              onClickSelect={onClickSelect}
            />
          ))}
        </div>
      </div>
      <div className="mb-4 w-full flex justify-center">
        <div>
          {resError && <p className="text-red">Register Error Try Again!!</p>}
        </div>
        <div className="flex gap-4 w-1/2 justify-between">
          <CustomBtn
            title="Back"
            onClick={() => setPage('two')}
            bgColor={'bg-black'}
          />
          <CustomBtn
            title="Finish"
            onClick={handleRegister}
            bgColor={promptData.gender ? 'bg-black' : 'bg-gray-500'}
          />
        </div>
      </div>
    </div>
  )
}

export default OnboardingThree
