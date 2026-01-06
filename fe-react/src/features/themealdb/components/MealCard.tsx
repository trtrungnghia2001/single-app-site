import { memo } from "react";

import { Link } from "react-router-dom";
import type { MealType } from "../data/type";

const MealCard = ({ data }: { data: MealType }) => {
  return (
    <Link
      to={`/themealdb/` + data.idMeal}
      className="shadow rounded overflow-hidden block hover:shadow-md transition group bg-card"
    >
      <div className="aspect-video overflow-hidden">
        <img
          src={data.strMealThumb}
          alt={data.strMealThumb}
          loading="lazy"
          className="group-hover:scale-105 transition img"
        />
      </div>
      <div className="p-3 space-y-3">
        <h3 className="line-clamp-1">{data.strMeal}</h3>
        <p className="line-clamp-4">{data.strInstructions}</p>
      </div>
    </Link>
  );
};

export default memo(MealCard);
