import { useQuery } from "@tanstack/react-query";
import Current from "../components/Current";
import Forecast from "../components/Forecast";
import Highlights from "../components/Highlights";
import TodayAt from "../components/TodayAt";
import { useOpenWeatherMapContext } from "../data/context";
import {
  airWeatherApi,
  currentWeatherApi,
  forecastWeatherApi,
} from "../data/api";
import Loader from "@/components/custom/Loader";
import Notfound from "@/pages/Notfound";

const HomePage = () => {
  const { location } = useOpenWeatherMapContext();

  const { data, isLoading, error } = useQuery({
    queryKey: ["open-weather-map", location],
    queryFn: async () =>
      await Promise.all([
        await currentWeatherApi(location),
        await forecastWeatherApi(location),
        await airWeatherApi(location),
      ]),
  });

  if (isLoading) return <Loader />;
  if (error) return error.message;
  if (!data) return <Notfound />;

  return (
    <div className="space-y-8">
      <div className="flex gap-6 text-sm flex-col md:flex-row">
        <section className="space-y-6 w-full md:max-w-2xs">
          <Current data={data[0]} />
          <Forecast data={data[1].list} currentTemp={data[0].main.temp} />
        </section>
        <section className="space-y-6 flex-1 overflow-hidden">
          <Highlights weather={data[0]} air={data[2]} />
          <TodayAt data={data[1].list} />
        </section>
      </div>
    </div>
  );
};

export default HomePage;
