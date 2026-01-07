import { useRoutes } from "react-router-dom";
import HomePage from "./HomePage";
import { OpenWeatherMapProvider } from "../data/context";
import HeaderTop from "../components/HeaderTop";

const OpenWeatherMapRoute = () => {
  const routes = useRoutes([
    {
      index: true,
      element: <HomePage />,
    },
  ]);

  return (
    <OpenWeatherMapProvider>
      <div className="p-4 space-y-6">
        <HeaderTop />
        <div>{routes}</div>
      </div>
    </OpenWeatherMapProvider>
  );
};

export default OpenWeatherMapRoute;
