import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { ToastService } from '@shared/services/toast.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastService = inject(ToastService);

  email = signal<string>('');
  password = signal<string>('');


  login(email: string, password: string) {
    email = email.trim();
    password = password.trim();

    this.authService.getTokens(email, password).subscribe(
      (response) => {
        this.authService.setAuthTokensToCookies(response);
        this.router.navigate(['/main']);
        this.toastService.success('Bienvenido', 'Inicio de sesión exitoso');
      },
      (error) => {
        const statusCode = error.status;
        console.log('Error code: ', statusCode);
        this.toastService.error(
          'Error al iniciar sesión',
          'Credenciales invalidas'
        );
      }
    );
  }
}
