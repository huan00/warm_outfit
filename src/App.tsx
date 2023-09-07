import { useEffect, useState } from 'react'
import { getWeather, getMyOutfit } from './services'
import Loading from './components/Loading'

import { OutfitResponse, WeatherResponse } from './typings/weather'
import Weather from './pages/Weather'
import Avartar from './pages/Avartar'

function App() {
  const [location, setLocation] = useState<{
    latitude: number
    longitude: number
  }>()
  const [weatherData, setWeatherData] = useState<WeatherResponse>()
  const [outfit, setOutfit] = useState<OutfitResponse | undefined>()

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

  const getWeatherData = async (location: {
    latitude: number
    longitude: number
  }) => {
    const res = await getWeather(location)
    setWeatherData(res)
  }

  useEffect(() => {
    if (location) {
      getWeatherData(location)
    }
  }, [location])

  useEffect(() => {
    if (weatherData) {
      const weather = {
        temperature_high: `${weatherData.forecast.forecastday[0].day.maxtemp_f} °F`,
        temperature_low: `${weatherData.forecast.forecastday[0].day.mintemp_f} °F`,
        wind: `${weatherData.current.wind_mph} MPH`,
        humidity: `${weatherData.current.humidity} %`,
        condition: `${weatherData.current.condition.text}`
      }
      const getoutfit = async () => {
        const outfit = await getMyOutfit(weather)
        setOutfit(outfit)
      }
      getoutfit()
    }
  }, [weatherData])

  console.log(outfit)
  console.log(weatherData)
  return (
    <div className="App flex justify-center w-screen h-screen bg-image-hero bg-cover bg-no-repeat">
      <div className="p-2 md:w-[1280px] flex md:flex-col">
        <div className="w-full">
          <p className="text-white text-xl md:text-2xl">
            Today's weather condition:
          </p>
          {weatherData ? (
            <div className="flex w-full md:flex-col">
              <Weather data={weatherData} />
              <Avartar data={outfit} />
            </div>
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </div>
  )
}

export default App
