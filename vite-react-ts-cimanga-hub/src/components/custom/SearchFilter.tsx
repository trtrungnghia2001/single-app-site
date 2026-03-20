import { makeMangaFilter, makeMovieFilter } from "@/constants";
import { phimCategories, phimCountries, phimYears } from "@/services/ophim";
import { truyenCategories } from "@/services/otruyen";
import type {
  MangaDetailCategory,
  MediaType,
  MovieDetailCategory,
  MovieDetailCountry,
  MovieDetailYear,
} from "@/types";
import { useQuery } from "@tanstack/react-query";
import { memo, useMemo } from "react";

type SearchFilterType = {
  searchParams: URLSearchParams;
  handleReset: (media_type: MediaType) => void;
  handleSearchParams: (updates: Record<string, string | number>) => void;
};

const SearchFilter = ({
  searchParams,
  handleReset,
  handleSearchParams,
}: SearchFilterType) => {
  const media_type = useMemo(
    () => searchParams.get("media_type") as MediaType,
    [searchParams]
  );

  const { data: movieFilter, ...movieQuery } = useQuery({
    queryKey: ["movie", "filter"],
    queryFn: async () =>
      await Promise.all([
        await phimCategories(),
        await phimCountries(),
        await phimYears(),
      ]),
    enabled: media_type === "movie",
  });
  const { data: mangaFilter, ...mangaQuery } = useQuery({
    queryKey: ["manga", "filter"],
    queryFn: async () => await Promise.all([await truyenCategories()]),
    enabled: media_type === "manga",
  });

  const renderFilter = useMemo(() => {
    if (movieFilter && media_type === "movie") {
      const categoriesData = movieFilter[0].data
        .items as unknown as MovieDetailCategory[];

      const countriesData = movieFilter[1].data
        .items as unknown as MovieDetailCountry[];

      const yearsData = movieFilter[2].data
        .items as unknown as MovieDetailYear[];

      return makeMovieFilter({
        categoriesData,
        countriesData,
        yearsData,
        searchParams,
      });
    }

    if (mangaFilter && media_type === "manga") {
      const categoriesData = mangaFilter[0].data
        .items as unknown as MangaDetailCategory[];

      return makeMangaFilter({
        categoriesData,
        searchParams,
      });
    }

    return [];
  }, [movieFilter, mangaFilter, searchParams, media_type]);

  const loading = mangaQuery.isLoading || movieQuery.isLoading;
  const isError = mangaQuery.isError || movieQuery.isError;
  const error = mangaQuery.error || movieQuery.error;

  return (
    <div className="transition-all space-y-4">
      <p className="text-muted-foreground">
        <span>Tìm kiếm chỉ phù hợp với tất cả danh sách. </span>
        <button onClick={() => handleReset(media_type)} className="underline">
          Làm mới bộ lọc
        </button>
      </p>
      {loading && <p>Đang tải bộ lọc</p>}
      {!loading && isError && error && (
        <p className="text-red-600">{error.message}</p>
      )}
      {!loading && (
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {renderFilter.map((filter) => (
            <div key={filter.queryKey} className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="text-base">{filter.icon}</span>
                <span>{filter.label}</span>
              </div>
              <select
                value={filter.value}
                onChange={(e) => {
                  handleSearchParams({
                    [filter.queryKey]: e.target.value,
                    page: 1,
                  });
                }}
                className="bg-select px-4 py-2 rounded w-full cursor-pointer custom-scrollbar"
              >
                {filter.items.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(SearchFilter);
