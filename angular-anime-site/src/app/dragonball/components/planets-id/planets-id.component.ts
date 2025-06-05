import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { finalize, Subject, takeUntil } from 'rxjs';
import { LoadingComponent } from '@/src/app/components/layout/loading/loading.component';
import { IPlanetDetail } from '../../models';
import { DragonballApiService } from '../../services/dragonball-api.service';
import { CharactersCardComponent } from '../characters-card/characters-card.component';

@Component({
  selector: 'app-planets-id',
  imports: [
    LoadingComponent,
    CommonModule,
    RouterModule,
    CharactersCardComponent,
  ],
  templateUrl: './planets-id.component.html',
  styleUrl: './planets-id.component.css',
})
export class PlanetsIdComponent {
  constructor(
    private apiService: DragonballApiService,
    private router: ActivatedRoute
  ) {}

  private destroy$ = new Subject<void>();
  isLoading: boolean = false;
  data!: IPlanetDetail;

  ngOnInit(): void {
    this.router.paramMap.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      const id = Number(value.get('id'));
      if (id) {
        this.loadData(id);
      }
    });
  }

  loadData(id: number) {
    this.isLoading = true;
    this.apiService
      .getPlanetsId(id)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (value) => {
          this.data = value;
        },
        (error) => {
          console.error(error);
        }
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
