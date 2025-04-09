import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
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
    this.getInvoiceByPage(1).subscribe();
  }

  private generateHeader() {
    const accessToken =
      this.authService.getAuthTokenFromCookies()?.access_token;

    return {
      Authorization: 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
    };
  }

  getInvoiceByPage(page: number): Observable<Invoice[]> {
    const headers = this.generateHeader();

    const currentCache = this.cache();
    if (currentCache.has(page)) {
      const nextPage = page + 1;
      if (!currentCache.has(nextPage)) {
        this.http
          .get<InvoiceResponse>(`${API_URL}/v1/bills?page=${nextPage}`, {
            headers,
          })
          .subscribe({
            next: (nextResponse) => {
              const nextInvoices = nextResponse.data.data;
              const nextUpdatedCache = new Map(this.cache());
              nextUpdatedCache.set(nextPage, nextInvoices);
              this.cache.set(nextUpdatedCache);
            },
            error: (err) => {
              console.warn(`No se pudo cachear la página ${nextPage}`, err);
            },
          });
      }

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

          const nextPage = page + 1;
          if (!updatedCache.has(nextPage)) {
            this.http
              .get<InvoiceResponse>(`${API_URL}/v1/bills?page=${nextPage}`, {
                headers,
              })
              .subscribe({
                next: (nextResponse) => {
                  const nextInvoices = nextResponse.data.data;
                  const nextUpdatedCache = new Map(this.cache());
                  nextUpdatedCache.set(nextPage, nextInvoices);
                  this.cache.set(nextUpdatedCache);
                },
                error: (err) => {
                  console.warn(`No se pudo cachear la página ${nextPage}`, err);
                },
              });
          }

          return invoices;
        }),
        catchError((error) => {
          console.error(`Error al pedir página ${page}:`, error);
          return of([]);
        })
      );
  }

  getInvoiceURL(invoice: Invoice): Observable<string> {
    const invoiceNumber = invoice.number;
    const headers = this.generateHeader();

    return this.http
      .get<WatchInvoice>(`${API_URL}/v1/bills/show/${invoiceNumber}`, {
        headers,
      })
      .pipe(map((response) => response.data.bill.qr));
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

  clearCache() {
    this.cache.set(new Map());
  }
}
