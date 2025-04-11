import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewInvoiceService } from '@main/services/new-invoice.service';
import {
  documents_types,
  payment_form,
  payment_methods,
} from '@main/static/new-invoice.info';
@Component({
  selector: 'app-general-details',
  imports: [FormsModule],
  templateUrl: './general-details.component.html',
})
export class GeneralDetailsComponent {
  private newInvoiceService = inject(NewInvoiceService);

  document_types = documents_types;
  payment_forms = payment_form;
  payment_methods = payment_methods;

  document = signal('01');
  numbering_range_id = signal(8);
  reference_code = signal(0);
  observation = signal('');
  payment_form_code = signal(1);
  payment_method_code = signal(10);

  numberingRanges = computed(() => this.newInvoiceService.numberingRanges());
}
