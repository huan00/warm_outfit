import React from 'react'

type props = {
  imgUrl: string
  text: string
}

const WeatherIcon = ({ imgUrl, text }: props) => {
  return (
    <div className="w-24 flex flex-col p-1 m-1 md:w-28 md:p-2 md:m-2 rounded-md items-center justify-center bg-sky-500/[.2]">
      <img src={imgUrl} alt="condition" className="w-8 h-8 md:w-16 md:h-16" />
      <p className="text-white text-sm md:text-base">{text}</p>
    </div>
  )
}

export default WeatherIcon
