import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BookIdComponent } from './pages/book-id/book-id.component';
import { BookMarkComponent } from './pages/book-mark/book-mark.component';

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
    path: 'book/:id',
    component: BookIdComponent,
  },
  {
    path: 'bookmark',
    component: BookMarkComponent,
  },
];
