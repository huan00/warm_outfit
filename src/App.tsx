import { useEffect, useState } from 'react'
import { getWeather, getMyOutfit } from './services'
import Loading from './components/Loading'

import { OutfitResponse, WeatherResponse } from './typings/weather'
import Weather from './pages/Weather'
import Avartar from './pages/Avartar'
import Navbar from './components/Navbar'

function App() {
  const [location, setLocation] = useState<{
    latitude: number
    longitude: number
  }>()
  const [weatherData, setWeatherData] = useState<WeatherResponse>()
  const [outfit, setOutfit] = useState<OutfitResponse | undefined>({
    head: ['Hat'],
    tops: [
      'Cotton t-shirt',
      'Light cardigan',
      'Cotton t-shirt',
      'Light cardigan',
      'Cotton t-shirt',
      'Light cardigan'
    ],
    jacket: [],
    bottom: ['Light Denim Jeans'],
    shoe: ['Canvas shoes'],
    accessory: ['Sunglasses', 'Scarf'],
    suggestion:
      "Today's weather is right for you to lighten up and wear something airy and comfy. Suggested to wear a cotton t-shirt, light cardigan, light denim jeans, canvas shoes, add a hat, sunglasses and a scarf to complete the outfit. Enjoy this warm weather with your fashion!"
  })

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

  // useEffect(() => {
  //   if (weatherData) {
  //     const weather = {
  //       temperature_high: `${weatherData.forecast.forecastday[0].day.maxtemp_f} °F`,
  //       temperature_low: `${weatherData.forecast.forecastday[0].day.mintemp_f} °F`,
  //       wind: `${weatherData.current.wind_mph} MPH`,
  //       humidity: `${weatherData.current.humidity} %`,
  //       condition: `${weatherData.current.condition.text}`
  //     }
  //     // const weather = {
  //     //   temperature_high: '25 °F',
  //     //   temperature_low: '18 °F',
  //     //   wind: '10 mph',
  //     //   humidity: '78%',
  //     //   condition: 'sunny'
  //     // }
  //     const getoutfit = async () => {
  //       const outfit = await getMyOutfit(weather)
  //       setOutfit(outfit)
  //     }
  //     getoutfit()
  //   }
  // }, [weatherData])

  return (
    <div className="App flex flex-col md:justify-start w-screen h-screen bg-image-hero bg-cover bg-no-repeat">
      <Navbar />
      <div className="p-2 w-screen md:w-[1280px] flex flex-col self-center">
        <div className="flex flex-col  w-full">
          <p className="text-white text-xl md:text-2xl">
            Today's weather condition:
          </p>
          {weatherData ? (
            <div className="flex w-full flex-col">
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
