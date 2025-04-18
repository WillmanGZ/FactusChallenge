import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';
import { environment } from '@environments/environment';
import { NumberingRangeResponse } from '@main/models/numbering-ranges.model';
import { map } from 'rxjs';

const API_URL = environment.url_api;

@Injectable({
  providedIn: 'root',
})
export class NewInvoiceService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  getNumberingRanges() {
    const headers = this.generateHeader();

    return this.http
      .get<NumberingRangeResponse>(`${API_URL}/v1/numbering-ranges`, {
        headers: headers,
      })
      .pipe(
        map((response) => {
          return response.data;
        })
      );
  }

  private generateHeader() {
    const accessToken =
      this.authService.getAuthTokenFromCookies()?.access_token;

    return {
      Authorization: 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
    };
  }
}
