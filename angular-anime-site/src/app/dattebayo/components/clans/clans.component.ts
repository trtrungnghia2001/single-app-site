import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { DattebayoApiService } from '@/src/app/dattebayo/services/dattebayo-api.service';
import { IClan, IQuery } from '@/src/app/dattebayo/models';
import { finalize, Subject, takeUntil } from 'rxjs';
import { LoadingComponent } from '@/src/app/components/layout/loading/loading.component';

@Component({
  selector: 'app-clans',
  imports: [LoadingComponent, CommonModule, RouterModule, NgxPaginationModule],
  templateUrl: './clans.component.html',
  styleUrl: './clans.component.css',
})
export class ClansComponent {
  constructor(
    private apiService: DattebayoApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  isLoading: boolean = false;
  data: IClan[] = [];
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
      .getClans(this.query)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (value) => {
          this.data = value['clans'] as IClan[];
          this.totalItems = value.total;
        },
        (error) => {
          console.error(error);
        }
      );
  }
}
