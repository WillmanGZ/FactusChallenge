import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewInvoiceService } from '@main/services/new-invoice.service';
import {
  documents_types,
  payment_form,
  payment_methods,
} from '@main/static/new-invoice.info';
import { ToastService } from '@shared/services/toast.service';
@Component({
  selector: 'app-general-details',
  imports: [FormsModule],
  templateUrl: './general-details.component.html',
})
export class GeneralDetailsComponent {
  private newInvoiceService = inject(NewInvoiceService);
  private toastService = inject(ToastService);

  document_types = documents_types;
  payment_forms = payment_form;
  payment_methods = payment_methods;

  document = signal('01');
  numbering_range_id = signal(8);
  reference_code = signal('');
  observation = signal('');
  payment_form_code = signal(1);
  payment_method_code = signal(10);

  numberingRanges = computed(() => this.newInvoiceService.numberingRanges());

  validations() {
    if (this.reference_code().length < 4) {
      this.toastService.error(
        'Error',
        'Debes digitar un codigo de referencia 5-15 digitos'
      );
      return false;
    }

    return true;
  }
}
