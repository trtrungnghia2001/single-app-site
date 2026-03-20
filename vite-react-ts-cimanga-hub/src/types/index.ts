export * from "./ophim";
export * from "./otruyen";

export type MediaType = "movie" | "manga" | "data-book" | "anime";

export type PaginationType = {
  totalItems: number;
  limit: number;
  currentPage: number;
  totalPages: number;
};

export type SelectType = {
  label: string;
  value: string;
};

export interface CommentResponse {
  id: number;
  content: string;
  created_at: string;
  slug: string;
  type: MediaType;
  profiles: Profile | null;
}

export interface Profile {
  id: string;
  username: string | null;
  avatar_url: string | null;
  email: string | null;
  updated_at: string;
}
