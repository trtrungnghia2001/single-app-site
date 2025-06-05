import { Component } from '@angular/core';
import { finalize, Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoadingComponent } from '@/src/app/components/layout/loading/loading.component';
import { DragonballApiService } from '../../services/dragonball-api.service';
import { ICharacter, IQuery } from '../../models';
import { CharactersCardComponent } from '../characters-card/characters-card.component';

@Component({
  selector: 'app-characters',
  imports: [
    LoadingComponent,
    CommonModule,
    RouterModule,
    NgxPaginationModule,
    CharactersCardComponent,
  ],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.css',
})
export class CharactersComponent {
  constructor(
    private apiService: DragonballApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  isLoading: boolean = false;
  data: ICharacter[] = [];
  totalItems: number = 0;
  private destroy$ = new Subject<void>();

  query: Partial<IQuery> = {
    limit: 20,
    page: 1,
    name: '',
  };
  onPageChange(page: number) {
    this.query.page = page;
    this.router.navigate([], {
      queryParams: this.query,
      queryParamsHandling: 'merge',
    });
  }

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        this.query.page = Number(params.get('page')) || 1;
        this.loadData();
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadData() {
    this.isLoading = true;
    this.apiService
      .getCharacters(this.query)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (value) => {
          this.data = value.items;
          this.totalItems = value.meta.totalItems;
        },
        (error) => {
          console.error(error);
        }
      );
  }
}
