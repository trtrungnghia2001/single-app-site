import {
  getTMDBImage,
  phimBySlugImages,
  phimBySlugPeoples,
  phimCategoryBySlug,
} from "@/services/ophim";
import type { MovieItem, MoviePeopleItem, ServerEpisode } from "@/types";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { useMemo } from "react";
import { Link, type SetURLSearchParams } from "react-router-dom";
import _ from "lodash";
import { IMAGE_DEFAULT } from "@/constants";
import MovieCard from "@/components/custom/MovieCard";

export const Episode = ({
  serverEpisodes,
  searchParams,
  handleSearchParams,
  episode,
  server,
}: {
  serverEpisodes: ServerEpisode[];
  searchParams: URLSearchParams;
  handleSearchParams: SetURLSearchParams;
  episode: number;
  server: number;
}) => {
  return (
    <div className="space-y-8">
      {serverEpisodes.map((serverEpisode, serverIdx) => (
        <article key={serverEpisode.server_name}>
          <h6 className="mb-4">{serverEpisode.server_name}</h6>
          <ul className="flex flex-wrap gap-2">
            {serverEpisode.server_data.map((ep, epIdx) => (
              <li key={ep.name}>
                <button
                  className={clsx([
                    `py-2 px-4 rounded`,
                    serverIdx === server && epIdx === episode
                      ? `bg-yellow-600`
                      : `bg-input hover:text-yellow-500`,
                  ])}
                  onClick={() => {
                    const newSearch = new URLSearchParams(searchParams);
                    newSearch.set("server", serverIdx.toString());
                    newSearch.set("episode", epIdx.toString());
                    handleSearchParams(newSearch);
                  }}
                >
                  Tập {ep.name}
                </button>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
};

export const Gallery = ({
  slug,
  trailer_url,
}: {
  slug: string;
  trailer_url: string;
}) => {
  const { data } = useQuery({
    queryKey: ["movie", "detail", slug, "images"],
    queryFn: async () => await phimBySlugImages(slug),
    enabled: !!slug,
  });
  return (
    <div className="space-y-8">
      <article>
        <h6 className="mb-4">Trailer</h6>
        <iframe
          src={`https://www.youtube.com/embed/` + trailer_url?.split("=")?.[1]}
          title={`Trailer`}
          className="aspect-video w-full sm:w-1/2"
          loading="lazy"
          allowFullScreen
          frameBorder="0"
          allow="autoplay=0; encrypted-media"
        ></iframe>
      </article>
      <article>
        <h6 className="mb-4">Ảnh</h6>
        <ul className="grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
          {data?.data.images.map((img) => (
            <li key={img.file_path}>
              <img
                src={getTMDBImage({ path: img.file_path })}
                alt={img.file_path}
                className="object-cover w-full h-50"
              />
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
};

export const People = ({ slug }: { slug: string }) => {
  const { data } = useQuery({
    queryKey: ["movie", "detail", slug, "peoples"],
    queryFn: async () => await phimBySlugPeoples(slug),
    enabled: !!slug,
  });

  const peopleGroup = useMemo(() => {
    return _.groupBy(
      (data?.data?.peoples as MoviePeopleItem[]) || [],
      "known_for_department"
    );
  }, [data]);

  return (
    <div className="space-y-8">
      {Object.keys(peopleGroup).length > 0 &&
        Object.entries(peopleGroup).map(([key, value]) => (
          <article key={key} className="space-y-4">
            <h6>{key}</h6>
            <ul className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {value?.map((item) => (
                <li key={item.tmdb_people_id}>
                  <Link
                    // to={`/people/` + item.tmdb_people_id}
                    to={
                      `https://angular-themoviedb-site.onrender.com/search?type=person&page=1&query=` +
                      item.name
                    }
                    className="block relative"
                  >
                    <img
                      src={
                        item.profile_path
                          ? getTMDBImage({ path: item.profile_path })
                          : IMAGE_DEFAULT.AVATAR
                      }
                      alt="avatar"
                      loading="lazy"
                      className="aspect-thumbnail object-cover object-center rounded-lg w-full h-full"
                    />
                    <div className="absolute p-2 bottom-0 left-0 right-0 text-center bg-linear-180 from-transparent to-black">
                      <p>{item.name}</p>
                      <p className="text-xs text-yellow-500">
                        {item.character}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </article>
        ))}
    </div>
  );
};

export const Suggest = ({ category }: { category: string }) => {
  const { data } = useQuery({
    queryKey: ["movie", "categories", category],
    queryFn: async () => await phimCategoryBySlug(category),
    enabled: !!category,
  });
  return (
    <div>
      <ul className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {data?.data.items.map((movie, idx) => (
          <li key={idx}>
            <MovieCard movie={movie as MovieItem} />
          </li>
        ))}
      </ul>
    </div>
  );
};
