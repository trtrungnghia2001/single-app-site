import { Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { MediaIdComponent } from './page/media-id/media-id.component';
import { PeopleIdComponent } from './page/people-id/people-id.component';
import { SearchComponent } from './page/search/search.component';
import { LoginComponent } from './page/login/login.component';
import { RegisterComponent } from './page/register/register.component';
import { FavoriteComponent } from './page/favorite/favorite.component';
import { BookmarkComponent } from './page/bookmark/bookmark.component';
import { authGuard } from './guards/auth.guard';
import { NotFoundComponent } from './page/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'media/:id',
    component: MediaIdComponent,
  },
  {
    path: 'people/:id',
    component: PeopleIdComponent,
  },
  {
    path: 'search',
    component: SearchComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'favorite',
    component: FavoriteComponent,
    canActivate: [authGuard],
  },
  {
    path: 'bookmark',
    component: BookmarkComponent,
    canActivate: [authGuard],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
