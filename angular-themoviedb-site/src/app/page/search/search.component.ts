import { TmdbApiService } from '@/app/services/tmdb-api.service';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BehaviorSubject,
  Subject,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs';
import { PeopleCardComponent } from '../../components/people-card/people-card.component';
import { MediaCardComponent } from '../../components/media-card/media-card.component';
import { FormsModule } from '@angular/forms';
import { IQueryParam, ISearchResult } from '@/app/models/query';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-search',
  imports: [
    CommonModule,
    PeopleCardComponent,
    MediaCardComponent,
    FormsModule,
    NgxPaginationModule,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  tmdbApi = inject(TmdbApiService);
  isLoading: boolean = false;
  destroy$ = new Subject<void>();
  data!: ISearchResult;

  type_list = [
    {
      title: 'Movies',
      path: 'movie',
    },
    {
      title: 'TV Shows',
      path: 'tv',
    },
    {
      title: 'Person',
      path: 'person',
    },
    // {
    //   title: 'Keywords',
    //   path: 'keyword',
    // },
    // {
    //   title: 'Collections',
    //   path: 'collection',
    // },
    // {
    //   title: 'Companies',
    //   path: 'company',
    // },
  ];

  searchValue: string = '';
  onPageChange(pageNumber: number) {
    this.setQueryParam({ page: pageNumber.toString() });
  }
  onSearchChange() {
    this.setQueryParam({ page: '1', query: this.searchValue });
  }

  //
  queryParam = new BehaviorSubject<IQueryParam>({
    query: '',
    type: 'movie',
    page: '1',
  });
  setQueryParam(value: Partial<IQueryParam>) {
    const val = this.queryParam.getValue();
    this.queryParam.next({ ...val, ...value });

    this.router.navigate([], {
      queryParams: this.queryParam.value,
    });
  }
  getQueryParam(key: keyof IQueryParam) {
    return this.queryParam.value[key];
  }

  //
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParamMap.pipe(take(1)).subscribe((queryParam) => {
      const query = queryParam.get('query');
      const type = queryParam.get('type');
      const page = queryParam.get('page');

      if (query && type) {
        this.setQueryParam({
          query,
          type,
          page: page as string,
        });
        this.searchValue = query;
      }
    });
    this.queryParam
      .pipe(
        tap(() => {
          this.isLoading = true;
        }),
        takeUntil(this.destroy$),
        switchMap((params) => {
          return this.tmdbApi.getSearch(params);
        })
      )
      .subscribe((value) => {
        this.isLoading = false;
        this.data = value;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.queryParam.unsubscribe();
  }
}
