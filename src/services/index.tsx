import axios from 'axios'
import {
  RegisterType,
  LoginType,
  UserType,
  PromptType,
  UpdatePromptType
} from '../typings/weather'

const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY
// const BASEURL = `http://localhost:8000/warm-weather`
// const BASEURL = `https://warmweather-backend.onrender.com/warm-weather`
const BASEURL = `https://warmweatherbackend-production.up.railway.app/warm-weather`

type ResType = {
  token?: string
  data?: {}
  status?: number
  statusText?: string
}

export const getWeather = async (location: {
  latitude: number
  longitude: number
}) => {
  const res = await axios.get(
    `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${location.latitude},${location.longitude}&day=3`
  )
  return res.data
}

export const getZipCodeWeather = async (zipcode: number) => {
  const res = await axios.get(
    `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${zipcode}&day=3`
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
  const res = await axios.post(`${BASEURL}/user/getmyoutfit`, weather)

  return res
}

export const createUserAccount = async (
  data: RegisterType,
  promptData: PromptType
) => {
  const inputData = { userData: data, promptData }
  try {
    const res: ResType = await axios.post(`${BASEURL}/user/register`, inputData)

    return res
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response as ResType
    }
  }
}

export const loginAccount = async (data: LoginType) => {
  try {
    const res = await axios.post(`${BASEURL}/user/login`, data)

    return res.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error
    }
  }
}

export const updateAccount = async (
  data: UserType,
  pk: number,
  headers: object
) => {
  try {
    const res = await axios.put(`${BASEURL}/user/update/${pk}`, data, headers)
    return res
  } catch (error) {}
}

export const deleteAccount = async (pk: number, headers: object) => {
  try {
    const res = await axios.delete(`${BASEURL}/user/delete/${pk}`, headers)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const updatePrompts = async (
  data: UpdatePromptType,
  headers: object
) => {
  try {
    const res = await axios.put(`${BASEURL}/prompt/prompt`, data, headers)
    return res
  } catch (error) {
    console.log(error)
  }
}
