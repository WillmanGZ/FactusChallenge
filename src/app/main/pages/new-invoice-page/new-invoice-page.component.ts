import { Component } from '@angular/core';
import { NewInvoiceClientFormComponent } from '@main/components/new-invoice-client-form/new-invoice-client-form.component';
import { NewInvoiceGeneralFormComponent } from '@main/components/new-invoice-general-form/new-invoice-general-form.component';

@Component({
  selector: 'app-new-invoice-page',
  imports: [NewInvoiceGeneralFormComponent, NewInvoiceClientFormComponent],
  templateUrl: './new-invoice-page.component.html',
})
export class NewInvoicePageComponent {}
