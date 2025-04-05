import { Routes } from '@angular/router';
import { authGuard } from '@auth/guards/authGuard.guard';
import { mainRoutes } from '@main/main.routes';

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
    canActivate: [authGuard],
    loadComponent: () =>
      import('@main/layouts/main-layout/main-layout.component').then(
        (m) => m.MainLayoutComponent
      ),
    children: mainRoutes,
  },
  {
    path: '**',
    redirectTo: 'main',
  },
];
