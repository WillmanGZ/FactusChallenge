import { Component, inject, signal } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';
import { ToastService } from '@shared/services/toast.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
  private authService = inject(AuthService);
  private toastService = inject(ToastService);

  email = signal<string>('');
  password = signal<string>('');

  login(email: string, password: string) {
    this.authService.getTokens(email.trim(), password.trim()).subscribe(
      (response) => {
        this.toastService.success(
          'Has accedido correctamente',
          'Inicio de sesión exitoso'
        );
      },
      (error) => {
        const statusCode = error.status;
        let message = 'Ha ocurrido un error inesperado';

        switch (statusCode) {
          case 401:
            message = 'Usuario o contraseña incorrectos';
            break;
          case 400:
            message = 'Usuario o contraseña incorrectos';
            break;
          case 404:
            message = 'El usuario no existe';
            break;
          default:
            message = error.error?.message || message;
            break;
        }

        this.toastService.error(message, '');
      }
    );
  }
}
