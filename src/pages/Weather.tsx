import React from 'react'
import WeatherIcon from '../components/WeatherIcon'
import { WeatherResponse } from '../typings/weather'
import { humidity, feeslike, temp_high, temp_low, wind } from '../assets/index'
import Loading from '../components/Loading'

type props = {
  data: WeatherResponse | undefined
}

const Weather = ({ data }: props) => {
  return (
    <>
      {data && (
        <div className="w-max flex flex-col md:w-full md:flex-row md:justify-center md:mb-4">
          <WeatherIcon
            imgUrl={data.current.condition.icon}
            text={data.current.condition.text}
          />

          <WeatherIcon
            imgUrl={temp_low}
            text={`${data.forecast.forecastday[0]?.day.mintemp_f} °F`}
          />

          <WeatherIcon
            imgUrl={temp_high}
            text={`${data.forecast.forecastday[0]?.day.maxtemp_f} °F`}
          />

          <WeatherIcon
            imgUrl={feeslike}
            text={`${data.current.feelslike_f} °F`}
          />

          <WeatherIcon imgUrl={humidity} text={`${data.current.humidity} %`} />

          <WeatherIcon imgUrl={wind} text={`${data.current.wind_mph} MPH`} />
        </div>
      )}
    </>
  )
}

export default Weather
