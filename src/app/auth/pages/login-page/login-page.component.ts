import { Component } from '@angular/core';
import { LoginFormComponent } from '@auth/components/login-form/login-form.component';

@Component({
  selector: 'app-login-page',
  imports: [LoginFormComponent],
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {}
