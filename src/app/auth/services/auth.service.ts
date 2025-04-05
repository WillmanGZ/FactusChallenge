import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '@environments/environment';
import { AuthToken } from '@auth/models/auth-token.model';

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

  isAuthenticated(): boolean {
    const token = this.getAuthTokenFromCookies();
    return !!token;
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
}
