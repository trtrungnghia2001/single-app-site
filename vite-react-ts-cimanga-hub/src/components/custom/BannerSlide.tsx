import { phimImage } from "@/services/ophim";
import type { MediaType, MovieItem } from "@/types";
import clsx from "clsx";
import { memo, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

type BannerSlideType = {
  items?: MovieItem[];
  type: MediaType;
  loading?: boolean;
};

const BannerSlide = ({ items, loading, type }: BannerSlideType) => {
  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const handleItemClick = (index: number) => {
    if (swiperRef) {
      swiperRef.slideToLoop(index);
    }
  };
  return (
    <section className="space-y-4 ">
      <div>
        {/* main */}
        <Swiper
          onSwiper={setSwiperRef}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          modules={[Autoplay]}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex);
          }}
          loop={true}
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
                {type === "movie" && <MovieSlide movie={item as MovieItem} />}
              </SwiperSlide>
            ))}
        </Swiper>
        {/* paginate */}
        <div className="hidden sm:block px-8">
          <Swiper
            spaceBetween={8}
            breakpoints={{
              // Tablet (>= 640px)
              640: {
                slidesPerView: 12.5,
              },
              768: {
                slidesPerView: 16.5,
              },
              // Desktop (>= 1024px)
              1024: {
                slidesPerView: 18.5,
              },
              // Wide Desktop (>= 1280px)
              1280: {
                slidesPerView: 20.5,
              },
            }}
            className="max-w-6xl -translate-y-1/2 z-20 mx-auto"
          >
            {items?.map((item, idx) => (
              <SwiperSlide key={idx}>
                {type === "movie" && (
                  <img
                    onClick={() => handleItemClick(idx)}
                    alt="thumb"
                    src={phimImage({ thumb_url: item.thumb_url })}
                    className={clsx([
                      `aspect-thumbnail rounded-lg border-2 cursor-pointer`,
                      activeIndex === idx && `border-red-500`,
                    ])}
                  />
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default memo(BannerSlide);

const MovieSlide = ({ movie }: { movie: MovieItem }) => {
  return (
    <div className="h-125 relative rounded-lg overflow-hidden text-white">
      <div className="absolute top-0 left-0 bottom-0 sm:w-3/5 z-10 space-y-8 p-4 md:p-8 bg-linear-90 from-[#2F3346] from-40% sm:from-60% to-transparent">
        <h3 className="text-white">{movie.name}</h3>
        <div className="space-y-4">
          <p className="text-yellow-500">{movie.origin_name}</p>
          <div className="text-xs space-x-2">
            {movie.country.map((c) => (
              <Link
                to={`/search?country=${c.slug}`}
                key={c.id}
                className="inline-block rounded border border-white px-1.5 py-0.5"
              >
                {c.name}
              </Link>
            ))}

            <span className="inline-block rounded border border-white px-1.5 py-0.5">
              {movie.lang}
            </span>
          </div>
          <div className="text-xs space-x-2">
            <span className="inline-block rounded border text-yellow-500 border-yellow-500 px-1.5 py-0.5">
              IMDB {movie.imdb.vote_average}
            </span>
            <span className="inline-block rounded border border-white px-1.5 py-0.5">
              {movie.year}
            </span>
            <span className="inline-block rounded border border-white px-1.5 py-0.5">
              {movie.type}
            </span>
            <span className="inline-block rounded border border-white px-1.5 py-0.5">
              {movie.episode_current}
            </span>
          </div>
          <div className="text-xs space-x-2">
            {movie.category.map((cate) => (
              <Link
                key={cate.id}
                to={`/search?category=${cate.slug}`}
                className="bg-white/20 py-0.5 px-1.5 text-xs rounded"
              >
                {cate.name}
              </Link>
            ))}
          </div>
        </div>
        <p className="text-muted-foreground line-clamp-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam,
          molestias? Atque in mollitia qui dicta esse maiores aspernatur ad.
          Error nostrum assumenda animi blanditiis tenetur, aut quaerat ea nulla
          vel?
        </p>
        <div className="flex items-center gap-4">
          <Link
            to={`/movie/` + movie.slug}
            className="flex items-center justify-center p-4 rounded-full bg-blue-500"
          >
            <FaPlay size={24} />
          </Link>
        </div>
      </div>
      <div
        className={clsx([
          `absolute top-0 right-0 bottom-0 bg-no-repeat bg-center bg-cover h-full w-2/3`,
        ])}
        style={{
          backgroundImage: `url(${phimImage({
            thumb_url: movie.thumb_url,
            banner: true,
          })})`,
        }}
      ></div>
    </div>
  );
};
