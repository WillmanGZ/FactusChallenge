import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Item } from '@main/models/new-invoice.model';
import { NewInvoiceService } from '@main/services/new-invoice.service';
import { ToastService } from '@shared/services/toast.service';

@Component({
  selector: 'app-product-details',
  imports: [FormsModule],
  templateUrl: './product-details.component.html',
})
export class ProductDetailsComponent {
  private newInvoiceService = inject(NewInvoiceService);
  private toastService = inject(ToastService);

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
  item_tax_rate = signal('0');
  item_unit_measure_id = signal(0);
  item_standar_code_id = signal(0);
  item_is_excluded = signal(1);
  item_tribute_id = signal(0);
  item_withholding_taxes = signal([]);

  unitMeasures = computed(() => this.newInvoiceService.unitMeasures());
  tributes = computed(() => this.newInvoiceService.tributes());

  newItem() {
    if (!this.validations()) {
      return;
    }

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

  validations(): boolean {
    const regNumeric = /^\d+$/;

    if (!this.item_code_reference().trim()) {
      this.toastService.error(
        'Error',
        'El código de referencia es obligatorio'
      );
      return false;
    }

    if (!this.item_name().trim()) {
      this.toastService.error('Error', 'El nombre del producto es obligatorio');
      return false;
    }

    const quantity = this.item_quantity();
    if (!quantity || !regNumeric.test(quantity.toString()) || quantity < 1) {
      this.toastService.error(
        'Error',
        'La cantidad debe ser un número mayor o igual a 1'
      );
      return false;
    }

    const price = this.item_price();
    if (!regNumeric.test(price.toString()) || price < 0) {
      this.toastService.error(
        'Error',
        'El precio debe ser un número igual o mayor a 0'
      );
      return false;
    }

    const discount = this.item_discount_rate();
    if (
      !regNumeric.test(discount.toString()) ||
      discount < 0 ||
      discount > 100
    ) {
      this.toastService.error('Error', 'El descuento debe estar entre 0 y 100');
      return false;
    }

    const tax = Number(this.item_tax_rate());
    if (!regNumeric.test(tax.toString()) || tax < 0 || tax > 100) {
      this.toastService.error('Error', 'El impuesto debe estar entre 1 y 100');
      return false;
    }

    if (!this.item_unit_measure_id()) {
      this.toastService.error(
        'Error',
        'Debes seleccionar una unidad de medida'
      );
      return false;
    }

    if (!this.item_standar_code_id()) {
      this.toastService.error(
        'Error',
        'Debes seleccionar un estándar de identificación'
      );
      return false;
    }

    const excluded = this.item_is_excluded();
    if (excluded !== 0 && excluded !== 1) {
      this.toastService.error(
        'Error',
        'El valor de exclusión de IVA debe ser 0 o 1'
      );
      return false;
    }

    if (!this.item_tribute_id()) {
      this.toastService.error('Error', 'Debes seleccionar un tributo');
      return false;
    }

    return true;
  }
}
