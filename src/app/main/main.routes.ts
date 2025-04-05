// main.routes.ts
import { Routes } from '@angular/router';
import { MainPageComponent } from '@main/layouts/main-page/main-page.component';

export const mainRoutes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
        children: [
          {
            path: 'dashboard',
            loadComponent: () =>
              import(
                '@main/pages/dashboard-page/dashboard-page.component'
              ).then((m) => m.DashboardPageComponent),
          },
          {
            path: 'new-invoice',
            loadComponent: () =>
              import(
                '@main/pages/new-invoice-page/new-invoice-page.component'
              ).then((m) => m.NewInvoicePageComponent),
          },
        ],
      },
    ],
  },
];
