export interface IQueryParam {
  query: string;
  type: string;
  page: string;
}

export interface ISearchResult {
  total_pages: number;
  total_results: number;
  page: number;
  results: any[];
}
