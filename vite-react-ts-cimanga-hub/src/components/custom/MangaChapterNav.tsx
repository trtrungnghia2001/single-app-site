import type { MangaServerData } from "@/types";
import { memo, useMemo } from "react";
import { MdHome, MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { useNavigate } from "react-router-dom";

type MangaChapterNavType = {
  chapters: MangaServerData[];
  chapterId: string;
  slug: string;
};

const MangaChapterNav = ({
  chapters,
  chapterId,
  slug,
}: MangaChapterNavType) => {
  const navigate = useNavigate();

  const chapterIdx = useMemo(() => {
    return chapters.findIndex((value) =>
      value.chapter_api_data.includes(chapterId)
    );
  }, [chapterId, chapters]);

  const handleNext = () => {
    if (chapterIdx >= chapters.length - 1) return;

    navigate(
      `/manga/${slug}/chapter/${chapters[chapterIdx + 1].chapter_api_data
        .split("/")
        .pop()}`
    );
  };
  const handleBefore = () => {
    if (chapterIdx < 1) return;

    navigate(
      `/manga/${slug}/chapter/${chapters[chapterIdx - 1].chapter_api_data
        .split("/")
        .pop()}`
    );
  };

  return (
    <div className="mx-auto w-max flex items-stretch gap-2">
      <button
        className="bg-input rounded-lg p-1"
        onClick={() => {
          navigate(`/manga/${slug}`);
        }}
      >
        <MdHome size={20} />
      </button>
      <button
        className="bg-input rounded-lg p-1 disabled:opacity-50 disabled:cursor-no-drop"
        disabled={chapterIdx <= 0}
        onClick={handleBefore}
      >
        <MdNavigateBefore size={20} />
      </button>
      <select
        name="chapter"
        id="chapter"
        value={chapterId}
        onChange={(e) => {
          navigate(`/manga/${slug}/chapter/${e.target.value}`);
        }}
        className="bg-input px-4 py-1 rounded-lg overflow-hidden outline-none cursor-pointer min-w-40 custom-scrollbar"
      >
        {chapters.map((item) => (
          <option
            className="bg-neutral-700 cursor-pointer"
            key={item.chapter_api_data}
            value={item.chapter_api_data.split("/").pop()}
          >
            Chapter {item.chapter_name}
          </option>
        ))}
      </select>
      <button
        className="bg-input rounded-lg p-1 disabled:opacity-50 disabled:cursor-no-drop"
        disabled={chapterIdx >= chapters.length - 1}
        onClick={handleNext}
      >
        <MdNavigateNext size={20} />
      </button>
    </div>
  );
};

export default memo(MangaChapterNav);
