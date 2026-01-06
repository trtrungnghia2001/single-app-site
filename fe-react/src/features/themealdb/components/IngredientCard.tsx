import { memo } from "react";
import type { IngredientType } from "../data/type";

const IngredientCard = ({ data }: { data: IngredientType }) => {
  return (
    <div className="cursor-pointer shadow rounded overflow-hidden block hover:shadow-md transition group bg-card">
      <div className="aspect-video overflow-hidden">
        <img
          src={data.strThumb}
          alt={data.strThumb}
          loading="lazy"
          className="group-hover:scale-105 transition img object-contain"
        />
      </div>
      <div className="p-3 space-y-3">
        <h3 className="line-clamp-1 text-center">{data.strIngredient}</h3>
      </div>
    </div>
  );
};

export default memo(IngredientCard);
