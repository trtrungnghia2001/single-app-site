import type { MediaType, MovieItem } from "@/types";
import { memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "./MovieCard";
import type { MangaItem } from "@/types/otruyen";
import MangaCard from "./MangaCard";
import { Autoplay, Grid } from "swiper/modules";
import type { AutoplayOptions, GridOptions, SwiperOptions } from "swiper/types";

type MediaSlideType = {
  name: string;
  type: MediaType;
  items?: MovieItem[] | MangaItem[];
  loading?: boolean;
  grid?: GridOptions;
  breakpoints?: {
    [width: number]: SwiperOptions;
    [ratio: string]: SwiperOptions;
  };
  autoplay?: boolean | AutoplayOptions;
};

const MediaSlide = ({
  name,
  type,
  items,
  loading,
  grid,
  breakpoints,
  autoplay,
}: MediaSlideType) => {
  return (
    <section className="space-y-4">
      <h4>{name}</h4>

      <div>
        <Swiper
          spaceBetween={16}
          slidesPerView={2.2}
          grid={grid}
          autoplay={autoplay}
          modules={[Grid, Autoplay]}
          breakpoints={
            breakpoints ?? {
              // Tablet (>= 640px)
              640: {
                slidesPerView: 3.2,
              },
              // Desktop (>= 1024px)
              1024: {
                slidesPerView: 6,
              },
              // Wide Desktop (>= 1280px)
              1280: {
                slidesPerView: 7,
              },
            }
          }
        >
          {/* skeleton */}
          {loading &&
            Array(10)
              .fill(0)
              .map((_, idx) => (
                <SwiperSlide key={idx}>
                  <div className="flex flex-col gap-2 w-full animate-pulse">
                    <div className="bg-background rounded-lg aspect-thumbnail w-full shadow-lg"></div>

                    <div className="h-4 bg-background rounded w-3/4 mt-1"></div>

                    <div className="h-3 bg-background rounded w-1/2"></div>
                  </div>
                </SwiperSlide>
              ))}
          {!loading &&
            items?.map((item, idx) => (
              <SwiperSlide key={idx}>
                {type === "movie" && <MovieCard movie={item as MovieItem} />}
                {type === "manga" && <MangaCard manga={item as MangaItem} />}
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </section>
  );
};

export default memo(MediaSlide);

export const GroupSlide = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="space-y-10 p-4 md:p-8 bg-vignette rounded-lg">
      {children}
    </div>
  );
};
