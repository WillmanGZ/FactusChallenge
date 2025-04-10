import { Component } from '@angular/core';
import { ClientDetailsFormComponent } from "@main/components/client-details-form/client-details-form.component";

@Component({
  selector: 'app-new-invoice-page',
  imports: [ClientDetailsFormComponent],
  templateUrl: './new-invoice-page.component.html',
})
export class NewInvoicePageComponent { }
