import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';
import { environment } from '@environments/environment';
import { Invoice, InvoiceResponse } from '@main/models/invoice.model';
import { AuthService } from '@auth/services/auth.service';

const API_URL = environment.url_api;

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  private cache = signal(new Map<number, Invoice[]>());

  getInvoiceByPage(page: number): Observable<Invoice[]> {
    const accessToken =
      this.authService.getAuthTokenFromCookies()?.access_token;

    const headers = {
      Authorization: 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
    };

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
          return of([]); // Devuelve array vacío si hay error
        })
      );
  }

  getInvoicesByPageRange(startPage: number, endPage: number) {
    const requests = [];

    for (let i = startPage; i <= endPage; i++) {
      requests.push(this.getInvoiceByPage(i));
    }

    return forkJoin(requests).pipe(
      map((arrays) => arrays.flat()) // Junta todas las páginas en un solo array
    );
  }

  clearCache() {
    this.cache.set(new Map());
  }
}
