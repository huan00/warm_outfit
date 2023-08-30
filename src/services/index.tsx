import axios from 'axios'

const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY

export const getWeather = async (location: {
  latitude: number
  longitude: number
}) => {
  const res = await axios.get(
    // `http://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${location.latitude},${location.longitude}`
    `http://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${location.latitude},${location.longitude}`
  )
  return res.data
}
