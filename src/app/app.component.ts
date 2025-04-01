import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeControllerComponent } from './shared/theme-controller/theme-controller.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ThemeControllerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
