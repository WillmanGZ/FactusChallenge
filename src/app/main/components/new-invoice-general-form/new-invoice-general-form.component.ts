import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NumberingRange } from '@main/models/numbering-ranges.model';
import { NewInvoiceService } from '@main/services/new-invoice.service';
import { PAYMENT_METHODS } from '@main/static/new-invoice.info';

@Component({
  selector: 'app-new-invoice-general-form',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './new-invoice-general-form.component.html',
})
export class NewInvoiceGeneralFormComponent {
  constructor() {
    this.getNumberingRanges();
  }

  private newInvoiceService = inject(NewInvoiceService);
  private fb = inject(FormBuilder);
  readonly PAYMENT_METHODS = PAYMENT_METHODS;

  numberingRanges = signal<NumberingRange[]>([]);
  numbering_range_id = signal(8);
  payment_method_id = signal(10);

  myForm: FormGroup = this.fb.group({
    numberingRange: [this.numbering_range_id(), Validators.required],
    paymentMethod: [this.payment_method_id(), Validators.required],
  });

  getNumberingRanges() {
    this.newInvoiceService.getNumberingRanges().subscribe({
      next: (response) => {
        this.numberingRanges.set(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
