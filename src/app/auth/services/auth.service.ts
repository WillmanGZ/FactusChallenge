import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@environments/environment';
import { AuthTokenResponse } from '@auth/models/auth-token-response.model';

const API_URL = environment.url_api + '/oauth/token';
const HEADERS = new HttpHeaders({
  Accept: 'application/json',
});

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  getTokens(email: string, password: string) {
    const BODY = {
      grant_type: environment.grant_type,
      client_id: environment.client_id,
      client_secret: environment.client_secret,
      username: email,
      password: password,
    };

    return this.http.post<AuthTokenResponse>(API_URL, BODY, { headers: HEADERS });
  }
}
