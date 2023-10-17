import React from 'react'
import { PromptType, RegisterType } from '../../typings/weather'
import InputField from '../../components/InputField'
import RadioInput from '../../components/RadioInput'
import CustomBtn from '../../components/CustomBtn'

type PropsType = {
  setPage: React.Dispatch<React.SetStateAction<string>>
  data: RegisterType
  promptData: PromptType
  setPromptData: React.Dispatch<React.SetStateAction<PromptType>>
}

const OnboardingTwo = ({
  data,
  promptData,
  setPromptData,
  setPage
}: PropsType) => {
  const onClickSelect = (gender: string) => {
    setPromptData({ ...promptData, gender: gender })
  }

  const handleNext = () => {
    if (promptData.gender) {
      setPage('three')
    }
  }

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="w-full flex justify-center mt-10">
        <p className="w-2/3 text-2xl text-center">
          Hi {data.first_name}, which gender do you associate with?
        </p>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-full md:w-1/2 flex flex-col">
          <RadioInput
            title={'Male'}
            radio={promptData.gender === 'Male' ? true : false}
            onClickSelect={onClickSelect}
          />
          <RadioInput
            title={'Female'}
            radio={promptData.gender === 'Female' ? true : false}
            onClickSelect={onClickSelect}
          />
          <RadioInput
            title={'Non-Binary'}
            radio={promptData.gender === 'Non-Binary' ? true : false}
            onClickSelect={onClickSelect}
          />
        </div>
      </div>
      <div className="mb-4 w-full flex justify-center">
        <div className="flex gap-4 w-1/2 justify-between">
          <CustomBtn
            title="Back"
            onClick={() => setPage('one')}
            bgColor={'bg-black'}
          />
          <CustomBtn
            title="Next"
            onClick={handleNext}
            bgColor={
              promptData.gender ? 'bg-black' : 'bg-gray-500 cursor-not-allowed'
            }
          />
        </div>
      </div>
    </div>
  )
}

export default OnboardingTwo
