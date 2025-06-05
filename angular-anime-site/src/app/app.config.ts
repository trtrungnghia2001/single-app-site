import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'project-anime-47aea',
        appId: '1:312712497727:web:bc6f27497fe9e5b721868a',
        storageBucket: 'project-anime-47aea.firebasestorage.app',
        apiKey: 'AIzaSyBkqeagYSh0WHJWKaABSucC8Us6zwb534M',
        authDomain: 'project-anime-47aea.firebaseapp.com',
        messagingSenderId: '312712497727',
        measurementId: 'G-X1QFS4GHSD',
      })
    ),
    provideAuth(() => getAuth()),
  ],
};
