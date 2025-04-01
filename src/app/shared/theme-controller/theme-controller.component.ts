import { Component, computed, inject } from '@angular/core';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-theme-controller',
  imports: [],
  templateUrl: './theme-controller.component.html',
})
export class ThemeControllerComponent {
  themeService = inject(ThemeService);
  theme = computed(() => this.themeService.theme);

  changeTheme() {
    if (this.theme() === 'dark') {
      this.themeService.setTheme('light');
    } else {
      this.themeService.setTheme('dark');
    }
  }
}
