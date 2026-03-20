import MangaChapterNav from "@/components/custom/MangaChapterNav";
import { truyenBySlug, truyenChapterById } from "@/services/otruyen";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const MangaChapterPage = () => {
  const { slug, id } = useParams();
  const { data: info } = useQuery({
    queryKey: ["manga", "detail", slug],
    queryFn: async () => await truyenBySlug(slug as string),
    enabled: !!slug,
  });
  const { data: chapter } = useQuery({
    queryKey: ["manga", "chapter", id],
    queryFn: async () => await truyenChapterById(id as string),
    enabled: !!id,
  });

  if (!chapter) return <div>NotFound</div>;
  return (
    <div className="p-4 py-10 max-w-7xl w-full mx-auto space-y-10">
      <MangaChapterNav
        chapters={info?.data.item.chapters[0].server_data.reverse() || []}
        chapterId={id as string}
        slug={slug as string}
      />
      <ul className="w-225 mx-auto space-y-4">
        {chapter.data.item.chapter_image.map((item) => (
          <li key={item.image_page}>
            <img
              src={`https://images.weserv.nl/?url=${encodeURIComponent(
                chapter.data.domain_cdn +
                  "/" +
                  chapter.data.item.chapter_path +
                  "/" +
                  item.image_file
              )}&w=900&q=75&output=webp`}
              alt="image"
              loading="lazy"
              className="w-full h-auto"
            />
          </li>
        ))}
      </ul>
      <MangaChapterNav
        chapters={info?.data.item.chapters[0].server_data.reverse() || []}
        chapterId={id as string}
        slug={slug as string}
      />
    </div>
  );
};

export default MangaChapterPage;
