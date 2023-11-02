import React, { useState } from 'react'
import { visibility } from '../assets'

type props = {
  value?: string
  placeholder?: string
  name: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  inputType?: string
  errorColor: boolean
  onBlur?: React.FocusEventHandler<HTMLInputElement>
}

const InputField = ({
  value,
  placeholder,
  onChange,
  name,
  inputType,
  errorColor,
  onBlur
}: props) => {
  const [isVisible, setIsVisible] = useState<boolean>(true)

  const handleIsVisible = (): void => {
    setIsVisible((isVisible) => !isVisible)
  }

  return (
    <div className="flex w-full justify-center relative text-white">
      <input
        value={value}
        name={name}
        className="w-full h-12 outline-none border-b border-black py-1 px-4 bg-transparent
        mb-2 text-white placeholder:text-white text-base
         "
        style={errorColor ? { color: 'red' } : { color: '' }}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        type={isVisible ? inputType : ''}
      />
      {inputType === 'password' && (
        <img
          src={visibility}
          alt="visibility icon"
          className="w-7 h-7 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer z-10"
          onClick={handleIsVisible}
        />
      )}
    </div>
  )
}

export default InputField
