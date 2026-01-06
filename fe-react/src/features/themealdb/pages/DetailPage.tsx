import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { mealDetailsByIdApi } from "../data/api";
import Loader from "@/components/custom/Loader";
import Notfound from "@/pages/Notfound";
import ButtonBack from "@/components/custom/ButtonBack";
import { useMemo } from "react";

const DetailPage = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["themealdb", id],
    queryFn: async () => await mealDetailsByIdApi(id as string),
    enabled: !!id,
  });

  const mealData = useMemo(() => {
    return data?.meals?.[0];
  }, [data]);

  const ingredientMeasureData = useMemo(() => {
    if (!mealData) return [];

    const ingredients = Object.entries(mealData)
      .filter(([key, value]) => key.includes("strIngredient") && value)
      ?.map(([_, value]) => value);

    const measures = Object.entries(mealData)
      .filter(([key, value]) => key.includes("strMeasure") && value)
      ?.map(([_, value]) => value);

    return ingredients.map((item, index) => ({
      image: `http://themealdb.com/images/ingredients/${item}.png`,
      text: measures[index] + " " + item,
    }));
  }, [mealData]);

  if (isLoading) return <Loader />;
  if (error) return error.message;
  if (!mealData) return <Notfound />;

  return (
    <div className="p-4 space-y-8">
      {/* top */}
      <div>
        <ButtonBack />
      </div>
      <div className="flex md:items-start gap-8 flex-col md:flex-row">
        <div className="md:w-xs rounded overflow-hidden aspect-video">
          <img
            src={mealData.strMealThumb}
            alt="thumb"
            loading="lazy"
            className="img"
          />
        </div>
        <div className="flex-1 space-y-2">
          <h2>{mealData.strMeal}</h2>
          <p>
            <span className="font-semibold">Category: </span>
            <Link
              to={`/themealdb/category/` + mealData.strCategory}
              className="underline text-blue-500"
            >
              {mealData.strCategory}
            </Link>
          </p>
          <p>
            <span className="font-semibold">Area: </span>
            <Link
              to={`/themealdb/area/` + mealData.strArea}
              className="underline text-blue-500"
            >
              {mealData.strArea}
            </Link>
          </p>
          <p>
            <span className="font-semibold">Tags: </span>
            <span>{mealData.strTags}</span>
          </p>
          <p>
            <span className="font-semibold">Source: </span>
            <Link to={mealData.strSource} className="underline text-blue-500">
              {mealData.strSource}
            </Link>
          </p>
        </div>
      </div>
      {/* main */}
      <div className="space-y-4">
        <div>
          <h3>1. Ingredients and measure</h3>
          <ul className="grid gap-x-4 gap-y-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {ingredientMeasureData.map((item) => (
              <li key={item.text} className="flex items-center gap-2">
                <img
                  src={item.image}
                  alt="img"
                  loading="lazy"
                  className="w-10"
                />
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>2. Instructions</h3>
          <div
            className="whitespace-break-spaces"
            dangerouslySetInnerHTML={{ __html: mealData.strInstructions }}
          ></div>
        </div>
        <div>
          <h3>3. Youtube</h3>
          <iframe
            src={mealData.strYoutube?.replace("watch?v=", "embed/")}
            frameBorder="0"
            className="w-full aspect-video"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="video"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
