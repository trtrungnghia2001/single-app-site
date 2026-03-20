import { phimImage } from "@/services/ophim";
import type { MovieItem } from "@/types";
import { memo } from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }: { movie: MovieItem }) => {
  return (
    <Link to={`/movie/` + movie.slug} className="block text-center">
      <div className="relative">
        <img
          loading="lazy"
          alt="thumb"
          src={phimImage({ thumb_url: movie.thumb_url })}
          className="rounded-lg overflow-hidden aspect-thumbnail w-full hover:opacity-90 transition-all"
        />
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-10 bg-gray-500 text-white rounded-t px-1.5 py-0.5">
          {movie.lang}
        </span>
      </div>
      <h6 className="line-clamp-2 mt-2 h-10">{movie.name}</h6>
      <p className="text-13 text-muted-foreground line-clamp-1">
        {movie.origin_name}
      </p>
    </Link>
  );
};

export default memo(MovieCard);
