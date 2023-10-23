import { useEffect, useState } from 'react'
import { getWeather, getMyOutfit } from '../services'
import Loading from '../components/Loading'
import Select from 'react-select'

import {
  OutfitResponse,
  PromptSelectType,
  WeatherResponse,
  UserType
} from '../typings/weather'
import Weather from '../pages/Weather'
import Avartar from '../pages/Avartar'
import CustomBtn from '../components/CustomBtn'
import { genderOptions, sensitivityToCold } from '../constants/PromptOptions'

const Home = () => {
  const userExist = sessionStorage.getItem('warm_weather_user')
  const user: UserType = userExist ? JSON.parse(userExist) : undefined

  const [genderSelectedOption, setGenderSelectedOption] =
    useState<PromptSelectType>(
      user
        ? { value: user.prompt.gender, label: user.prompt.gender }
        : genderOptions[0]
    )
  const [sensitivityCold, setSensitivityCold] = useState<PromptSelectType>(
    user
      ? {
          value: user.prompt.sensitivity_to_cold,
          label: user.prompt.sensitivity_to_cold
        }
      : sensitivityToCold[0]
  )
  const [location, setLocation] = useState<{
    latitude: number
    longitude: number
  }>()
  const [weatherData, setWeatherData] = useState<WeatherResponse>()
  const [outfit, setOutfit] = useState<OutfitResponse | undefined>()
  // const [outfit, setOutfit] = useState<OutfitResponse | undefined>({
  //   head: [],
  //   tops: ['Long-sleeved thermal shirt', 'Lightweight sweater'],
  //   jacket: ['winter coat'],
  //   pants: ['Slim-fit jeans'],
  //   shoe: ['Casual leather boots'],
  //   accessory: ['Sunglasses'],
  //   suggestion:
  //     'Layer up with a long-sleeved thermal shirt and a lightweight sweater paired with slim-fit jeans and casual leather boots.',
  //   extras: ['Sunblock']
  // })
  const [isLoading, setIsLoading] = useState<boolean>(false)

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

    sessionStorage.setItem(
      'warm_weather_gender',
      JSON.stringify(genderSelectedOption)
    )
    sessionStorage.setItem(
      'warm_weather_sensitivity',
      JSON.stringify(sensitivityCold)
    )

    setIsLoading(true)
    const res = await getMyOutfit(InputData)

    if (res.status === 200) {
      setOutfit(res.data)
      setIsLoading(false)
    } else {
      setIsLoading(false)
    }
  }

  // const fakedata: OutfitResponse = {
  //   head: [],
  //   tops: ['Long-sleeved thermal shirt', 'Lightweight sweater'],
  //   jacket: ['winter coat'],
  //   pants: ['Slim-fit jeans'],
  //   shoe: ['Casual leather boots'],
  //   accessory: ['Sunglasses'],
  //   suggestion:
  //     'Layer up with a long-sleeved thermal shirt and a lightweight sweater paired with slim-fit jeans and casual leather boots.',
  //   extras: ['Sunblock']
  // }

  return (
    <div className="p-2 pt-12 w-screen h-screen justify-between sm:min-h-full sm:max-w-[769px] flex flex-col self-center relative items-center ">
      <div className="flex w-full h-[90%]  ">
        <div className=" w-full h-full flex flex-col sm:h-full sm:justify-start sm:items-center relative ">
          {weatherData ? (
            <div className="flex flex-col sm:h-fit sticky top-0">
              <p className="text-white text-xl sm:text-2xl">
                Today's weather condition:
              </p>
              <Weather data={weatherData} />
              {/* </div> */}
            </div>
          ) : (
            <Loading />
          )}
          {outfit ? (
            <div className="flex h-full justify-center items-start  overflow-y-scroll">
              <Avartar data={outfit} />

              {/* <Avartar data={fakedata} /> */}
            </div>
          ) : (
            <div className="w-full h-fit flex flex-col justify-between sm:h-full">
              <div>
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
                <label>On a sunny 72˚ day, how do you normally feel?</label>
                <Select
                  options={sensitivityToCold}
                  value={sensitivityCold}
                  onChange={(e) => {
                    if (e) {
                      setSensitivityCold(e)
                    }
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex w-full justify-center z-10 relative bottom-2">
        <div className="w-1/2">
          {isLoading ? (
            <div className="flex justify-center">
              <Loading />
            </div>
          ) : (
            <CustomBtn
              title={outfit ? 'Try Again' : 'Get outfit'}
              onClick={getoutfit}
              disable={location ? false : true}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
