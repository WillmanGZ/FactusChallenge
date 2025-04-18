import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuIconComponent } from '@icons/menu-icon.component';
import { BartChartComponent } from '@icons/bar-chart-icon.component';
import { FilePlusComponent } from '@icons/file-plus-icon.component';

@Component({
  selector: 'app-main-sidebar',
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MenuIconComponent,
    BartChartComponent,
    FilePlusComponent,
  ],
  templateUrl: './main-sidebar.component.html',
})
export class MainSidebarComponent {
  isSidebarOpen = signal(false);

  toggleSidebar() {
    this.isSidebarOpen.set(!this.isSidebarOpen());
  }
}
