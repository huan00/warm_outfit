import { useEffect, useState } from 'react'
import { getWeather, getMyOutfit } from '../services'
import Loading from '../components/Loading'
import Select from 'react-select'

import {
  InputDataType,
  OutfitResponse,
  PromptSelectType,
  WeatherResponse
} from '../typings/weather'
import Weather from '../pages/Weather'
import Avartar from '../pages/Avartar'
import CustomBtn from '../components/CustomBtn'
import { genderOptions, sensitivityToCold } from '../constants/PromptOptions'

const Home = () => {
  const [genderSelectedOption, setGenderSelectedOption] =
    useState<PromptSelectType>(genderOptions[0])
  const [sensitivityCold, setSensitivityCold] = useState<PromptSelectType>(
    sensitivityToCold[0]
  )
  const [location, setLocation] = useState<{
    latitude: number
    longitude: number
  }>()
  const [weatherData, setWeatherData] = useState<WeatherResponse>()
  const [outfit, setOutfit] = useState<OutfitResponse | undefined>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  //   {
  //   head: ['Hat'],
  //   tops: [
  //     'Cotton t-shirt',
  //     'Light cardigan',
  //     'Cotton t-shirt',
  //     'Light cardigan',
  //     'Cotton t-shirt',
  //     'Light cardigan'
  //   ],
  //   jacket: [],
  //   bottom: ['Light Denim Jeans'],
  //   shoe: ['Canvas shoes'],
  //   accessory: ['Sunglasses', 'Scarf'],
  //   suggestion:
  //     "Today's weather is right for you to lighten up and wear something airy and comfy. Suggested to wear a cotton t-shirt, light cardigan, light denim jeans, canvas shoes, add a hat, sunglasses and a scarf to complete the outfit. Enjoy this warm weather with your fashion!"
  // }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) =>
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }),
        (error) => console.log(error)
      )
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (location) {
      getWeatherData(location)
    }
  }, [location])

  const getWeatherData = async (location: {
    latitude: number
    longitude: number
  }) => {
    const res = await getWeather(location)
    setWeatherData(res)
  }

  const getoutfit = async () => {
    if (!weatherData) return
    const InputData = {
      temperature_high: `${weatherData.forecast.forecastday[0].day.maxtemp_f} °F`,
      temperature_low: `${weatherData.forecast.forecastday[0].day.mintemp_f} °F`,
      wind: `${weatherData.current.wind_mph} MPH`,
      humidity: `${weatherData.current.humidity} %`,
      condition: `${weatherData.current.condition.text}`,
      gender: genderSelectedOption.value,
      sensitivity: sensitivityCold.value
    }

    console.log(InputData)
    setIsLoading(true)
    const res = await getMyOutfit(InputData)
    setOutfit(res)
    setIsLoading(false)
  }

  return (
    <div className="p-2 w-screen md:max-w-[1280px] flex flex-col self-center">
      <div className="flex flex-col w-full">
        <p className="text-white text-xl md:text-2xl">
          Today's weather condition:
        </p>
        <div className="flex w-full flex-col">
          {weatherData ? <Weather data={weatherData} /> : <Loading />}
          {outfit ? (
            <Avartar data={outfit} />
          ) : (
            <div className="w-full">
              <p>Fill out the below info for an outfit</p>
              <label>Gender</label>
              <Select
                options={genderOptions}
                value={genderSelectedOption}
                onChange={(e) => {
                  if (e) {
                    setGenderSelectedOption(e)
                  }
                }}
              />
              <label>Sensitivity to cold</label>
              <Select
                options={sensitivityToCold}
                value={sensitivityCold}
                onChange={(e) => {
                  if (e) {
                    setSensitivityCold(e)
                  }
                }}
              />

              <div className="flex w-full justify-center items-center absolute bottom-4">
                <div className="w-1/3">
                  {isLoading ? (
                    <div className="flex justify-center">
                      <Loading />
                    </div>
                  ) : (
                    <CustomBtn title="Get outfit" onClick={getoutfit} />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
