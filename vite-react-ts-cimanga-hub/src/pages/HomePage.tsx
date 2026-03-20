import BannerSlide from "@/components/custom/BannerSlide";
import MediaSlide, { GroupSlide } from "@/components/custom/MediaSlide";
import Wrapper from "@/components/layout/Wrapper";
import { phimDanhsach } from "@/services/ophim";
import { truyenDanhsach } from "@/services/otruyen";
import type { MangaItem, MovieItem } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { data: movie, isLoading: movieLoading } = useQuery({
    queryKey: ["home", "movie"],
    queryFn: async () =>
      await Promise.all([
        await phimDanhsach("phim-chieu-rap"),
        await phimDanhsach("phim-moi"),
        await phimDanhsach("hoat-hinh"),
      ]),
  });
  const { data: manga, isLoading: mangaLoading } = useQuery({
    queryKey: ["home", "manga"],
    queryFn: async () =>
      await Promise.all([
        await truyenDanhsach("truyen-moi"),
        await truyenDanhsach("sap-ra-mat"),
        await truyenDanhsach("hoan-thanh"),
      ]),
  });

  const hubs = [
    {
      name: "Movie",
      color: "from-purple-600 to-fuchsia-800",
      count: "Bản chiếu rạp",
      type: "movie",
    },
    {
      name: "Manga",
      color: "from-rose-600 to-red-800",
      count: "500+ bộ",
      type: "manga",
    },
    {
      name: "Anime",
      color: "from-blue-600 to-indigo-800",
      count: "1000+ tập",
      type: "anime",
    },
    {
      name: "Databook",
      color: "from-amber-500 to-orange-700",
      count: "Thông tin nhân vật",
      type: "data-book",
    },
  ];

  return (
    <Wrapper className="p-4 py-10 space-y-10">
      {/* hubs */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {hubs.map((hub) => (
          <div
            key={hub.name}
            className={`bg-linear-to-br ${hub.color} p-5 rounded-2xl h-20 sm:h-36 flex flex-col justify-between hover:scale-[1.02] transition-transform cursor-pointer shadow-lg`}
          >
            <h3 className=" font-black text-white italic uppercase">
              {hub.name}
            </h3>
            <div className="flex justify-between items-end">
              <span className="text-10 text-white/70 font-medium">
                {hub.count}
              </span>
              <Link
                to={`/` + hub.type}
                className="bg-white/20 p-1 rounded-full text-white text-xs inline-block"
              >
                <FaArrowRight />
              </Link>
            </div>
          </div>
        ))}
      </section>
      {/* banner */}
      <BannerSlide
        loading={movieLoading}
        items={movie?.[0].data.items as MovieItem[]}
        type="movie"
      />
      {/* slide */}
      <GroupSlide>
        <MediaSlide
          name="Phim mới cập nhật"
          type="movie"
          items={movie?.[1].data.items as MovieItem[]}
          loading={movieLoading}
        />
        <MediaSlide
          name="Phim hoạt hình"
          type="movie"
          items={movie?.[2].data.items as MovieItem[]}
          loading={movieLoading}
        />
      </GroupSlide>
      <GroupSlide>
        <MediaSlide
          name="Truyện mới cập nhật"
          type="manga"
          items={manga?.[0].data.items as MangaItem[]}
          loading={mangaLoading}
          grid={{ fill: "row", rows: 2 }}
          autoplay={{ disableOnInteraction: false, delay: 2500 }}
        />
        <MediaSlide
          name="Truyện sắp ra mắt"
          type="manga"
          items={manga?.[1].data.items as MangaItem[]}
          loading={mangaLoading}
        />
        <MediaSlide
          name="Truyện hoàn thành"
          type="manga"
          items={manga?.[2].data.items as MangaItem[]}
          loading={mangaLoading}
        />
      </GroupSlide>
    </Wrapper>
  );
};

export default HomePage;
