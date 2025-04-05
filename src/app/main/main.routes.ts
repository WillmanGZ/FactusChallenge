import { Routes } from '@angular/router';

export const mainRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('@main/pages/dashboard-page/dashboard-page.component').then(
        (m) => m.DashboardPageComponent
      ),
  },
  {
    path: 'new-invoice',
    loadComponent: () =>
      import('@main/pages/new-invoice-page/new-invoice-page.component').then(
        (m) => m.NewInvoicePageComponent
      ),
  },
];

