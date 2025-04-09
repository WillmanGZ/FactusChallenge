import { Component } from '@angular/core';
import { NewInvoiceFormComponent } from "@main/components/new-invoice-form/new-invoice-form.component";

@Component({
  selector: 'app-new-invoice-page',
  imports: [NewInvoiceFormComponent],
  templateUrl: './new-invoice-page.component.html',
})
export class NewInvoicePageComponent { }
