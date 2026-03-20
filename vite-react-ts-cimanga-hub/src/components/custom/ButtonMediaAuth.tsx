import { memo } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineShareAlt,
  AiOutlineMessage,
  AiOutlineLoading3Quarters, // Thêm cái này để làm loading
} from "react-icons/ai";
import { motion } from "framer-motion";
import clsx from "clsx";
import { useBookmark } from "@/hooks/useBookmark";

export interface MovieData {
  slug: string;
  name: string;
  thumb_url: string;
  type: "movie" | "manga";
}

const ButtonMediaAuth = ({ movieData }: { movieData: MovieData }) => {
  const { isBookmarked, toggleBookmark, loading } = useBookmark(movieData);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: movieData?.name || "Xem phim hay",
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Đã sao chép liên kết!");
    }
  };

  const handleCommentScroll = () => {
    const commentSection = document.getElementById("comment-section");
    commentSection?.scrollIntoView({ behavior: "smooth" });
  };

  // Tách riêng danh sách để quản lý logic hiển thị
  const actions = [
    {
      id: "bookmark",
      label: isBookmarked ? "Đã thích" : "Yêu thích",
      onClick: toggleBookmark,
      active: isBookmarked,
      color: "hover:bg-red-500/10 hover:text-red-600",
      isLoading: loading, // Chỉ nút bookmark mới có loading
    },
    {
      id: "comment",
      label: "Bình luận",
      icon: <AiOutlineMessage className="text-xl" />,
      onClick: handleCommentScroll,
      color: "hover:bg-blue-500/10 hover:text-blue-500",
    },
    {
      id: "share",
      label: "Chia sẻ",
      icon: <AiOutlineShareAlt className="text-xl" />,
      onClick: handleShare,
      color: "hover:bg-green-500/10 hover:text-green-500",
    },
  ];

  return (
    <div className="flex items-center gap-2 sm:gap-4">
      {actions.map((action) => (
        <motion.button
          key={action.id}
          whileTap={{ scale: 0.95 }}
          disabled={action.isLoading} // Chặn bấm khi đang lưu
          onClick={action.onClick}
          className={clsx(
            "group flex items-center gap-2 px-4 py-2 rounded-2xl transition-all duration-300 cursor-pointer",
            "border border-border bg-background/50",
            "text-foreground/80 font-medium text-sm",
            action.color,
            action.isLoading && "opacity-60 cursor-not-allowed" // Hiệu ứng mờ khi đang xử lý
          )}
        >
          <span className="transition-transform duration-300 group-hover:scale-110">
            {/* Logic hiển thị Icon cho Bookmark */}
            {action.id === "bookmark" ? (
              action.isLoading ? (
                <AiOutlineLoading3Quarters className="text-xl animate-spin" />
              ) : isBookmarked ? (
                <AiFillHeart className="text-red-600 text-xl" />
              ) : (
                <AiOutlineHeart className="text-xl" />
              )
            ) : (
              action.icon
            )}
          </span>
          <span className="hidden md:inline-block">{action.label}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default memo(ButtonMediaAuth);
