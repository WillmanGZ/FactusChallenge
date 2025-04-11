import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';
import { environment } from '@environments/environment';
import {
  MunicipalitiesResponse,
  Municipality,
} from '../models/municipalities.model';
import { Country, CountryResponse } from '@main/models/countries.model';
import {
  UnitMeasure,
  UnitMeasureResponse,
} from '@main/models/unit_measures.model';
import { Tribute, TributesResponse } from '@main/models/tributes.model';
import {
  NumberingRange,
  NumberingRangeResponse,
} from '@main/models/numbering-range.model';

const API_URL = environment.url_api;

@Injectable({
  providedIn: 'root',
})
export class NewInvoiceService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  numberingRanges = signal<NumberingRange[]>([]);

  countries = signal<Country[]>([]);
  municipalities = signal<Municipality[]>([]);

  unitMeasures = signal<UnitMeasure[]>([]);
  tributes = signal<Tribute[]>([]);

  constructor() {
    this.getNumbericRanges();
    this.getCountries();
    this.getMunicipalies();
    this.getUnitMeasures();
    this.getTributes();
  }

  private generateHeader() {
    const accessToken =
      this.authService.getAuthTokenFromCookies()?.access_token;

    return {
      Authorization: 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
    };
  }

  private getNumbericRanges() {
    const headers = this.generateHeader();

    this.http
      .get<NumberingRangeResponse>(`${API_URL}/v1/numbering-ranges`, {
        headers,
      })
      .subscribe({
        next: (response) => {
          this.numberingRanges.set(response.data);
        },
        error: (err) => {
          console.warn('No se pudieron obtener los municipios', err);
        },
      });
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
          console.warn('No se pudieron obtener los rangos numericos', err);
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

  private getUnitMeasures() {
    const headers = this.generateHeader();

    this.http
      .get<UnitMeasureResponse>(`${API_URL}/v1/measurement-units`, {
        headers,
      })
      .subscribe({
        next: (response) => {
          this.unitMeasures.set(response.data);
        },
        error: (err) => {
          console.warn('No se pudieron obtener las unidades de medida', err);
        },
      });
  }

  private getTributes() {
    const headers = this.generateHeader();

    this.http
      .get<TributesResponse>(`${API_URL}/v1/tributes/products`, {
        headers,
      })
      .subscribe({
        next: (response) => {
          this.tributes.set(response.data);
        },
        error: (err) => {
          console.warn('No se pudieron obtener los tributos', err);
        },
      });
  }
}
