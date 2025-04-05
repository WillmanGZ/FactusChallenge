import { Routes } from '@angular/router';
import { authGuard } from '@auth/guards/authGuard.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('@auth/pages/login-page/login-page.component').then(
        (m) => m.LoginPageComponent
      ),
  },
  {
    path: 'main',
    loadComponent: () =>
      import('./main/pages/main-page/main-page.component').then(
        (m) => m.MainPageComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: 'main',
  },
];
