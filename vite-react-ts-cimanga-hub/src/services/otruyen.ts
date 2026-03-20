import type {
  MangaChapterResponse,
  MangaListType,
  MangaResponse,
} from "@/types";
import axios from "axios";

const axiosTruyen = axios.create({
  baseURL: `https://otruyenapi.com/v1/api`,
});
export function truyenImage({
  width = 250,
  thumb_url,
}: {
  thumb_url?: string;
  width?: number;
}) {
  if (!thumb_url) return "/placeholder.jpg";

  const thumb = `https://img.otruyenapi.com/uploads/comics/` + thumb_url;

  return `https://images.weserv.nl/?url=${encodeURIComponent(
    thumb
  )}&w=${width}&q=75&output=webp`;
}

//
export async function truyenDanhsach(type: MangaListType, query: string = "") {
  return (
    await axiosTruyen.get<MangaResponse>(`/danh-sach/` + type + "?" + query)
  ).data;
}
export async function truyenBySlug(slug: string) {
  return (await axiosTruyen.get<MangaResponse>(`/truyen-tranh/` + slug)).data;
}
export async function truyenChapterById(id: string) {
  return (
    await axios.get<MangaChapterResponse>(
      `https://sv1.otruyencdn.com/v1/api/chapter/` + id
    )
  ).data;
}
export async function truyenSearch(query: string = "") {
  return (await axiosTruyen.get<MangaResponse>(`/tim-kiem?` + query)).data;
}
export async function truyenCategories() {
  return (await axiosTruyen.get<MangaResponse>(`/the-loai`)).data;
}
export async function truyenCategoryBySlug(slug: string) {
  return (await axiosTruyen.get<MangaResponse>(`/the-loai/` + slug)).data;
}
