import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  IKeywordList,
  IMediaDetail,
  IMediaList,
  IVideoList,
} from '../models/media';
import {
  ICredits,
  IMediaCredits,
  IPeopleDetail,
  IPeopleList,
} from '../models/people';
import { IQueryParam, ISearchResult } from '../models/query';
import { environment } from '@/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TmdbApiService {
  baseUrl: string = `https://api.themoviedb.org/3`;
  constructor(private http: HttpClient) {}

  headers = new HttpHeaders({
    Authorization: `Bearer ${environment.tmdb}`,
  });

  params = {
    language: 'vn-VN',
  };

  //
  getSearch(params: IQueryParam) {
    return this.http.get<ISearchResult>(
      this.baseUrl + `/search/${params.type}`,
      {
        headers: this.headers,
        params: {
          ...this.params,
          ...params,
        },
      }
    );
  }
  getVideo(media_type: string, id: string) {
    return this.http.get<IVideoList>(
      this.baseUrl + `/${media_type}/${id}/videos`,
      {
        headers: this.headers,
        params: {
          ...this.params,
        },
      }
    );
  }

  //
  getTrending() {
    return this.http.get<IMediaList>(this.baseUrl + `/trending/all/day`, {
      headers: this.headers,
      params: this.params,
    });
  }

  getTrendingTv() {
    return this.http.get<IMediaList>(this.baseUrl + `/trending/tv/day`, {
      headers: this.headers,
      params: this.params,
    });
  }

  getTrendingPeople() {
    return this.http.get<IPeopleList>(this.baseUrl + `/trending/person/day`, {
      headers: this.headers,
      params: this.params,
    });
  }

  getTrendingMovie() {
    return this.http.get<IMediaList>(this.baseUrl + `/trending/movie/day`, {
      headers: this.headers,
      params: this.params,
    });
  }

  //
  getThumbnail(path: string) {
    return `https://image.tmdb.org/t/p/original` + path;
  }
  getAvatar(path?: string) {
    return path
      ? `https://image.tmdb.org/t/p/original` + path
      : `https://kenh14cdn.com/2017/photo-1-1510670367392.gif`;
  }

  //
  getDetailMedia(media_type: string, id: string) {
    return this.http.get<IMediaDetail>(this.baseUrl + `/${media_type}/${id}`, {
      headers: this.headers,
      params: this.params,
    });
  }
  getMediaCredit(media_type: string, id: string) {
    return this.http.get<ICredits>(
      this.baseUrl + `/${media_type}/${id}/credits`,
      {
        headers: this.headers,
        params: this.params,
      }
    );
  }
  getMediaKeyword(media_type: string, id: string) {
    return this.http.get<IKeywordList>(
      this.baseUrl + `/${media_type}/${id}/keywords`,
      {
        headers: this.headers,
        params: this.params,
      }
    );
  }
  getMediaRecommendations(media_type: string, id: string) {
    return this.http.get<IMediaList>(
      this.baseUrl + `/${media_type}/${id}/recommendations`,
      {
        headers: this.headers,
        params: this.params,
      }
    );
  }

  //
  getDetailPeople(id: string) {
    return this.http.get<IPeopleDetail>(this.baseUrl + `/person/${id}`, {
      headers: this.headers,
      params: this.params,
    });
  }
  getMovieCreditsPeople(id: string) {
    return this.http.get<IMediaCredits>(
      this.baseUrl + `/person/${id}/movie_credits`,
      {
        headers: this.headers,
        params: { ...this.params, limit: 10 },
      }
    );
  }
  getTVCreditsPeople(id: string) {
    return this.http.get<IMediaCredits>(
      this.baseUrl + `/person/${id}/tv_credits`,
      {
        headers: this.headers,
        params: { ...this.params, limit: 10 },
      }
    );
  }
}
