import {
  getTimeZone,
  temperatureChangeC,
} from "@/features/rest-countries/data/utils";
import { memo, useMemo } from "react";
import {
  FaEarthAsia,
  FaEarthOceania,
  FaTemperatureThreeQuarters,
} from "react-icons/fa6";
import { MdVisibility } from "react-icons/md";
import { PiSunHorizonFill, PiSunHorizonLight } from "react-icons/pi";
import { TiWaves } from "react-icons/ti";
import { WiHumidity } from "react-icons/wi";
import type { AirType, WeatherType } from "../data/type";

const Highlights = ({
  weather,
  air,
}: {
  weather: WeatherType;
  air: AirType;
}) => {
  const weatherDetail = useMemo(() => {
    const sun = [
      {
        title: "Sunrise",
        icon: <PiSunHorizonLight />,
        value:
          weather &&
          getTimeZone(
            weather?.sys?.sunrise as number,
            weather?.timezone as number
          ),
      },
      {
        title: "Sunset",
        icon: <PiSunHorizonFill />,
        value:
          weather &&
          getTimeZone(
            weather?.sys?.sunset as number,
            weather?.timezone as number
          ),
      },
    ];
    const level = [
      {
        title: "Sea level",
        icon: <FaEarthOceania />,
        value: weather?.main?.sea_level,
        util: "hPa",
      },
      {
        title: "Grnd level",
        icon: <FaEarthAsia />,
        value: weather?.main?.grnd_level,
        util: "hPa",
      },
    ];
    const list = [
      {
        title: "Humidity",
        icon: <WiHumidity />,
        value: weather?.main?.humidity,
        util: "%",
      },
      {
        title: "Pressure",
        icon: <TiWaves />,
        value: weather?.main?.pressure,
        util: "hPa",
      },
      {
        title: "Visibility",
        icon: <MdVisibility />,
        value: weather?.visibility && Math.round(weather?.visibility / 1000),
        util: "km",
      },
      {
        title: "Feels like",
        icon: <FaTemperatureThreeQuarters />,
        value:
          weather?.main?.feels_like &&
          temperatureChangeC(weather?.main?.feels_like as number),
        util: "<sup>o</sup>",
      },
    ];

    return {
      sun,
      level,
      list,
    };
  }, [weather]);

  const airData = useMemo(() => {
    const list = [
      {
        title: "Good",
        colorBg: "rgb(85,168,79)",
        colortext: "rgb(255,255,255)",
      },
      {
        title: "Fair",
        colorBg: "rgb(163,200,83)",
        colortext: "rgb(255,255,255)",
      },
      {
        title: "Moderate",
        colorBg: "rgb(255,248,51)",
        colortext: "rgb(255,255,255)",
      },
      {
        title: "Poor",
        colorBg: "rgb(242,156,51)",
        colortext: "rgb(255,255,255)",
      },
      {
        title: "Very Poor",
        colorBg: "rgb(233,63,51)",
        colortext: "rgb(255,255,255)",
      },
    ];

    if (air?.list?.[0]?.main?.aqi) {
      return list[air?.list?.[0]?.main?.aqi - 1];
    }
    return list[0];
  }, [air]);

  return (
    <div className="rounded bg-card p-4 shadow space-y-6">
      <h4>Today's Highlights</h4>
      {/* air */}
      <div className="rounded p-4 bg-background space-y-4">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-muted-foreground">
            Air Quality Index ({air.list[0].main.aqi})
          </span>
          <span
            className={`px-4 py-1 rounded-full`}
            style={{
              color: airData.colortext,
              backgroundColor: airData.colorBg,
            }}
          >
            {airData.title}
          </span>
        </div>
        <ul className="grid grid-cols-4 lg:grid-cols-8 text-center gap-4">
          {Object.entries(air.list[0].components)?.map(([key, value]) => (
            <li key={key}>
              <div className="text-xs text-gray-500 mb-1 capitalize">{key}</div>
              <div className="text-base">{value.toFixed(1)}</div>
            </li>
          ))}
        </ul>
      </div>
      {/* sun and level */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {/* sun */}
        <div className="bg-background rounded p-4">
          <div className="text-muted-foreground text-xs mb-4">
            Sunrise & Sunset
          </div>
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2">
            {weatherDetail.sun.map((item) => (
              <div key={item.title}>
                <div className="text-muted-foreground text-xs mb-2">
                  {item.title}
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-xl">{item.icon}</div>
                  <div className="font-medium text-base">
                    <span>{item.value}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* level */}
        <div className="bg-background rounded p-4">
          <div className="text-muted-foreground text-xs mb-4">
            Sea level & Grnd level
          </div>
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2">
            {weatherDetail.level.map((item) => (
              <div key={item.title}>
                <div className="text-muted-foreground text-xs mb-2">
                  {item.title}
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-xl">{item.icon}</div>
                  <div className="font-medium text-base">
                    <span>{item.value}</span>
                    <span
                      dangerouslySetInnerHTML={{ __html: item.util }}
                    ></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* list */}
      <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {weatherDetail.list.map((item) => (
          <li key={item.title} className="bg-background rounded p-4">
            <div className="text-muted-foreground text-xs mb-2">
              {item.title}
            </div>
            <div className="flex items-center justify-between">
              <div className="text-xl">{item.icon}</div>
              <div className="font-medium text-base">
                <span>{item.value}</span>
                <span dangerouslySetInnerHTML={{ __html: item.util }}></span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default memo(Highlights);
