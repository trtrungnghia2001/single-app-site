import { Routes } from '@angular/router';
import { DragonballComponent } from './dragonball.component';
import { CharactersComponent } from './components/characters/characters.component';
import { CharactersIdComponent } from './components/characters-id/characters-id.component';
import { PlanetsComponent } from './components/planets/planets.component';
import { PlanetsIdComponent } from './components/planets-id/planets-id.component';

export const dragonballRoutes: Routes = [
  {
    path: 'dragonball',
    component: DragonballComponent,
    children: [
      {
        path: 'characters',
        component: CharactersComponent,
      },
      {
        path: 'characters/:id',
        component: CharactersIdComponent,
      },
      {
        path: 'planets',
        component: PlanetsComponent,
      },
      {
        path: 'planets/:id',
        component: PlanetsIdComponent,
      },
    ],
  },
];
