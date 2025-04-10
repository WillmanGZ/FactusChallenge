import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Item, WithholdingTax } from '@main/models/new-invoice.model';
import { UnitMeasure } from '@main/models/unit_measures.model';
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

  items: Item[] = [];

  item_code_reference = '';
  item_name = '';
  item_quantity = 0;
  item_price = 0.0;
  item_discount_rate = 0;
  item_tax_rate = '';
  item_unit_measure_id = 0;
  item_standar_code_id = 0;
  item_is_excluded = 0;
  item_tribute_id = 0;

  unitMeasures = computed(() => this.newInvoiceService.unitMeasures());
  tributes = computed(() => this.newInvoiceService.tributes());
}
