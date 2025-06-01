export interface IBook {
  author_key: string[];
  author_name: string[];
  cover_edition_key: string;
  cover_i: number;
  ebook_access: string;
  edition_count: number;
  first_publish_year: number;
  has_fulltext: boolean;
  ia: string[];
  ia_collection_s: string;
  key: string;
  language: string[];
  lending_edition_s: string;
  lending_identifier_s: string;
  public_scan_b: boolean;
  title: string;
}
export interface ISearchBook {
  docs: IBook[];
  numFound: number;
}
export interface IBookDetail {
  description?: {
    type: string;
    value: string;
  };
  links: {
    title: string;
    url: string;
    type: {
      key: string;
    };
  }[];
  title: string;
  covers: number[];
  subject_places: string[];
  first_publish_date: string;
  subject_people: string[];
  key: string;
  authors: {
    author: {
      key: string;
    };
    type: {
      key: string;
    };
  }[];
  excerpts: {
    pages?: string;
    excerpt: string;
    author: {
      key: string;
    };
    comment?: string;
  }[];
  subjects: string[];
  type: {
    key: string;
  };
  subject_times: string[];
  cover_edition: {
    key: string;
  };
  latest_revision: number;
  revision: number;
  created: {
    type: string;
    value: string;
  };
  last_modified: {
    type: string;
    value: string;
  };
}
export type CoverSize = 'S' | 'M' | 'L';
