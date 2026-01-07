import {
  getIconWeather,
  temperatureChangeC,
} from "@/features/rest-countries/data/utils";
import type { WeatherHourType } from "../data/type";
import { GoArrowDown, GoArrowUp } from "react-icons/go";
import { memo } from "react";

const Forecast = ({
  data,
  currentTemp,
}: {
  data: WeatherHourType[];
  currentTemp: number;
}) => {
  return (
    <div className="rounded bg-card p-4 shadow space-y-2">
      <h4>5 day forecast</h4>
      <ul>
        {data
          .filter((_, index) => index % 8 === 0)
          .map((item) => (
            <li
              key={item.dt_txt}
              className="flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-2">
                <img
                  loading="lazy"
                  src={getIconWeather(item?.weather?.[0]?.icon)}
                  alt="icon"
                  className="img object-contain"
                />
                <div>
                  {temperatureChangeC(item?.main?.temp)}
                  <sup>o</sup>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">
                {Intl.DateTimeFormat("en-GB", {
                  day: "2-digit",
                  month: "short",
                  weekday: "short",
                }).format(new Date(item.dt_txt))}
              </span>

              <span>
                {item.main.temp > currentTemp ? (
                  <GoArrowUp className="text-red-600" />
                ) : (
                  <GoArrowDown className="text-blue-600" />
                )}
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default memo(Forecast);
