import { memo } from "react";
import {
  MdChevronLeft,
  MdChevronRight,
  MdFirstPage,
  MdLastPage,
} from "react-icons/md";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    if (onPageChange) onPageChange(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPageNumbers = () => {
    const pages = [];
    const delta = 1;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }
    return pages;
  };

  return (
    <div className="flex flex-wrap flex-row items-center justify-center gap-1 sm:gap-1.5">
      {/* Nút điều hướng nhỏ gọn */}
      <div className="flex flex-wrap items-center gap-1">
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className="p-1.5 rounded bg-input border border-border hover:text-red-500 disabled:opacity-20 transition-colors"
        >
          <MdFirstPage size={18} />
        </button>

        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-1.5 rounded bg-input border border-border hover:text-red-500 disabled:opacity-20 transition-colors"
        >
          <MdChevronLeft size={18} />
        </button>
      </div>

      {/* Dãy số trang nhỏ gọn */}
      <div className="flex flex-wrap items-center gap-1">
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === "number" && handlePageChange(page)}
            disabled={page === "..."}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded text-[11px] sm:text-xs font-bold transition-all
              ${
                page === currentPage
                  ? "bg-red-600 text-white border-none shadow-md shadow-red-600/20"
                  : page === "..."
                  ? "cursor-default text-muted-foreground border-none"
                  : "bg-input border border-border hover:border-red-500 hover:text-red-500"
              }
            `}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Nút điều hướng nhỏ gọn */}
      <div className="flex flex-wrap items-center gap-1">
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-1.5 rounded bg-input border border-border hover:text-red-500 disabled:opacity-20 transition-colors"
        >
          <MdChevronRight size={18} />
        </button>

        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="p-1.5 rounded bg-input border border-border hover:text-red-500 disabled:opacity-20 transition-colors"
        >
          <MdLastPage size={18} />
        </button>
      </div>
    </div>
  );
};

export default memo(Pagination);
