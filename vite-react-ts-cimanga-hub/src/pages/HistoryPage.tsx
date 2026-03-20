import { useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineDelete, AiOutlineHistory } from "react-icons/ai";
import { useHistory } from "@/hooks/useHistory";
import MovieCard from "@/components/custom/MovieCard";
import MangaCard from "@/components/custom/MangaCard";
import type { MovieItem, MangaItem } from "@/types";

const HistoryPage = () => {
  const { history, loading, fetchHistory, removeHistory } = useHistory();

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-red-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-10">
        <h4 className="text-2xl font-bold">Lịch sử xem</h4>
        <p className="mt-2 text-muted-foreground">
          Những bộ phim và truyện bạn đã xem gần đây
        </p>
      </header>

      {history.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-border p-4">
          <AiOutlineHistory className="mb-4 text-6xl text-muted-foreground/50" />
          <p className="text-muted-foreground">Bạn chưa xem bộ nào hết bro!</p>
          <Link to="/" className="mt-4 text-red-600 hover:underline">
            Xem ngay bộ nào đó đi
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {history.map((item) => (
            <div
              key={item.slug}
              className="group relative flex flex-col rounded-2xl border border-border bg-card p-2 transition-all hover:border-red-600/50"
            >
              {/* Nút xóa lịch sử này */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  removeHistory(item.slug);
                }}
                className="z-20 absolute top-2 right-2 rounded-full bg-black/60 p-2 text-white transition-colors hover:bg-red-600 opacity-0 group-hover:opacity-100"
              >
                <AiOutlineDelete size={18} />
              </button>

              {/* Render Card tùy theo loại */}
              <div className="relative">
                {item.type === "movie" ? (
                  <MovieCard movie={item as unknown as MovieItem} />
                ) : (
                  <MangaCard manga={item as unknown as MangaItem} />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
