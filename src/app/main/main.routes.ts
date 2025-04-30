import { Routes } from '@angular/router';

export const mainRoutes: Routes = [
  {
    path: '',
    redirectTo: 'invoice-history',
    pathMatch: 'full',
  },
  {
    path: 'invoice-history',
    loadComponent: () =>
      import(
        '@main/pages/invoice-history-page/invoice-history-page.component'
      ).then((m) => m.InvoiceHistoryPageComponent),
  },
  {
    path: 'new-invoice',
    loadComponent: () =>
      import('@main/pages/new-invoice-page/new-invoice-page.component').then(
        (m) => m.NewInvoicePageComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'invoice-history',
  },
];
