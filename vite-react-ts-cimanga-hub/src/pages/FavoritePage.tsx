import MangaCard from "@/components/custom/MangaCard";
import MovieCard from "@/components/custom/MovieCard";
import { useGetBookmarks } from "@/hooks/useGetBookmarks";
import type { MangaItem, MovieItem } from "@/types";
import { AiOutlineDelete, AiOutlineInbox } from "react-icons/ai";
import { Link } from "react-router-dom";

const FavoritePage = () => {
  const { bookmarks, loading, removeBookmark } = useGetBookmarks();

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-red-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="">
      <header className="mb-10">
        <h4>Thư viện của tôi</h4>
        <p className="mt-2 text-muted-foreground">
          Nơi lưu giữ những bộ phim và truyện yêu thích của bạn
        </p>
      </header>

      {bookmarks.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-border p-4">
          <AiOutlineInbox className="mb-4 text-6xl text-muted-foreground/50" />
          <p className="text-muted-foreground">
            Chưa có gì trong danh sách yêu thích hết bro!
          </p>
          <Link to="/" className="mt-4 text-red-600 hover:underline">
            Khám phá ngay
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {bookmarks.map((item) => (
            <div
              key={item.slug}
              className="group relative flex flex-col rounded-2xl border border-border bg-card p-2 transition-all hover:border-red-600/50"
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  removeBookmark(item.slug);
                }}
                className="z-10 absolute top-2 right-2 rounded-full bg-black/60 p-2 text-white transition-colors hover:bg-red-600"
              >
                <AiOutlineDelete size={18} />
              </button>
              {item.type === "movie" && (
                <MovieCard movie={item as unknown as MovieItem} />
              )}
              {item.type === "manga" && (
                <MangaCard manga={item as unknown as MangaItem} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritePage;
