import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '@environments/environment';
import { AuthToken } from '@auth/models/auth-token.model';
import { Router } from '@angular/router';

const API_URL = environment.url_api + '/oauth/token';
const HEADERS = new HttpHeaders({
  Accept: 'application/json',
});

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private cookies = inject(CookieService);
  private router = inject(Router);

  private refreshIntervalId: ReturnType<typeof setInterval> | null = null;

  constructor() {
    const token = this.getAuthTokenFromCookies();
    if (token != null) {
      this.refreshAccessToken(token);
    }
  }

  isAuthenticated(): boolean {
    const token = this.getAuthTokenFromCookies();
    return !!token;
  }

  refreshAccessToken(authToken: AuthToken) {
    if (this.refreshIntervalId) {
      clearInterval(this.refreshIntervalId);
    }

    this.refreshIntervalId = setInterval(() => {
      this.getAccessToken(authToken).subscribe({
        next: (token) => {
          this.setAuthTokensToCookies(token);
          console.log('Token Renovado');
        },
        error: (err) => {
          this.logOut();
          console.error('Error al renovar el token:', err);
        },
      });
    }, 4.95 * 60 * 1000); // cada 4 min 57 seg
  }

  getTokens(email: string, password: string) {
    const BODY = {
      grant_type: environment.grant_type,
      client_id: environment.client_id,
      client_secret: environment.client_secret,
      username: email,
      password: password,
    };

    return this.http.post<AuthToken>(API_URL, BODY, {
      headers: HEADERS,
    });
  }

  getAccessToken(authToken: AuthToken) {
    const BODY = {
      grant_type: 'refresh_token',
      client_id: environment.client_id,
      client_secret: environment.client_secret,
      refresh_token: authToken.refresh_token,
    };

    return this.http.post<AuthToken>(API_URL, BODY, {
      headers: HEADERS,
    });
  }

  setAuthTokensToCookies(authToken: AuthToken) {
    const stringValue = JSON.stringify(authToken);
    this.cookies.set('AuthToken', stringValue, {
      expires: 1,
      path: '/',
      secure: false, // ! FALSE MIENTRAS TRABAJAMOS EN LOCALHOST
      sameSite: 'Lax',
    });
  }

  getAuthTokenFromCookies(): AuthToken | null {
    const value = this.cookies.get('AuthToken');
    if (!value) return null;

    try {
      return JSON.parse(value) as AuthToken;
    } catch (e) {
      return null;
    }
  }

  deleteAuthTokenFromCookies() {
    this.cookies.delete('AuthToken', '/');
  }

  logOut() {
    if (this.refreshIntervalId) {
      clearInterval(this.refreshIntervalId); // ← importante
      this.refreshIntervalId = null;
    }

    this.deleteAuthTokenFromCookies();
    this.router.navigate(['/login']);
  }
}
