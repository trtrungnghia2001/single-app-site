import { useQuery } from "@tanstack/react-query";
import { mealByCategoryApi, mealCategoriesApi } from "../data/api";
import { useParams } from "react-router-dom";
import MealCard from "../components/MealCard";
import Loader from "@/components/custom/Loader";
import Notfound from "@/pages/Notfound";
import { useMemo } from "react";
import ButtonBack from "@/components/custom/ButtonBack";

const CategoryPage = () => {
  const { type } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["themealdb", type],
    queryFn: async () =>
      await Promise.all([
        await mealCategoriesApi(),
        await mealByCategoryApi(type as string),
      ]),
    enabled: !!type,
  });

  const categoryData = useMemo(() => {
    return data?.[0].categories?.find((cate) => cate.strCategory === type);
  }, [data, type]);

  const mealsData = useMemo(() => {
    if (!data?.[1]) return [];
    return data?.[1].meals;
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
      <div className="flex md:items-start gap-8 flex-col md:flex-row">
        <div className="md:w-xs rounded overflow-hidden aspect-video">
          <img
            src={categoryData?.strCategoryThumb}
            alt="thumb"
            loading="lazy"
            className="img"
          />
        </div>
        <div className="flex-1 space-y-2">
          <h2>{categoryData?.strCategory}</h2>
          <p
            dangerouslySetInnerHTML={{
              __html: categoryData?.strCategoryDescription as string,
            }}
          ></p>
        </div>
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

export default CategoryPage;
