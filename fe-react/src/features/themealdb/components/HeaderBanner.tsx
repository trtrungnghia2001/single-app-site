import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { mealCategoriesApi } from "../data/api";
import { Link, NavLink, useNavigate } from "react-router-dom";
import themealdbBg from "@/assets/images/themealdbBg.png";
import clsx from "clsx";

const HeaderBanner = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const categoryQuery = useQuery({
    queryKey: ["themealdb", "category", ""],
    queryFn: async () => await mealCategoriesApi(),
  });

  return (
    <div
      className="py-16 px-4 "
      style={{
        background: `linear-gradient(rgba(50, 50, 100, 0.3), rgba(50, 50, 100, 0.5)), url("${themealdbBg}") center center / cover no-repeat`,
      }}
    >
      <div className="max-w-2xl w-full mx-auto text-center text-white">
        <h2>Find Meals For Yuoe Ingredient</h2>
        <p>Real food dosen't have ingredients, real food is ingredients. </p>
        <Link to={`/themealdb/ingredient`} className="underline">
          View ingredient
        </Link>
        <input
          type="text"
          className="outline-none border border-white rounded-full w-full px-4 py-2 my-6"
          placeholder="Search..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              navigate(`/themealdb?q=` + text.trim());
            }
          }}
        />
        <ul className="flex flex-wrap items-center justify-center gap-2">
          {categoryQuery.data?.categories.map((category) => (
            <li key={category.idCategory}>
              <NavLink
                to={`/themealdb/category/` + category.strCategory}
                className={clsx([
                  `inline-block px-3 py-1 rounded-full bg-white hover:bg-blue-100 text-blue-600 font-medium transition-all text-sm`,
                ])}
              >
                {category.strCategory}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HeaderBanner;
