import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DOCUMENTS_TYPES } from '@main/static/new-invoice.info';

@Component({
  selector: 'app-new-invoice-client-form',
  imports: [FormsModule],
  templateUrl: './new-invoice-client-form.component.html',
})
export class NewInvoiceClientFormComponent {
  readonly documentTypes = DOCUMENTS_TYPES;

  document_type_id = signal(3);
  identification = signal('');
  dv = signal<number | null>(null);
}
