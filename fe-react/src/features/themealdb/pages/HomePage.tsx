import { useQuery } from "@tanstack/react-query";
import { searchMealByNameApi } from "../data/api";
import MealCard from "../components/MealCard";
import Loader from "@/components/custom/Loader";
import { useSearchParams } from "react-router-dom";

const HomePage = () => {
  const [searchParams] = useSearchParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["themealdb", "search", searchParams.toString()],
    queryFn: async () => await searchMealByNameApi(searchParams.get("q") || ""),
  });

  if (isLoading) return <Loader />;
  if (error) return error.message;

  return (
    <div>
      {/* results */}
      <div className="p-4">
        {!isLoading && data?.meals && data.meals.length === 0 && (
          <div>No results</div>
        )}
        {!isLoading && data?.meals && data.meals.length > 0 && (
          <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {data?.meals.map((meal) => (
              <li key={meal.idMeal}>
                <MealCard data={meal} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HomePage;
