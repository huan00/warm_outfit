import React, { useState } from 'react'
import { visibility } from '../assets'

type props = {
  value?: string
  placeholder?: string
  name: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  inputType?: string
}

const InputField = ({
  value,
  placeholder,
  onChange,
  name,
  inputType
}: props) => {
  const [isVisible, setIsVisible] = useState<boolean>(true)

  const handleIsVisible = (): void => {
    setIsVisible((isVisible) => !isVisible)
  }

  return (
    <div className="flex w-full justify-center relative">
      <input
        value={value}
        name={name}
        className="w-full h-12 outline-none rounded-lg py-1 px-4 text-black mb-2  
        "
        placeholder={placeholder}
        onChange={onChange}
        type={isVisible ? inputType : ''}
      />
      {inputType === 'password' && (
        <img
          src={visibility}
          alt="visibility icon"
          className="w-1/12 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer z-10"
          onClick={handleIsVisible}
        />
      )}
    </div>
  )
}

export default InputField
