import type { MovieListType, MovieResponse } from "@/types";
import axios from "axios";

const axiosPhim = axios.create({
  baseURL: `https://ophim1.com/v1/api`,
});

export function phimImage({
  width = 250,
  thumb_url,
  banner,
}: {
  thumb_url?: string;
  width?: number;
  banner?: boolean;
}) {
  if (!thumb_url) return "/placeholder.jpg";

  const thumb = `https://img.ophim.live/uploads/movies/` + thumb_url;
  if (banner) {
    return thumb;
  }

  return `https://images.weserv.nl/?url=${encodeURIComponent(
    thumb
  )}&w=${width}&q=75&output=webp`;
}
export function getTMDBImage({
  path,
  size = "w500",
}: {
  path: string;
  size?: "w500" | "w1280" | "original";
}) {
  if (!path) return "/placeholder-image.jpg";
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

//
export async function phimHome() {
  return (await axiosPhim.get<MovieResponse>(`/home?limit=10`)).data;
}
export async function phimDanhsach(type: MovieListType, query: string = "") {
  return (
    await axiosPhim.get<MovieResponse>(`/danh-sach/` + type + "?" + query)
  ).data;
}
export async function phimBySlug(slug: string) {
  return (await axiosPhim.get<MovieResponse>(`/phim/` + slug)).data;
}
export async function phimBySlugImages(slug: string) {
  return (await axiosPhim.get<MovieResponse>(`/phim/` + slug + `/images`)).data;
}
export async function phimBySlugPeoples(slug: string) {
  return (await axiosPhim.get<MovieResponse>(`/phim/` + slug + `/peoples`))
    .data;
}
export async function phimCategoryBySlug(slug: string) {
  return (await axiosPhim.get<MovieResponse>(`/the-loai/` + slug)).data;
}
export async function phimSearch(query: string = "") {
  return (await axiosPhim.get<MovieResponse>(`/tim-kiem?` + query)).data;
}
export async function phimCategories() {
  return (await axiosPhim.get<MovieResponse>(`/the-loai`)).data;
}
export async function phimCountries() {
  return (await axiosPhim.get<MovieResponse>(`/quoc-gia`)).data;
}
export async function phimYears() {
  return (await axiosPhim.get<MovieResponse>(`/nam-phat-hanh`)).data;
}
