import avatar_notfound from "@/assets/image/avatar_notfound.png";
import type {
  MangaDetailCategory,
  MovieDetailCategory,
  MovieDetailCountry,
  MovieDetailYear,
  SelectType,
} from "@/types";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaCalendar, FaSort } from "react-icons/fa";
import { FaEarthAsia } from "react-icons/fa6";
import { HiStatusOnline } from "react-icons/hi";
import {
  MdFavorite,
  MdHistory,
  MdAccountCircle,
  MdSettings,
  MdLogout,
} from "react-icons/md";

export const IMAGE_DEFAULT = {
  AVATAR: avatar_notfound,
};

export const navs = [
  { title: `Phim`, path: `/movie?media_type=movie` },
  { title: `Truyện`, path: `/manga?media_type=manga` },
  // { title: `Anime`, path: `/anime?media_type=anime` },
  // { title: `Databook`, path: `/data-book?media_type=data-book` },
  { title: `Tìm kiếm`, path: `/search` },
  { title: `Giới thiệu`, path: `/about` },
  { title: `Liên hệ`, path: `/contact` },
];
export const authNavs = [
  {
    title: "Tài khoản",
    path: "/profile",
    icon: <MdAccountCircle />,
    description: "Quản lý thông tin cá nhân",
  },
  {
    title: "Yêu thích",
    path: "/bookmark",
    icon: <MdFavorite />,
    description: "Phim/Truyện đã lưu",
  },
  {
    title: "Lịch sử xem",
    path: "/history",
    icon: <MdHistory />,
    description: "Nội dung vừa xem gần đây",
  },
  {
    title: "Cài đặt",
    path: "/settings",
    icon: <MdSettings />,
    description: "Tùy chỉnh trải nghiệm",
  },
  {
    title: "Thoát",
    path: "",
    icon: <MdLogout />,
    isButton: true,
    type: "signout",
  },
];

export function makeMovieFilter({
  categoriesData,
  countriesData,
  yearsData,
  searchParams,
}: {
  categoriesData: MovieDetailCategory[];
  countriesData: MovieDetailCountry[];
  yearsData: MovieDetailYear[];
  searchParams: URLSearchParams;
}) {
  const categories: SelectType[] = categoriesData.map((item) => ({
    label: item.name.toString(),
    value: item.slug.toString(),
  }));

  const countries: SelectType[] = countriesData.map((item) => ({
    label: item.name.toString(),
    value: item.slug.toString(),
  }));

  const years: SelectType[] = yearsData.map((item) => ({
    label: item.year.toString(),
    value: item.year.toString(),
  }));

  const sorts: SelectType[] = [
    {
      label: `Ngày cập nhật`,
      value: "modified.time",
    },
    {
      label: `Năm phát hành`,
      value: "year",
    },
    {
      label: `Lượt xem`,
      value: "view",
    },
  ];

  const list: SelectType[] = [
    { label: "Phim mới", value: "phim-moi" },
    { label: "Phim bộ", value: "phim-bo" },
    { label: "Phim lẻ", value: "phim-le" },
    { label: "TV Shows", value: "tv-shows" },
    { label: "Hoạt hình", value: "hoat-hinh" },
    { label: "Phim Vietsub", value: "phim-vietsub" },
    { label: "Thuyết minh", value: "phim-thuyet-minh" },
    { label: "Lồng tiếng", value: "phim-long-tieng" },
    { label: "Đang chiếu", value: "phim-bo-dang-chieu" },
    { label: "Hoàn thành", value: "phim-bo-hoan-thanh" },
    { label: "Sắp chiếu", value: "phim-sap-chieu" },
    { label: "Chiếu rạp", value: "phim-chieu-rap" },
    { label: "Subteam", value: "subteam" },
  ];

  const all = [{ label: "Tất cả", value: "" }];

  return [
    {
      icon: <BiSolidCategoryAlt />,
      label: `Danh sách`,
      items: all.concat(list),
      queryKey: "danh-sach",
      value: searchParams.get("danh-sach") || "",
    },
    {
      icon: <BiSolidCategoryAlt />,
      label: `Thể loại`,
      items: all.concat(categories),
      queryKey: "category",
      value: searchParams.get("category") || "",
    },
    {
      icon: <FaEarthAsia />,
      label: `Quốc gia`,
      items: all.concat(countries),
      queryKey: "country",
      value: searchParams.get("country") || "",
    },
    {
      icon: <FaCalendar />,
      label: `Năm`,
      items: all.concat(years),
      queryKey: "year",
      value: searchParams.get("year") || "",
    },
    {
      icon: <FaSort />,
      label: `Sắp xếp`,
      items: sorts,
      queryKey: "sort_field",
      value: searchParams.get("sort_field") || "",
    },
  ];
}
export function makeMangaFilter({
  categoriesData,
  searchParams,
}: {
  categoriesData: MangaDetailCategory[];
  searchParams: URLSearchParams;
}) {
  const categories: SelectType[] = categoriesData.map((item) => ({
    label: item.name.toString(),
    value: item.slug.toString(),
  }));

  const status: SelectType[] = [
    { label: "Đang tiến hành", value: "ongoing" },
    { label: "Hoàn thành", value: "completed" },
    { label: "Trailer/Sắp ra mắt", value: "trailer" },
  ];

  const sorts: SelectType[] = [
    {
      label: `Ngày cập nhật`,
      value: "updatedAt",
    },
    {
      label: `Năm phát hành`,
      value: "year",
    },
    {
      label: `Lượt xem`,
      value: "view",
    },
  ];

  const list: SelectType[] = [
    { label: `Truyện mới`, value: `truyen-moi` },
    { label: `Sắp ra mắt`, value: `sap-ra-mat` },
    { label: `Đang phát hành`, value: `dang-phat-hanh` },
    { label: `Hoàn thành`, value: `hoan-thanh` },
  ];

  const all = [{ label: "Tất cả", value: "" }];

  return [
    {
      icon: <BiSolidCategoryAlt />,
      label: `Danh sách`,
      items: all.concat(list),
      queryKey: "danh-sach",
      value: searchParams.get("danh-sach") || "",
    },
    {
      icon: <BiSolidCategoryAlt />,
      label: `Thể loại`,
      items: all.concat(categories),
      queryKey: "category",
      value: searchParams.get("category") || "",
    },
    {
      icon: <HiStatusOnline />,
      label: `Trạng thái`,
      items: all.concat(status),
      queryKey: "status",
      value: searchParams.get("status") || "",
    },
    {
      icon: <FaSort />,
      label: `Sắp xếp`,
      items: sorts,
      queryKey: "sort_field",
      value: searchParams.get("sort_field") || "",
    },
  ];
}
