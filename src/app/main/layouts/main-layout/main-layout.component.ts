import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainSidebarComponent } from '@main/components/mainSidebar/main-sidebar.component';

@Component({
  selector: 'app-main-page',
  imports: [RouterOutlet, MainSidebarComponent],
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {}
