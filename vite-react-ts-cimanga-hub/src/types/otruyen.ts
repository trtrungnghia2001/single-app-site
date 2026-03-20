export interface MangaCategory {
  id: string;
  name: string;
  slug: string;
}

export interface MangaChapterLatest {
  filename: string;
  chapter_name: string;
  chapter_title: string;
  chapter_api_data: string;
}

export interface MangaItem {
  _id: string;
  name: string;
  slug: string;
  origin_name: string[];
  status: "ongoing" | "coming_soon" | "completed";
  thumb_url: string;
  sub_docquyen: boolean;
  category: MangaCategory[];
  updatedAt: string;
  chaptersLatest: MangaChapterLatest[];
}

export interface MangaPagination {
  totalItems: number;
  totalItemsPerPage: number;
  currentPage: number;
  pageRanges: number;
}

//
export interface MangaServerData {
  filename: string;
  chapter_name: string;
  chapter_title: string;
  chapter_api_data: string;
}

export interface MangaChapter {
  server_name: string;
  server_data: MangaServerData[];
}

export interface MangaDetailItem {
  _id: string;
  name: string;
  slug: string;
  origin_name: string[];
  content: string; // Nội dung mô tả truyện (có chứa HTML)
  status: "ongoing" | "completed" | string;
  thumb_url: string;
  sub_docquyen: boolean;
  author: string[];
  category: {
    id: string;
    name: string;
    slug: string;
  }[];
  chapters: MangaChapter[]; // Danh sách các server và chương phim
  updatedAt: string;
}

export interface MangaDetailCategory {
  id: string;
  name: string;
  slug: string;
}

//

export interface MangaChapterResponse {
  status: string;
  message: string;
  data: {
    domain_cdn: string;
    item: {
      _id: string;
      comic_name: string;
      chapter_name: string;
      chapter_title: string;
      chapter_path: string;
      chapter_image: {
        image_page: number;
        image_file: string;
      }[];
    };
  };
}

//
export interface MangaResponse {
  status: string;
  message: string;
  data: {
    items: MangaItem[] | MangaDetailCategory[];
    item: MangaDetailItem;
    APP_DOMAIN_CDN_IMAGE: string;
    params: {
      pagination: MangaPagination;
    };
  };
}

export type MangaListType =
  | "truyen-moi"
  | "sap-ra-mat"
  | "dang-phat-hanh"
  | "hoan-thanh";
