import MangaCard from "@/components/custom/MangaCard";
import MovieCard from "@/components/custom/MovieCard";
import Pagination from "@/components/custom/Pagination";
import SearchFilter from "@/components/custom/SearchFilter";
import InputSearch from "@/components/form/InputSearch";
import Wrapper from "@/components/layout/Wrapper";
import { phimDanhsach, phimSearch } from "@/services/ophim";
import { truyenDanhsach, truyenSearch } from "@/services/otruyen";
import type {
  MangaItem,
  MangaListType,
  MangaResponse,
  MediaType,
  MovieItem,
  MovieListType,
  MovieResponse,
  PaginationType,
} from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDebounce } from "use-debounce";

const bgSlideUrls = [
  {
    img: `https://s1.picswalls.com/wallpapers/2014/09/18/war-desktop-wallpaper_112201361_216.jpg`,
    title: `Movie`,
  },
  {
    img: `https://wallpapers.com/images/hd/pixel-landscape-2000-x-1334-yg387p1lulc6yojr.jpg`,
    title: `Manga`,
  },

  {
    img: `https://wallpapercave.com/wp/wp5475487.jpg`,
    title: `Anime`,
  },
  {
    img: `https://images3.alphacoders.com/101/thumb-1920-1012111.jpg`,
    title: `Data Book`,
  },
];

const mediaTypes: { type: MediaType; label: string }[] = [
  { label: "Movie", type: "movie" },
  { label: "Manga", type: "manga" },
  // { label: "Anime", type: "anime" },
  // { label: "Data book", type: "data-book" },
];

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    media_type: "movie",
  });
  const media_type = useMemo(
    () => (searchParams.get("media_type") as MediaType) || "movie",
    [searchParams],
  );
  const keyword = useMemo(
    () => searchParams.get("keyword") || "",
    [searchParams],
  );
  const list = useMemo(
    () => searchParams.get("danh-sach") || "",
    [searchParams],
  );

  // search
  const [text, setText] = useState(keyword);
  const [value] = useDebounce(text, 500);

  const handleSearchParams = (updates: Record<string, string | number>) => {
    const newParams = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([name, value]) => {
      if (value) {
        newParams.set(name, value.toString());
      } else {
        newParams.delete(name);
      }
    });

    setSearchParams(newParams);
  };

  const handleReset = useCallback(
    (media_type: MediaType) => {
      const newParams = new URLSearchParams();
      newParams.set("media_type", media_type);
      setSearchParams(newParams);
      setText("");
      console.log("Đã reset về:", newParams.toString());
    },
    [setSearchParams],
  );

  const handleChangeTypeSelect = useCallback(
    (media_type: MediaType) => {
      const newParams = new URLSearchParams();
      newParams.set("media_type", media_type);
      setSearchParams(newParams);
      setText("");
    },
    [setSearchParams],
  );

  const handlePageChange = (page: number) => {
    handleSearchParams({ page: page });
    const element = document.getElementById("search-results");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (value !== searchParams.get("keyword") && value) {
      setSearchParams(
        (prev) => {
          prev.set("keyword", value);
          prev.set("page", `1`);

          return prev;
        },
        { replace: true },
      );
    }
  }, [value, setSearchParams, searchParams]);

  const { data, isSuccess, isError, error, isLoading } = useQuery({
    queryKey: ["search", searchParams.toString()],
    queryFn: async () => {
      const paramsStr = searchParams.toString();

      if (media_type === "movie") {
        return list
          ? await phimDanhsach(list as MovieListType, paramsStr)
          : await phimSearch(paramsStr);
      }

      if (media_type === "manga") {
        return list
          ? await truyenDanhsach(list as MangaListType, paramsStr)
          : await truyenSearch(paramsStr);
      }
      return null;
    },
    enabled: !!media_type,
  });

  const dataCustom = useMemo(() => {
    let results: unknown[] = [];
    let pagination: PaginationType = {
      currentPage: 0,
      limit: 0,
      totalItems: 0,
      totalPages: 0,
    };

    if (!data) return { results };

    if (media_type === "movie") {
      const movieResp = (data as unknown as MovieResponse).data;
      results = movieResp.items;
      pagination = {
        currentPage: movieResp.params.pagination.currentPage,
        limit: movieResp.params.pagination.totalItemsPerPage,
        totalItems: movieResp.params.pagination.totalItems,
        totalPages: Math.ceil(
          movieResp.params.pagination.totalItems /
            movieResp.params.pagination.totalItemsPerPage,
        ),
      };
    }
    if (media_type === "manga") {
      const mangaResp = (data as unknown as MangaResponse).data;
      results = mangaResp.items;
      pagination = {
        currentPage: mangaResp.params.pagination.currentPage,
        limit: mangaResp.params.pagination.totalItemsPerPage,
        totalItems: mangaResp.params.pagination.totalItems,
        totalPages: Math.ceil(
          mangaResp.params.pagination.totalItems /
            mangaResp.params.pagination.totalItemsPerPage,
        ),
      };
    }

    return {
      results,
      pagination,
    };
  }, [data, media_type]);

  return (
    <div>
      {/* slide bg */}
      <section>
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          autoplay
          loop
          modules={[Autoplay]}
        >
          {bgSlideUrls?.map((bg, idx) => (
            <SwiperSlide key={idx} className="relative">
              <img
                src={bg.img}
                alt="bg"
                loading="lazy"
                className="object-center object-cover h-32 md:h-64 w-full "
              />
              <div className="absolute inset-0 bg-black/50"></div>
              <h1 className="italic absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-white">
                {bg.title}
              </h1>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* <div className="absolute inset-0  bg-black/50"></div> */}
      </section>
      <Wrapper className="py-8 px-4 space-y-8">
        {/* input */}
        <section>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="flex items-stretch gap-4"
          >
            <InputSearch
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="flex-1"
            />
            <select
              value={media_type}
              onChange={(e) => {
                handleChangeTypeSelect(e.target.value as MediaType);
              }}
              className="min-w-25 bg-select px-4 py-2 rounded-lg outline-none cursor-pointer"
            >
              {mediaTypes.map((type) => (
                <option key={type.type} value={type.type}>
                  {type.label}
                </option>
              ))}
            </select>
          </form>
        </section>
        {/* filter */}
        <section>
          <SearchFilter
            handleReset={handleReset}
            handleSearchParams={handleSearchParams}
            searchParams={searchParams}
          />
        </section>
        {/* result */}
        <section id="search-results">
          {isLoading && <p>Đang tìm kiếm...</p>}
          {!isLoading && isError && error && (
            <p className="text-red-600">{error.message}</p>
          )}
          {!isLoading && isSuccess && dataCustom.results.length === 0 && (
            <div className="text-muted-foreground space-y-2">
              <h6>Opps! Không tìm thấy "{value}"</h6>
              <p className="text-sm">Thử từ khóa khác xem sao bro?</p>
            </div>
          )}
          {!isLoading && isSuccess && dataCustom.results.length > 0 && (
            <div className="space-y-8">
              <ul className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
                {dataCustom.results.map((item, idx) => (
                  <li key={idx}>
                    {media_type === "movie" && (
                      <MovieCard movie={item as MovieItem} />
                    )}
                    {media_type === "manga" && (
                      <MangaCard manga={item as MangaItem} />
                    )}
                  </li>
                ))}
              </ul>
              <Pagination
                currentPage={dataCustom.pagination?.currentPage || 1}
                totalPages={dataCustom.pagination?.totalPages || 1}
                onPageChange={(page) => {
                  handlePageChange(page);
                }}
              />
            </div>
          )}
        </section>
      </Wrapper>
    </div>
  );
};

export default SearchPage;
