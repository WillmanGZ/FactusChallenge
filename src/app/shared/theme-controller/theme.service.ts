import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
export type Theme = 'dark' | 'light';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);

  theme: Theme;

  constructor() {
    this.theme = this.getTheme() || 'dark';
    this.setTheme(this.theme);
  }

  getTheme(): Theme | null {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      return storedTheme as Theme;
    }
    return null;
  }

  setTheme(theme: Theme) {
    this.theme = theme;
    this.document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    console.log(`Tema: ${theme}`);
  }
}
