import { Routes } from '@angular/router';
import { DattebayoComponent } from './dattebayo.component';
import { CharactersComponent } from './components/characters/characters.component';
import { CharactersIdComponent } from './components/characters-id/characters-id.component';
import { ClansComponent } from './components/clans/clans.component';
import { KekkeiGenkaisComponent } from './components/kekkei-genkais/kekkei-genkais.component';
import { TailedBeastsComponent } from './components/tailed-beasts/tailed-beasts.component';
import { AkatsukiComponent } from './components/akatsuki/akatsuki.component';
import { KaraComponent } from './components/kara/kara.component';
import { VillagesComponent } from './components/villages/villages.component';
import { TailedBeastsIdComponent } from './components/tailed-beasts-id/tailed-beasts-id.component';

export const dattebayoRoutes: Routes = [
  {
    path: 'dattebayo',
    component: DattebayoComponent,
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
        path: 'clans',
        component: ClansComponent,
      },
      {
        path: 'villages',
        component: VillagesComponent,
      },
      {
        path: 'kekkei-genkais',
        component: KekkeiGenkaisComponent,
      },
      {
        path: 'tailed-beasts',
        component: TailedBeastsComponent,
      },
      {
        path: 'tailed-beasts/:id',
        component: TailedBeastsIdComponent,
      },
      {
        path: 'akatsuki',
        component: AkatsukiComponent,
      },
      {
        path: 'kara',
        component: KaraComponent,
      },
    ],
  },
];
