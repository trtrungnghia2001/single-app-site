import { truyenImage } from "@/services/otruyen";
import type { MangaItem } from "@/types/otruyen";
import { memo } from "react";
import { Link } from "react-router-dom";

const MangaCard = ({ manga }: { manga: MangaItem }) => {
  const chapterLatest = manga.chaptersLatest?.[0]?.chapter_api_data
    .split(`/`)
    .pop();
  return (
    <div className="block">
      <Link
        to={`/manga/` + manga.slug}
        state={[
          {
            label: "Truyện",
            path: "/manga",
          },
          {
            label: manga.name,
            path: "/manga/" + manga.slug,
          },
        ]}
        className="block"
      >
        <img
          loading="lazy"
          alt="thumb"
          src={truyenImage({ thumb_url: manga.thumb_url })}
          className="rounded-lg overflow-hidden aspect-thumbnail hover:opacity-90 transition-all"
        />
        <h6 className="line-clamp-2 mt-2 h-10">{manga.name}</h6>
      </Link>
      {(chapterLatest || manga.updatedAt) && (
        <div className="text-muted-foreground border-t border-t-gray-500 pt-2 mt-2">
          {chapterLatest && (
            <Link
              to={`/manga/` + manga.slug + `/chapter/` + chapterLatest}
              className="line-clamp-1 font-medium block"
            >
              Chapter {manga.chaptersLatest?.[0]?.chapter_name}
            </Link>
          )}
          {manga.updatedAt && (
            <p className="text-13 text-muted-foreground line-clamp-1">
              {new Date(manga.updatedAt).toLocaleDateString()}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(MangaCard);
