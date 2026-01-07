import { memo } from "react";
import type { WeatherType } from "../data/type";
import {
  getHour12,
  getIconWeather,
  temperatureChangeC,
} from "@/features/rest-countries/data/utils";
import { MdCalendarMonth, MdLocationOn } from "react-icons/md";

const Current = ({ data }: { data: WeatherType }) => {
  return (
    <article className="rounded bg-card p-4 shadow space-y-2">
      {/* top */}
      <div className="flex items-center justify-between">
        <h4>
          {data.name}{" "}
          <span className="text-xs text-muted-foreground">
            ({data.sys.country})
          </span>
        </h4>
        <span className="font-bold">{getHour12(new Date())}</span>
      </div>
      {/* main */}
      <div>
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl">
              {temperatureChangeC(data.main.temp)} <sup>o</sup>
            </h2>
            <span className="capitalize text-xs text-muted-foreground">
              {data.weather?.[0].description}
            </span>
          </div>
          <div className="max-w-32">
            <img
              src={getIconWeather(data?.weather?.[0]?.icon as string, "@2x")}
              alt="icon"
              loading="lazy"
              className="img object-contain"
            />
          </div>
        </div>
        <div className="text-xs text-muted-foreground space-x-4">
          <span>Min: {temperatureChangeC(data.main.temp_min)}</span>
          <span>Max: {temperatureChangeC(data.main.temp_max)}</span>
          <span>Feels like: {temperatureChangeC(data.main.feels_like)}</span>
        </div>
      </div>
      {/* bottom */}
      <div className="border-t border-t-border text-muted-foreground text-xs pt-2 capitalize space-y-2">
        <div className="flex items-center gap-2">
          <MdCalendarMonth size={16} />
          <span>{new Date().toDateString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <MdLocationOn size={16} />
          <span>{data.base}</span>
        </div>
      </div>
    </article>
  );
};

export default memo(Current);
