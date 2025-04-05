import { Component, inject, signal } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
  private authService = inject(AuthService);
  email = signal<string>('');
  password = signal<string>('');

  login(email: string, password: string) {
    this.authService.getTokens(email, password).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
