import axios from 'axios'

const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY

export const getWeather = async (location: {
  latitude: number
  longitude: number
}) => {
  const res = await axios.get(
    `http://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${location.latitude},${location.longitude}&day=3`
  )
  return res.data
}

export const getMyOutfit = async (weather: {
  temperature_high: string
  temperature_low: string
  wind: string
  humidity: string
  condition: string
}) => {
  const res = await axios.post(
    `http://localhost:8000/warm-weather/user/getmyoutfit`,
    weather
  )

  return res.data
}
