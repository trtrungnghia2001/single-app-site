import { IKara, IQuery } from '@/src/app/models/dattebayo';
import { DattebayoApiService } from '@/src/app/services/dattebayo-api.service';
import { Component } from '@angular/core';
import { finalize, Subject, takeUntil } from 'rxjs';
import { LoadingComponent } from '../../layout/loading/loading.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-kara',
  imports: [LoadingComponent, CommonModule, RouterModule, NgxPaginationModule],
  templateUrl: './kara.component.html',
  styleUrl: './kara.component.css',
})
export class KaraComponent {
  constructor(
    private apiService: DattebayoApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  isLoading: boolean = false;
  data: IKara[] = [];
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
      .getKara(this.query)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (value) => {
          this.data = value['kara'] as IKara[];
          this.totalItems = value.total;
        },
        (error) => {
          console.error(error);
        }
      );
  }
}
