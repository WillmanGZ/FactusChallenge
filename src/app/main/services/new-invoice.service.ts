import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';
import { environment } from '@environments/environment';
import {
  MunicipalitiesResponse,
  Municipality,
} from '../models/municipalities.model';
import { Country, CountryResponse } from '@main/models/countries.model';

const API_URL = environment.url_api;

@Injectable({
  providedIn: 'root',
})
export class NewInvoiceService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  countries = signal<Country[]>([]);
  municipalities = signal<Municipality[]>([]);

  constructor() {
    this.getCountries();
    this.getMunicipalies();
  }

  private generateHeader() {
    const accessToken =
      this.authService.getAuthTokenFromCookies()?.access_token;

    return {
      Authorization: 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
    };
  }

  private getCountries() {
    const headers = this.generateHeader();

    this.http
      .get<CountryResponse>(`${API_URL}/v1/countries`, {
        headers,
      })
      .subscribe({
        next: (response) => {
          this.countries.set(response.data);
        },
        error: (err) => {
          console.warn('No se pudieron obtener los municipios', err);
        },
      });
  }

  private getMunicipalies() {
    const headers = this.generateHeader();

    this.http
      .get<MunicipalitiesResponse>(`${API_URL}/v1/municipalities`, {
        headers,
      })
      .subscribe({
        next: (response) => {
          this.municipalities.set(response.data);
        },
        error: (err) => {
          console.warn('No se pudieron obtener los municipios', err);
        },
      });
  }
}
