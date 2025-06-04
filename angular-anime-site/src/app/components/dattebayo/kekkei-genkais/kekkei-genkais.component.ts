import { Component } from '@angular/core';
import { LoadingComponent } from '../../layout/loading/loading.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { DattebayoApiService } from '@/src/app/services/dattebayo-api.service';
import { IKekkeiGenkai, IQuery, IVillage } from '@/src/app/models/dattebayo';
import { finalize, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-kekkei-genkais',
  imports: [LoadingComponent, CommonModule, RouterModule, NgxPaginationModule],
  templateUrl: './kekkei-genkais.component.html',
  styleUrl: './kekkei-genkais.component.css',
})
export class KekkeiGenkaisComponent {
  constructor(
    private apiService: DattebayoApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  isLoading: boolean = false;
  data: IVillage[] = [];
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
      .getKekkeiGenkais(this.query)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (value) => {
          this.data = value['kekkei-genkai'] as IKekkeiGenkai[];
          this.totalItems = value.total;
        },
        (error) => {
          console.error(error);
        }
      );
  }
}
