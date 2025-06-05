import { Routes } from '@angular/router';
import { dattebayoRoutes } from './dattebayo/routing.module';
import { dragonballRoutes } from './dragonball/routing.module';

export const routes: Routes = [...dattebayoRoutes, ...dragonballRoutes];
