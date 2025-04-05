import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-page',
  imports: [RouterOutlet],
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {
  private router = inject(Router);

  dashboard() {
    this.router.navigate(['/main/dashboard']);
  }

  newInvoice() {
    this.router.navigate(['/main/new-invoice']);
  }
}
