import { Component, inject, signal } from '@angular/core';
import { Invoice } from '@main/models/invoice.model';
import { InvoiceService } from '@main/services/invoice.service';
import { CurrencyPipe } from '@angular/common';
import { InvoiceComponent } from '@main/components/invoice/invoice.component';

@Component({
  selector: 'app-invoice-table',
  imports: [CurrencyPipe, InvoiceComponent],
  templateUrl: './invoice-table.component.html',
})
export class InvoiceTableComponent {
  private invoiceService = inject(InvoiceService);
  invoices = signal<Invoice[]>([]);
  currentPage = signal(1);

  ngOnInit(): void {
    this.loadInvoices(1);
  }

  loadInvoices(page: number) {
    this.invoiceService.getInvoiceByPage(page).subscribe((data) => {
      this.invoices.set(data);
      this.currentPage.set(page);
    });
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.loadInvoices(this.currentPage() - 1);
    }
  }

  nextPage() {
    this.loadInvoices(this.currentPage() + 1);
  }

  refreshCache() {
    this.invoiceService.clearCache();
    this.invoiceService.loadInitialPages();
    this.loadInvoices(1);
  }
}
