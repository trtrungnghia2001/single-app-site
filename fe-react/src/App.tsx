import { useRoutes } from "react-router-dom";
import SidebarLeft from "./components/layout/SidebarLeft";
import Header from "./components/layout/Header";
import CountryRouter from "./features/rest-countries/pages";
import ThemealdbRoute from "./features/themealdb/pages";
import HomePage from "./pages/HomePage";

const App = () => {
  const routers = useRoutes([
    {
      index: true,
      element: <HomePage />,
    },
    {
      path: "/rest-countries/*",
      element: <CountryRouter />,
    },
    {
      path: "/themealdb/*",
      element: <ThemealdbRoute />,
    },
  ]);

  return (
    <div>
      <SidebarLeft className="hidden lg:block" />
      <div className="lg:ml-64">
        <Header />
        <div>{routers}</div>
      </div>
    </div>
  );
};

export default App;
