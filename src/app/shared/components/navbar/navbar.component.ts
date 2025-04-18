import { Component } from '@angular/core';
import { ThemeControllerComponent } from "@shared/components/theme-controller/theme-controller.component";

@Component({
  selector: 'app-navbar',
  imports: [ThemeControllerComponent],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent { }
