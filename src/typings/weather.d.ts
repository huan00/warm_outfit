export type WeatherResponse = {
  current: {
    last_updated_epoch: number
    last_updated: string
    temp_c: number
    temp_f: number
    is_day: number
    condition: {
      text: string
      icon: string
      code: number
    }
    wind_mph: number
    wind_kph: number
    wind_degree: number
    wind_dir: string
    pressure_mb: number
    pressure_in: number
    precip_mm: number
    precip_in: number
    humidity: number
    cloud: number
    feelslike_c: number
    feelslike_f: number
    vis_km: number
    vis_miles: number
    uv: number
    gust_mph: number
    gust_kph: number
  }
  forecast: {
    forecastday: [
      {
        date: string
        date_epoch: number
        day: {
          maxtemp_c: number
          maxtemp_f: number
          mintemp_c: number
          mintemp_f: number
          avgtemp_c: number
          avgtemp_f: number
          maxwind_mph: number
          maxwind_kph: number
          totalprecip_mm: number
          totalprecip_in: number
          totalsnow_cm: number
          avgvis_km: number
          avgvis_miles: number
          avghumidity: number
          daily_will_it_rain: number
          daily_chance_of_rain: number
          daily_will_it_snow: number
          daily_chance_of_snow: number
          condition: {
            text: string
            icon: string
            code: number
          }
          uv: number
        }
        astro: {
          sunrise: string
          sunset: string
          moonrise: string
          moonset: string
          moon_phase: string
          moon_illumination: string
          is_moon_up: number
          is_sun_up: number
        }
        hour: []
      }
    ]
  }
  location: {
    name: string
    region: string
    country: string
    lat: number
    lon: number
    tz_id: string
    localtime_epoch: number
    localtime: string
  }
}

export type OutfitResponse = {
  suggestion: string
  head: string[]
  tops: string[]
  jacket: string[]
  pants: string[]
  shoe: string[]
  accessory: string[]
}

export interface LoginType {
  username: string
  password: string
}

export interface RegisterType extends LoginType {
  email: string
  confirm_password: string
  first_name: string
  last_name
  zip_code: string
}

export interface ErrorType {
  data: {
    error: string
  }
  status: number
  StatusText: string
}

export interface PromptSelectType {
  value: string
  label: string
}

export interface InputDataType {
  temperature_high: string
  temperature_low: string
  wind: string
  humidity: string
  condition: string
  gender: string
  sensitivity: string
}

export interface PromptType {
  gender: string
  sensitivityToCold: string
}

export interface UpdatePromptType {
  gender: string
  sensitivity_to_cold: string
  User: number | undefined
}

export interface ResType {
  token?: string
  data?: {
    token?: string
  }
  status?: number
  statusText?: string
}

export interface UserType {
  id?: number
  username: string
  email: string
  first_name: string
  last_name: string
  zip_code: string
  prompts: {
    gender: string
    sensitivity_to_cold: string
  }
}
