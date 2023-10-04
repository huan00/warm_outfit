import React from 'react'

type props = {
  onClick: () => void
  title: string
  bgColor?: string
}

const CustomBtn = ({ onClick, title, bgColor = '' }: props) => {
  return (
    <div
      className={`w-full h-7 ring-green-500 text-white  ${
        bgColor ? bgColor : 'bg-green-800'
      }  flex justify-center items-center rounded-lg cursor-pointer py-5`}
      onClick={onClick}
    >
      <p className="px-2">{title}</p>
    </div>
  )
}

export default CustomBtn
