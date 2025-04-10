import { Component } from '@angular/core';
import { ClientDetailsFormComponent } from "@main/components/client-details-form/client-details-form.component";
import { ProductDetailsComponent } from "../../components/product-details/product-details.component";

@Component({
  selector: 'app-new-invoice-page',
  imports: [ClientDetailsFormComponent, ProductDetailsComponent],
  templateUrl: './new-invoice-page.component.html',
})
export class NewInvoicePageComponent { }
