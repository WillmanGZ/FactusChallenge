import { Component, ViewChild, signal } from '@angular/core';
import { Customer, Item } from '@main/models/new-invoice.model';
import { GeneralDetailsComponent } from '@main/components/general-details/general-details.component';
import { ClientDetailsComponent } from '@main/components/client-details/client-details.component';
import { ProductDetailsComponent } from '@main/components/product-details/product-details.component';

@Component({
  selector: 'app-new-invoice-page',
  imports: [
    GeneralDetailsComponent,
    ClientDetailsComponent,
    ProductDetailsComponent,
  ],
  templateUrl: './new-invoice-page.component.html',
})
export class NewInvoicePageComponent {
  @ViewChild(ProductDetailsComponent) productComp!: ProductDetailsComponent;
  @ViewChild(ClientDetailsComponent)
  customerComp!: ClientDetailsComponent;

  items = signal<Item[]>([]);
  customers: Customer | null = null;

  probar() {
    if (!this.setCustomer()) {
      return;
    }
    this.newProduct();
  }

  setCustomer() {
    const customerValid = this.customerComp.validations();

    if (!customerValid) {
      return false;
    }

    const customer: Customer = {
      identification_document_id: Number(
        this.customerComp.identification_document_id()
      ),
      identification: this.customerComp.identification(),
      legal_organization_id: this.customerComp.legal_organization_id(),
      tribute_id: this.customerComp.tribute_id(),
      ...(this.customerComp.trade_name()
        ? { trade_name: this.customerComp.trade_name() }
        : {}),
      ...(this.customerComp.names()
        ? { names: this.customerComp.names() }
        : {}),
      ...(this.customerComp.address()
        ? { address: this.customerComp.address() }
        : {}),
      ...(this.customerComp.email()
        ? { email: this.customerComp.email() }
        : {}),
      ...(this.customerComp.phone()
        ? { phone: this.customerComp.phone() }
        : {}),
    };

    this.customers = customer;
    return true;
  }

  newProduct() {
    const productValid = this.productComp.validations();
    if (!productValid) {
      return false;
    }

    const item: Item = {
      code_reference: this.productComp.item_code_reference(),
      name: this.productComp.item_name(),
      quantity: this.productComp.item_quantity(),
      price: this.productComp.item_price(),
      discount_rate: this.productComp.item_discount_rate(),
      tax_rate: this.productComp.item_tax_rate(),
      unit_measure_id: this.productComp.item_unit_measure_id(),
      standard_code_id: this.productComp.item_standar_code_id(),
      is_excluded: this.productComp.item_is_excluded(),
      tribute_id: this.productComp.item_tribute_id(),
      withholding_taxes: this.productComp.item_withholding_taxes(),
    };

    this.items.update((items) => [...items, item]);
    return true;
  }
}
