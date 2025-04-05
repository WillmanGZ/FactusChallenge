import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toastr = inject(ToastrService);

  success(message: string, title: string) {
    this.toastr.success(message, title);
  }

  error(title: string, message: string) {
    this.toastr.error(message, title);
  }

  info(title: string, message: string) {
    this.toastr.info(message, title);
  }

  warning(title: string, message: string) {
    this.toastr.warning(message, title);
  }
}
