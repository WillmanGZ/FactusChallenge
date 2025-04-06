import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';
import { environment } from '@environments/environment';
import {
  Invoice,
  InvoiceResponse,
  PDFInvoiceResponse,
  WatchInvoice,
  XMLInvoiceResponse,
} from '@main/models/invoice.model';
import { AuthService } from '@auth/services/auth.service';

const API_URL = environment.url_api;

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  private cache = signal(new Map<number, Invoice[]>());

  constructor() {
    this.loadInitialPages();
  }

  loadInitialPages(): void {
    for (let page = 1; page <= 10; page++) {
      this.getInvoiceByPage(page).subscribe();
    }
  }

  getInvoiceByPage(page: number): Observable<Invoice[]> {
    const headers = this.generateHeader();

    const currentCache = this.cache();
    if (currentCache.has(page)) {
      return of(currentCache.get(page)!);
    }

    return this.http
      .get<InvoiceResponse>(`${API_URL}/v1/bills?page=${page}`, { headers })
      .pipe(
        map((response) => {
          const invoices = response.data.data;
          const updatedCache = new Map(this.cache());
          updatedCache.set(page, invoices);
          this.cache.set(updatedCache);
          return invoices;
        }),
        catchError((error) => {
          console.error(`Error al pedir página ${page}:`, error);
          return of([]);
        })
      );
  }

  getInvoicesByPageRange(
    startPage: number,
    endPage: number
  ): Observable<Invoice[]> {
    const requests = [];

    for (let i = startPage; i <= endPage; i++) {
      requests.push(this.getInvoiceByPage(i));
    }

    return forkJoin(requests).pipe(map((arrays) => arrays.flat()));
  }

  generateHeader() {
    const accessToken =
      this.authService.getAuthTokenFromCookies()?.access_token;

    return {
      Authorization: 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
    };
  }

  clearCache() {
    this.cache.set(new Map());
  }

  getInvoiceURL(invoice: Invoice): Observable<string> {
    const invoiceNumber = invoice.number;
    const headers = this.generateHeader();

    return this.http
      .get<WatchInvoice>(`${API_URL}/v1/bills/show/${invoiceNumber}`, {
        headers,
      })
      .pipe(
        map((response) => response.data.bill.qr)
      );
  }

  getInvoicePDF(invoice: Invoice) {
    const invoiceNumber = invoice.number;
    const headers = this.generateHeader();

    return this.http
      .get<PDFInvoiceResponse>(
        `${API_URL}/v1/bills/download-pdf/${invoiceNumber}`,
        {
          headers,
        }
      )
      .pipe(map((response) => response.data));
  }

  getInvoiceXML(invoice: Invoice) {
    const invoiceNumber = invoice.number;
    const headers = this.generateHeader();

    return this.http
      .get<XMLInvoiceResponse>(
        `${API_URL}/v1/bills/download-xml/${invoiceNumber}`,
        {
          headers,
        }
      )
      .pipe(map((response) => response.data));
  }
}
