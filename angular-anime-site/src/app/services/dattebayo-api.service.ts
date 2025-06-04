import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IAkatsuki,
  ICharacter,
  IClan,
  IKara,
  IKekkeiGenkai,
  IQuery,
  ITailedBeast,
  ITeam,
  IVillage,
  ResponseList,
} from '../models/dattebayo';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DattebayoApiService {
  baseUrl: string = `https://dattebayo-api.onrender.com`;
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
  getCharactersId(id: number): Observable<ICharacter> {
    return this.http.get<ICharacter>(this.baseUrl + `/characters/${id}`);
  }
  // clans
  getClans(params: Partial<IQuery>): Observable<ResponseList<IClan>> {
    return this.http.get<ResponseList<IClan>>(this.baseUrl + `/clans`, {
      params: {
        ...params,
      },
    });
  }
  // villages
  getVillages(params: Partial<IQuery>): Observable<ResponseList<IVillage>> {
    return this.http.get<ResponseList<IVillage>>(this.baseUrl + `/villages`, {
      params: {
        ...params,
      },
    });
  }
  // kekkei-genkai
  getKekkeiGenkais(
    params: Partial<IQuery>
  ): Observable<ResponseList<IKekkeiGenkai>> {
    return this.http.get<ResponseList<IKekkeiGenkai>>(
      this.baseUrl + `/kekkei-genkai`,
      {
        params: {
          ...params,
        },
      }
    );
  }
  // tailed-beasts
  getTailedBeasts(
    params: Partial<IQuery>
  ): Observable<ResponseList<ITailedBeast>> {
    return this.http.get<ResponseList<ITailedBeast>>(
      this.baseUrl + `/tailed-beasts`,
      {
        params: {
          ...params,
        },
      }
    );
  } // teams
  getTeams(params: Partial<IQuery>): Observable<ResponseList<ITeam>> {
    return this.http.get<ResponseList<ITeam>>(this.baseUrl + `/teams`, {
      params: {
        ...params,
      },
    });
  }
  // akatsuki
  getAkatsuki(params: Partial<IQuery>): Observable<ResponseList<IAkatsuki>> {
    return this.http.get<ResponseList<IAkatsuki>>(this.baseUrl + `/akatsuki`, {
      params: {
        ...params,
      },
    });
  }
  // kara
  getKara(params: Partial<IQuery>): Observable<ResponseList<IKara>> {
    return this.http.get<ResponseList<IKara>>(this.baseUrl + `/kara`, {
      params: {
        ...params,
      },
    });
  }
}
