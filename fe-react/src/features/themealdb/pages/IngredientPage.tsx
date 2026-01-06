import { useQuery } from "@tanstack/react-query";
import { mealIngredientApi } from "../data/api";
import Loader from "@/components/custom/Loader";
import Notfound from "@/pages/Notfound";
import ButtonBack from "@/components/custom/ButtonBack";
import IngredientCard from "../components/IngredientCard";
import { useMemo, useState } from "react";
import type { IngredientType } from "../data/type";
import { IoIosClose } from "react-icons/io";

const IngredientPage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["themealdb", "ingredient"],
    queryFn: async () => await mealIngredientApi(),
  });

  const [text, setText] = useState("");
  const [ingredient, setIngredient] = useState<IngredientType | null>(null);

  const ingredientData = useMemo(() => {
    if (!data?.meals) return [];

    return data.meals.filter((item) =>
      item.strIngredient.toLocaleLowerCase().includes(text.toLocaleLowerCase())
    );
  }, [data, text]);

  if (isLoading) return <Loader />;
  if (error) return error.message;
  if (!data) return <Notfound />;

  return (
    <div className="p-4 space-y-8">
      {/* top */}
      <div>
        <ButtonBack />
      </div>
      <div className="space-y-2">
        <h2>Ingredient</h2>
        <input
          type="text"
          placeholder="Search..."
          className="rounded-full py-2 px-4 w-full border border-border outline-none bg-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      {/* main */}
      <div>
        <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {ingredientData.map((meal) => (
            <li key={meal.idIngredient} onClick={() => setIngredient(meal)}>
              <IngredientCard data={meal} />
            </li>
          ))}
        </ul>
      </div>
      {/* box */}
      {ingredient && (
        <div className="z-50 fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-background p-4 rounded-lg shadow-2xl max-h-screen w-full md:max-w-2/5 md:max-h-3/5 overflow-hidden overflow-y-auto">
          <button
            className="absolute top-4 right-4 hover:text-blue-500"
            onClick={() => setIngredient(null)}
          >
            <IoIosClose size={20} />
          </button>
          <div className="w-40 overflow-hidden mx-auto">
            <img
              src={ingredient.strThumb}
              alt={ingredient.strThumb}
              loading="lazy"
              className="group-hover:scale-105 transition img object-contain"
            />
          </div>
          <h3>{ingredient.strIngredient}</h3>
          <div
            className="whitespace-break-spaces"
            dangerouslySetInnerHTML={{ __html: ingredient.strDescription }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default IngredientPage;
