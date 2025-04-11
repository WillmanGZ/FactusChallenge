import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Item } from '@main/models/new-invoice.model';
import { NewInvoiceService } from '@main/services/new-invoice.service';

@Component({
  selector: 'app-product-details',
  imports: [FormsModule],
  templateUrl: './product-details.component.html',
})
export class ProductDetailsComponent {
  private newInvoiceService = inject(NewInvoiceService);

  readonly standar_code_ids = [
    {
      id: '1',
      name: 'Estándar de adopción del contribuyente',
    },
    {
      id: '2',
      name: 'UNSPSC',
    },
    {
      id: '3',
      name: 'Partida Arancelaria',
    },
    {
      id: '4',
      name: 'GTIN',
    },
  ];

  items = signal<Item[]>([]);

  item_code_reference = signal('');
  item_name = signal('');
  item_quantity = signal(1);
  item_price = signal(0.0);
  item_discount_rate = signal(0);
  item_tax_rate = signal('');
  item_unit_measure_id = signal(0);
  item_standar_code_id = signal(0);
  item_is_excluded = signal(1);
  item_tribute_id = signal(0);
  item_withholding_taxes = signal([]);

  unitMeasures = computed(() => this.newInvoiceService.unitMeasures());
  tributes = computed(() => this.newInvoiceService.tributes());

  newItem() {
    const newItem: Item = {
      code_reference: this.item_code_reference(),
      name: this.item_name(),
      quantity: this.item_quantity(),
      price: this.item_price(),
      discount_rate: this.item_discount_rate(),
      tax_rate: this.item_tax_rate(),
      unit_measure_id: this.item_unit_measure_id(),
      standard_code_id: this.item_standar_code_id(),
      is_excluded: this.item_is_excluded(),
      tribute_id: this.item_tribute_id(),
      withholding_taxes: this.item_withholding_taxes(),
    };

    console.table(newItem);
  }
}
