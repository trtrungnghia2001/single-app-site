import { ICharacter, ICharacterTable } from '@/src/app/dattebayo/models';
import { DattebayoApiService } from '@/src/app/dattebayo/services/dattebayo-api.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { finalize, Subject, takeUntil } from 'rxjs';
import { LoadingComponent } from '@/src/app/components/layout/loading/loading.component';

@Component({
  selector: 'app-characters-id',
  imports: [LoadingComponent, CommonModule, RouterModule],
  templateUrl: './characters-id.component.html',
  styleUrl: './characters-id.component.css',
})
export class CharactersIdComponent {
  constructor(
    private apiService: DattebayoApiService,
    private router: ActivatedRoute
  ) {}

  private destroy$ = new Subject<void>();
  isLoading: boolean = false;
  data!: ICharacter;
  customTable: ICharacterTable[] = [];

  ngOnInit(): void {
    this.router.paramMap.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      const id = Number(value.get('id'));
      if (id) {
        this.loadData(id);
      }
    });
  }
  isObject(val: any): boolean {
    return typeof val === 'object' && val !== null && !Array.isArray(val);
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

          this.customTable = [
            {
              title: 'Personal',
              items: this.data.personal
                ? Object.entries(this.data.personal)
                    .filter((item) => item[0] !== 'titles')
                    ?.map(([key, value]) => {
                      let valueItem;
                      if (this.isObject(value)) {
                        valueItem = Object.entries(value)
                          .map((item) => item[0] + ': ' + item[1])
                          .toString();
                      } else if (Array.isArray(value)) {
                        valueItem = value.toString();
                      } else {
                        valueItem = value;
                      }

                      return {
                        key,
                        value: valueItem.toString(),
                      };
                    })
                : [],
            },
            {
              title: 'Debut',
              items: this.data.debut
                ? Object.entries(this.data.debut).map(([key, value]) => ({
                    key,
                    value,
                  }))
                : [],
            },
            {
              title: 'Family',
              items: this.data.family
                ? Object.entries(this.data.family).map(([key, value]) => ({
                    key,
                    value,
                  }))
                : [],
            },
            {
              title: 'Rank',
              items: this.data.rank?.ninjaRank
                ? Object.entries(this.data.rank.ninjaRank).map(
                    ([key, value]) => ({
                      key,
                      value,
                    })
                  )
                : [],
            },
            {
              title: 'Voice Actors',
              items: this.data.voiceActors
                ? Object.entries(this.data.voiceActors).map(([key, value]) => ({
                    key,
                    value: value.toString(),
                  }))
                : [],
            },
            {
              title: 'Other',
              items: [
                {
                  key: `Type`,
                  value: this.data.natureType?.toString(),
                },
                {
                  key: `Tools`,
                  value: this.data.tools?.toString(),
                },
                {
                  key: `Jutsu`,
                  value: this.data.jutsu?.toString(),
                },
              ],
            },
          ];
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

  // img
  indexImg: number = 0;
  img_parts: string[] = [`Part I`, `Part II`];
  changeIndexImg(idx: number) {
    this.indexImg = idx;
  }
}
