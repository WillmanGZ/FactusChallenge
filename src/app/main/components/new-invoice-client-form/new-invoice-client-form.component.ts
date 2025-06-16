import { Component, signal, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DOCUMENTS_TYPES } from '@main/static/new-invoice.info';

@Component({
  selector: 'app-new-invoice-client-form',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './new-invoice-client-form.component.html',
})
export class NewInvoiceClientFormComponent {
  private fb = inject(FormBuilder);
  readonly documentTypes = DOCUMENTS_TYPES;

  document_type_id = signal(3);
  identification = signal<number | null>(null);
  dv = signal<number | null>(null);
  name = signal('');
  address = signal('');
  email = signal('');
  tel = signal('');

  myForm: FormGroup = this.fb.group({
    documentType: [this.document_type_id(), Validators.required],
    identification: [
      this.identification(),
      [Validators.required, Validators.pattern('^\\d{6,10}$')],
    ],
    dv: [this.dv(), [Validators.required, Validators.pattern('^\\d$')]],
    name: [this.name(), Validators.minLength(3)],
    address: [this.address(), Validators.minLength(4)],
    email: [
      this.email(),
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'),
    ],
    tel: [this.tel(), Validators.pattern('^\\+?[0-9\\s\\-().]{7,20}$')],
  });
}
