export interface MovieCategory {
  id: string;
  name: string;
  slug: string;
}

export interface MovieCountry {
  id: string;
  name: string;
  slug: string;
}

export interface MovieLastEpisode {
  server_name: string;
  is_ai: boolean;
  name: string;
}

export interface MovieItem {
  _id: string;
  name: string;
  slug: string;
  origin_name: string;
  alternative_names: string[];
  type: "series" | "single" | "hoathinh" | "tvshows";
  thumb_url: string;
  poster_url: string;
  sub_docquyen: boolean;
  chieurap: boolean;
  time: string;
  episode_current: string;
  quality: string;
  lang: string;
  year: number;
  category: MovieCategory[];
  country: MovieCountry[];
  tmdb: {
    type: "tv" | "movie";
    id: string;
    season: number | null;
    vote_average: number;
    vote_count: number;
  };
  imdb: {
    id: string;
    vote_average: number;
    vote_count: number;
  };
  modified: {
    time: string;
  };
  last_episodes: MovieLastEpisode[];
}

export interface OPhimPagination {
  totalItems: number;
  totalItemsPerPage: number;
  currentPage: number;
  pageRanges: number;
}

//
export interface RatingStats {
  id?: string;
  type?: string;
  season?: number;
  vote_average: number;
  vote_count: number;
}

export interface EpisodeData {
  name: string; // Tên tập (Tập 1, 2...)
  slug: string; // Slug tập
  filename: string; // Tên file gốc (nếu có)
  link_embed: string; // Link nhúng iframe player
  link_m3u8: string; // Link stream trực tiếp
}

export interface ServerEpisode {
  server_name: string; // "Vietsub #1", "Lồng Tiếng #1"
  server_data: EpisodeData[];
}

export interface MovieDetailItem {
  _id: string;
  name: string; // Tên tiếng Việt
  origin_name: string; // Tên gốc (Squid Game)
  content: string; // Mô tả nội dung (HTML)
  type: "series" | "single" | "hoathinh" | "tvshows";
  status: "completed" | "ongoing" | "trailer";
  thumb_url: string; // Ảnh dọc
  poster_url: string; // Ảnh ngang (Dùng cho Banner)
  is_copyright: boolean;
  trailer_url: string;
  time: string; // Thời lượng (50 phút / tập)
  episode_current: string; // Hoàn tất (9/9)
  episode_total: string; // 9 Tập
  quality: string; // HD, 4K...
  lang: string; // Vietsub + Lồng Tiếng
  year: number;
  view: number;
  actor: string[];
  director: string[];
  category: { id: string; name: string; slug: string }[];
  country: { id: string; name: string; slug: string }[];
  episodes: ServerEpisode[];
  alternative_names: string[]; // Các tên gọi khác ở quốc gia khác
  tmdb: RatingStats;
  imdb: RatingStats;
  slug: string;
  modified: { time: string };
  created: { time: string };
}

export interface MovieImageItem {
  width: number;
  height: number;
  aspect_ratio: number;
  type: string;
  file_path: string;
}

export interface MoviePeopleItem {
  tmdb_people_id: number;
  adult: false;
  gender: number;
  gender_name: string;
  name: string;
  original_name: string;
  character: string;
  known_for_department: string;
  profile_path: string;
  also_known_as: string[];
}

export interface MovieDetailCategory {
  _id: string;
  name: string;
  slug: string;
}

export interface MovieDetailCountry {
  _id: string;
  name: string;
  slug: string;
}

export interface MovieDetailYear {
  year: number;
}

//
export interface MovieResponse {
  status: "success" | string;
  message?: string;
  data: {
    items:
      | MovieItem[]
      | MovieDetailCategory[]
      | MovieDetailCountry[]
      | MovieDetailYear[];
    item: MovieDetailItem;
    images: MovieImageItem[];
    peoples: MoviePeopleItem[];
    params: {
      pagination: OPhimPagination;
    };
    titlePage: string;
    breadCrumb: {
      name: string;
      slug?: string;
      isCurrent: boolean;
      position: number;
    }[];
  };
}

export type MovieListType =
  | "phim-moi"
  | "phim-bo"
  | "phim-le"
  | "tv-shows"
  | "hoat-hinh"
  | "phim-vietsub"
  | "phim-thuyet-minh"
  | "phim-long-tieng"
  | "phim-bo-dang-chieu"
  | "phim-bo-hoan-thanh"
  | "phim-sap-chieu"
  | "subteam"
  | "phim-chieu-rap";
