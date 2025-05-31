import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BookIdComponent } from './pages/book-id/book-id.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
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
];
