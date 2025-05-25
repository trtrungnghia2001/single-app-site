import React from "react";
import { Link } from "react-router-dom";

const ChampionList = ({ dataList = [] }) => {
  return (
    <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {dataList?.map((item) => {
        return (
          <Link 
          to={`/champion-id/${item?.id}`}
          key={item?.id} className="group relative overflow-hidden">
            <div className=" max-h-[330px] h-full">
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${item?.id}_0.jpg`}
                alt=""
                loading="lazy"
                className="transition group-hover:scale-110"
              />
            </div>
            <div className="absolute bottom-0 left-0 bg-[--darkColor] text-white px-4 py-3 w-full group-hover:bg-[--blueDarkColor] transition">
              <h4 className="transition group-hover:translate-x-4 uppercase">{item?.name}</h4>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ChampionList;
