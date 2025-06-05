import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ICharacter,
  ICharacterDetail,
  IPlanet,
  IPlanetDetail,
  IQuery,
  ResponseList,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class DragonballApiService {
  baseUrl: string = `https://dragonball-api.com/api`;
  constructor(private http: HttpClient) {}
  // characters
  getCharacters(params: Partial<IQuery>): Observable<ResponseList<ICharacter>> {
    return this.http.get<ResponseList<ICharacter>>(
      this.baseUrl + `/characters`,
      {
        params: {
          ...params,
        },
      }
    );
  }
  getCharactersId(id: number): Observable<ICharacterDetail> {
    return this.http.get<ICharacterDetail>(this.baseUrl + `/characters/${id}`);
  }
  // planets
  getPlanets(params: Partial<IQuery>): Observable<ResponseList<IPlanet>> {
    return this.http.get<ResponseList<IPlanet>>(this.baseUrl + `/planets`, {
      params: {
        ...params,
      },
    });
  }
  getPlanetsId(id: number): Observable<IPlanetDetail> {
    return this.http.get<IPlanetDetail>(this.baseUrl + `/planets/${id}`);
  }
}
