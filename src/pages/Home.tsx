import { useEffect, useState } from 'react'
import { getWeather, getMyOutfit, getZipCodeWeather } from '../services'
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
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
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
    } else if (user?.zip_code) {
      getZipCodeWeatherData(parseInt(user?.zip_code))
    }
  }, [location, user?.zip_code])

  const getWeatherData = async (location: {
    latitude: number
    longitude: number
  }) => {
    const res = await getWeather(location)
    setWeatherData(res)
  }

  const getZipCodeWeatherData = async (zipcode: number) => {
    const res = await getZipCodeWeather(zipcode)
    setWeatherData(res)
  }

  const getoutfit = async () => {
    setOutfit(undefined)
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

  return (
    <div className="p-2 pt-12 font-sans w-screen h-screen justify-between sm:min-h-full sm:max-w-[769px] flex flex-col self-center relative items-center ">
      <div className="flex w-full h-[90%]  ">
        <div className=" w-full h-full flex flex-col sm:h-full sm:justify-start sm:items-center relative ">
          {weatherData ? (
            <div className="flex flex-col sm:h-fit sticky top-0">
              <p className="text-white text-xl sm:text-2xl">
                Today's weather condition:
              </p>
              <Weather data={weatherData} />
            </div>
          ) : (
            <Loading />
          )}
          {outfit ? (
            <div className="flex h-full justify-center items-start  overflow-y-scroll">
              <Avartar data={outfit} />
            </div>
          ) : (
            <div className="w-full h-fit flex flex-col justify-between sm:h-full">
              {!user ? (
                <div className="text-white">
                  <>
                    <p>Fill out the below info for an outfit.</p>
                    <p>
                      Login or create an account to skip this step:{' '}
                      <span
                        className="cursor-pointer underline"
                        onClick={() => navigate('/login')}
                      >
                        click here
                      </span>
                    </p>
                  </>
                  <label className="text-white">Gender</label>
                  <Select
                    className="text-black"
                    options={genderOptions}
                    value={genderSelectedOption}
                    onChange={(e) => {
                      if (e) {
                        setGenderSelectedOption(e)
                      }
                    }}
                  />
                  <label className="text-white">
                    On a sunny 72˚ day, how do you normally feel?
                  </label>
                  <Select
                    className="text-black"
                    options={sensitivityToCold}
                    value={sensitivityCold}
                    onChange={(e) => {
                      if (e) {
                        setSensitivityCold(e)
                      }
                    }}
                  />
                </div>
              ) : (
                <div className="mt-4">
                  <p className="text-lg text-white">
                    Hey{' '}
                    {user.first_name.charAt(0).toLocaleUpperCase() +
                      user.first_name.slice(1)}
                    , let's get your outfit for today.
                  </p>
                </div>
              )}
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
