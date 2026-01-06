import { useQuery } from "@tanstack/react-query";
import { mealByAreaApi } from "../data/api";
import { useParams } from "react-router-dom";
import MealCard from "../components/MealCard";
import Loader from "@/components/custom/Loader";
import Notfound from "@/pages/Notfound";
import { useMemo } from "react";
import ButtonBack from "@/components/custom/ButtonBack";

const AreaPage = () => {
  const { name } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["themealdb", name],
    queryFn: async () => await mealByAreaApi(name as string),
    enabled: !!name,
  });

  const mealsData = useMemo(() => {
    if (!data?.meals) return [];
    return data?.meals;
  }, [data]);

  if (isLoading) return <Loader />;
  if (error) return error.message;
  if (!data) return <Notfound />;

  return (
    <div className="p-4 space-y-8">
      {/* top */}
      <div>
        <ButtonBack />
      </div>
      <div>
        <h2>{name}</h2>
      </div>
      {/* main */}
      <div>
        <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {mealsData.map((meal) => (
            <li key={meal.idMeal}>
              <MealCard data={meal} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AreaPage;
