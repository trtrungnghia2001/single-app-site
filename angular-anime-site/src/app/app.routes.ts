import { Routes } from '@angular/router';
import { CharactersComponent } from './components/dattebayo/characters/characters.component';
import { ClansComponent } from './components/dattebayo/clans/clans.component';
import { VillagesComponent } from './components/dattebayo/villages/villages.component';
import { CharactersIdComponent } from './components/dattebayo/characters-id/characters-id.component';
import { KekkeiGenkaisComponent } from './components/dattebayo/kekkei-genkais/kekkei-genkais.component';
import { TailedBeastsComponent } from './components/dattebayo/tailed-beasts/tailed-beasts.component';
import { AkatsukiComponent } from './components/dattebayo/akatsuki/akatsuki.component';
import { KaraComponent } from './components/dattebayo/kara/kara.component';
import { TailedBeastsIdComponent } from './components/dattebayo/tailed-beasts-id/tailed-beasts-id.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'characters',
    pathMatch: 'full',
  },
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
];
