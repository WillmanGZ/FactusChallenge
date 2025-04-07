import { Component, inject, OnInit } from '@angular/core';
import { Invoice } from '@main/models/invoice.model';
import { InvoiceService } from '../../services/invoice.service';
import { CurrencyPipe } from '@angular/common';
import { InvoiceComponent } from "../../components/invoice/invoice.component";

@Component({
  selector: 'app-invoice-table',
  imports: [CurrencyPipe, InvoiceComponent],
  templateUrl: './invoice-table.component.html',
})
export class InvoiceTableComponent {
  private invoiceService = inject(InvoiceService);
  invoices: Invoice[] = [];
  currentPage = 1;

  ngOnInit(): void {
    this.loadInvoices(1);
  }

  loadInvoices(page: number) {
    this.invoiceService.getInvoiceByPage(page).subscribe((data) => {
      this.invoices = data;
      this.currentPage = page;
    });
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.loadInvoices(this.currentPage - 1);
    }
  }

  nextPage() {
    this.loadInvoices(this.currentPage + 1);
  }

  refreshCache() {
    this.invoiceService.clearCache();
    this.invoiceService.loadInitialPages();
    this.loadInvoices(1);
  }
 }
