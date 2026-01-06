import HeaderBanner from "../components/HeaderBanner";
import { useRoutes } from "react-router-dom";
import HomePage from "./HomePage";
import CategoryPage from "./CategoryPage";
import DetailPage from "./DetailPage";
import AreaPage from "./AreaPage";
import IngredientPage from "./IngredientPage";

const ThemealdbRoute = () => {
  const routes = useRoutes([
    {
      index: true,
      element: <HomePage />,
    },
    {
      path: ":id",
      element: <DetailPage />,
    },
    {
      path: "category/:type",
      element: <CategoryPage />,
    },
    {
      path: "area/:name",
      element: <AreaPage />,
    },
    {
      path: "ingredient",
      element: <IngredientPage />,
    },
  ]);

  return (
    <div>
      <HeaderBanner />
      {routes}
    </div>
  );
};

export default ThemealdbRoute;
