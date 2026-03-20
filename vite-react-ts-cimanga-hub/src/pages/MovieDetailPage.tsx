import Wrapper from "@/components/layout/Wrapper";
import { phimBySlug, phimImage } from "@/services/ophim";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import Breadcrumb from "@/components/layout/Breadcrumb";
import CommentList from "@/components/custom/CommentList";
import {
  Episode,
  Gallery,
  People,
  Suggest,
} from "@/components/custom/MovieTabs";
import ButtonMediaAuth from "@/components/custom/ButtonMediaAuth";
import { useHistory } from "@/hooks/useHistory";

const tabs = [`Tập phim`, `Gallery`, `Thành viên`, `Đề xuất`];

const MovieDetailPage = () => {
  const { slug } = useParams();
  const { data: info } = useQuery({
    queryKey: ["movie", "detail", slug],
    queryFn: async () => await phimBySlug(slug as string),
    enabled: !!slug,
  });
  const movieInfo = useMemo(() => {
    return info?.data.item;
  }, [info]);
  const [searchParams, handleSearchParams] = useSearchParams({
    server: `0`,
    episode: `0`,
    tabIndex: `0`,
  });
  const server = useMemo(
    () => searchParams.get("server") || "0",
    [searchParams]
  );
  const episode = useMemo(
    () => searchParams.get("episode") || "0",
    [searchParams]
  );
  const tabIndex = useMemo(
    () => Number(searchParams.get("tabIndex") || "0"),
    [searchParams]
  );

  const currentSrcPlay = useMemo(() => {
    const url =
      movieInfo?.episodes?.[Number(server)]?.server_data?.[Number(episode)];

    return url?.link_embed || url?.link_m3u8 || null;
  }, [movieInfo, server, episode]);

  //
  const [showInfo, setShowInfo] = useState(false);

  //
  const { saveHistory } = useHistory();
  useEffect(() => {
    if (movieInfo) {
      saveHistory({
        name: movieInfo?.name || "",
        slug: movieInfo?.slug || "",
        thumb_url: movieInfo?.thumb_url || "",
        type: "movie",
        episode_name: "",
        progress: 0,
      });
    }
  }, [movieInfo, saveHistory, episode]);

  return (
    <Wrapper className="p-4">
      <Breadcrumb className="mb-4" />
      <div className="space-y-10">
        {/* video */}
        {currentSrcPlay && (
          <section>
            <iframe
              src={currentSrcPlay}
              title={movieInfo?.name}
              className="aspect-video w-full"
              loading="lazy"
              allowFullScreen
              frameBorder="0"
              allow="autoplay=0; encrypted-media"
            ></iframe>
          </section>
        )}
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16">
          {/* left */}
          <section className="w-full flex-1/3 flex flex-col items-center lg:items-start gap-4">
            {/*  */}
            <img
              src={phimImage({ thumb_url: movieInfo?.thumb_url })}
              alt="thumb"
              loading="lazy"
              className="aspect-thumbnail rounded-lg w-40"
            />
            <h5 className="text-center lg:text-left">{movieInfo?.name}</h5>
            <p className="text-muted-foreground text-13 text-center lg:text-left">
              {movieInfo?.origin_name}
            </p>
            {/* info */}
            <button
              className="text-yellow-500 lg:hidden"
              onClick={() => setShowInfo(!showInfo)}
            >
              Thông tin phim
            </button>
            <div
              className={clsx([
                `space-y-4`,
                showInfo ? `block` : `hidden`,
                `lg:block`,
              ])}
            >
              <div className="text-xs space-x-2">
                {movieInfo?.country.map((c) => (
                  <Link
                    to={`/search?country=${c.slug}`}
                    key={c.id}
                    className="inline-block rounded border border-white px-1.5 py-1"
                  >
                    {c.name}
                  </Link>
                ))}

                <span className="inline-block rounded border border-white px-1.5 py-1">
                  {movieInfo?.lang}
                </span>
              </div>
              <div className="text-xs space-x-2">
                <span className="inline-block rounded border text-yellow-500 border-yellow-500 px-1.5 py-1">
                  IMDB {movieInfo?.imdb.vote_average}
                </span>
                <span className="inline-block rounded border border-white px-1.5 py-1">
                  {movieInfo?.year}
                </span>
                <span className="inline-block rounded border border-white px-1.5 py-1">
                  {movieInfo?.type}
                </span>
                <span className="inline-block rounded border border-white px-1.5 py-1">
                  {movieInfo?.episode_current}
                </span>
              </div>
              {/* cate */}
              <div className="text-xs space-x-2">
                {movieInfo?.category.map((cate) => (
                  <Link
                    key={cate.id}
                    to={`/movie?media_type=movie&category=` + cate.slug}
                    className="bg-white/20 py-1 px-1.5 text-xs rounded hover:text-yellow-500"
                  >
                    {cate.name}
                  </Link>
                ))}
              </div>
              {/*  */}
              <div className="space-y-2">
                <p>
                  <span className="font-bold">Giới thiệu: </span>
                </p>
                <div
                  className="text-muted-foreground whitespace-break-spaces"
                  dangerouslySetInnerHTML={{ __html: movieInfo?.content || "" }}
                ></div>
                <p className="space-x-2">
                  <span className="font-bold">Thời lượng:</span>
                  <span className="text-muted-foreground">
                    {movieInfo?.time}
                  </span>
                </p>
                <p className="space-x-2">
                  <span className="font-bold">Quốc gia:</span>
                  {movieInfo?.country.map((item) => (
                    <Link
                      to={`/movie`}
                      key={item.id}
                      className="text-muted-foreground hover:text-yellow-500"
                    >
                      {item.name}
                    </Link>
                  ))}
                </p>
              </div>
            </div>
          </section>
          {/* right */}
          <section className="w-full flex-2/3 space-y-8">
            <ButtonMediaAuth
              movieData={{
                name: movieInfo?.name || "",
                slug: movieInfo?.slug || "",
                thumb_url: movieInfo?.thumb_url || "",
                type: "movie",
              }}
            />
            {/* tabs */}
            <ul
              className={clsx([
                `flex items-center gap-8 border-b border-b-border`,
              ])}
            >
              {tabs.map((tab, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => {
                      const newParam = new URLSearchParams(searchParams);
                      newParam.set("tabIndex", idx.toString());
                      handleSearchParams(newParam);
                    }}
                    className={clsx(
                      `py-4 relative transition-all`,
                      tabIndex === idx &&
                        `text-yellow-500 after:transition-all after:ease-in-out after:absolute after:left-0 after:right-0 after:bottom-0 after:h-0.5 after:bg-yellow-500 after:z-10`
                    )}
                  >
                    {tab}
                  </button>
                </li>
              ))}
            </ul>
            {/* tab detail */}
            {tabIndex === 0 && (
              <Episode
                serverEpisodes={movieInfo?.episodes || []}
                searchParams={searchParams}
                handleSearchParams={handleSearchParams}
                server={Number(server)}
                episode={Number(episode)}
              />
            )}
            {tabIndex === 1 && (
              <Gallery
                slug={slug as string}
                trailer_url={movieInfo?.trailer_url || ""}
              />
            )}
            {tabIndex === 2 && <People slug={slug as string} />}
            {tabIndex === 3 && (
              <Suggest category={movieInfo?.category[0].slug as string} />
            )}
            {/* comments */}
            <CommentList slug={slug as string} type="movie" />
          </section>
        </div>
      </div>
    </Wrapper>
  );
};

export default MovieDetailPage;
