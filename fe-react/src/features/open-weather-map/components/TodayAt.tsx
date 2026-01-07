import { Swiper, SwiperSlide } from "swiper/react";
import type { WeatherHourType } from "../data/type";
import {
  getHour12,
  getIconWeather,
  temperatureChangeC,
} from "@/features/rest-countries/data/utils";
import { FaLocationArrow } from "react-icons/fa";

const TodayAt = ({ data }: { data: WeatherHourType[] }) => {
  return (
    <div className="rounded bg-card p-4 shadow space-y-2">
      <h4>Todat At</h4>
      <Swiper
        spaceBetween={8}
        slidesPerView={2}
        breakpoints={{
          300: {
            slidesPerView: 4,
          },
          440: {
            slidesPerView: 4,
          },
          640: {
            slidesPerView: 6,
          },
          768: {
            slidesPerView: 7,
          },
          1024: {
            slidesPerView: 8,
          },
          1200: {
            slidesPerView: 10,
          },
        }}
      >
        {data.slice(1, 16).map((item) => (
          <SwiperSlide key={item.dt_txt} className="space-y-2">
            <div className="bg-background flex flex-col justify-center items-center p-3 rounded space-y-1">
              <span className="text-xs text-muted-foreground line-clamp-1">
                {getHour12(new Date(item.dt_txt))}
              </span>
              <img
                loading="lazy"
                src={getIconWeather(item?.weather?.[0]?.icon)}
                alt="icon"
                className="img object-contain"
              />
              <span className="font-bold">
                {temperatureChangeC(item.main.temp)} <sup>o</sup>
              </span>
            </div>
            <div className="bg-background flex flex-col justify-center items-center p-3 rounded space-y-4">
              <span className="text-xs text-muted-foreground line-clamp-1">
                {getHour12(new Date(item.dt_txt))}
              </span>
              <FaLocationArrow
                size={20}
                className="text-blue-500"
                style={{
                  rotate: item.wind.deg + "deg",
                }}
              />
              <span className="font-bold">{item.wind.speed}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TodayAt;
