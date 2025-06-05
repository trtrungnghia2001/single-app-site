import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { finalize, Subject, takeUntil } from 'rxjs';
import { LoadingComponent } from '@/src/app/components/layout/loading/loading.component';
import { ICharacterDetail } from '../../models';
import { DragonballApiService } from '../../services/dragonball-api.service';
import { CharactersCardComponent } from '../characters-card/characters-card.component';

@Component({
  selector: 'app-characters-id',
  standalone: true,
  imports: [
    LoadingComponent,
    CommonModule,
    RouterModule,
    CharactersCardComponent,
  ],
  templateUrl: './characters-id.component.html',
  styleUrl: './characters-id.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CharactersIdComponent {
  constructor(
    private apiService: DragonballApiService,
    private router: ActivatedRoute
  ) {}

  private destroy$ = new Subject<void>();
  isLoading: boolean = false;
  data!: ICharacterDetail;
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
  };

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
      .getCharactersId(id)
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
