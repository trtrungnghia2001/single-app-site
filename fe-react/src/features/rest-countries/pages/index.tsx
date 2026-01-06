import { useRoutes } from "react-router-dom";
import CountryDetailPage from "./CountryDetailPage";
import HomePage from "./HomePage";

const CountryRoute = () => {
  const routes = useRoutes([
    {
      index: true,
      element: <HomePage />,
    },
    {
      path: ":code",
      element: <CountryDetailPage />,
    },
  ]);
  return routes;
};

export default CountryRoute;
