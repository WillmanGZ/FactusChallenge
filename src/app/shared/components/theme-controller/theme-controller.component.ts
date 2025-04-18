import { Component, computed, inject } from '@angular/core';
import { ThemeService } from '@shared/services/theme.service';
import { SunIconComponent } from "@icons/sun-icon.component";
import { MoonIconComponent } from "@icons/moon-icon.component";

@Component({
  selector: 'app-theme-controller',
  imports: [SunIconComponent, MoonIconComponent],
  templateUrl: './theme-controller.component.html',
})
export class ThemeControllerComponent {
  private readonly themeService = inject(ThemeService);
  readonly theme = computed(() => this.themeService.theme());

  changeTheme() {
    if (this.theme() === 'dark') {
      this.themeService.setTheme('light');
    } else {
      this.themeService.setTheme('dark');
    }
  }
}
