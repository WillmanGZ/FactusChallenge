import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuIconComponent } from 'src/app/icons/menu-icon.component';
import { BartChartComponent } from 'src/app/icons/bar-chart-icon.component';
import { FilePlusComponent } from 'src/app/icons/file-plus-icon.component';
import { LogoutIconComponent } from 'src/app/icons/logout-icon.component';
import { AuthService } from '@auth/services/auth.service';
import { ToastService } from '@shared/services/toast.service';

@Component({
  selector: 'app-main-sidebar',
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MenuIconComponent,
    BartChartComponent,
    FilePlusComponent,
    LogoutIconComponent,
  ],
  templateUrl: './main-sidebar.component.html',
})
export class MainSidebarComponent {
  private authService = inject(AuthService);
  private toastService = inject(ToastService);

  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  logOut() {
    this.authService.logOut();
    this.toastService.info(
      'Sesión Cerrada',
      'Has salido de tu cuenta. ¡Gracias por visitarnos!'
    );
  }
}
