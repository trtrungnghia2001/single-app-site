import axios from "axios";
import type {
  AirType,
  DirectType,
  LocationType,
  WeatherHourType,
  WeatherType,
} from "./type";
import { ENV } from "@/lib/env";

const axiosConfig = axios.create({
  baseURL: "https://api.openweathermap.org",
  params: {
    appid: ENV.OPEN_WEATHER_MAP,
  },
});

export const searchDirectApi = async (value: string) => {
  const url = `geo/1.0/direct?q=${value}&limit=5`;
  const response = await axiosConfig.get<DirectType[]>(url);
  return response.data;
};
export const currentWeatherApi = async (location: LocationType) => {
  const url = `data/2.5/weather?lat=${location.lat}&lon=${location.lon}`;
  const response = await axiosConfig.get<WeatherType>(url);
  return response.data;
};

export const forecastWeatherApi = async (location: LocationType) => {
  const url = `data/2.5/forecast?lat=${location.lat}&lon=${location.lon}`;
  const response = await axiosConfig.get<{ list: WeatherHourType[] }>(url);
  return response.data;
};
export const airWeatherApi = async (location: LocationType) => {
  const url = `data/2.5/air_pollution?lat=${location.lat}&lon=${location.lon}`;
  const response = await axiosConfig.get<AirType>(url);
  return response.data;
};
