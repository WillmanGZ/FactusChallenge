import { Component } from '@angular/core';
import { InvoiceTableComponent } from '@main/components/invoice-table/invoice-table.component';

@Component({
  selector: 'app-dashboard-page',
  imports: [InvoiceTableComponent],
  templateUrl: './dashboard-page.component.html',
})
export class DashboardPageComponent {}
