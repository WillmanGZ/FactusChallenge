import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-main-sidebar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './main-sidebar.component.html',
})
export class MainSidebarComponent {
  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
