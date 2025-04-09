import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Customer } from '@main/models/new-invoice.model';
import { NewInvoiceService } from '@main/services/new-invoice.service';

@Component({
  selector: 'app-new-invoice-form',
  imports: [FormsModule],
  templateUrl: './new-invoice-form.component.html',
})
export class NewInvoiceFormComponent {
  private newInvoiceService = inject(NewInvoiceService);

  readonly identification_document_ids = [
    { id: '1', name: 'Registro civil' },
    { id: '2', name: 'Tarjeta de identidad' },
    { id: '3', name: 'Cédula de ciudadanía' },
    { id: '4', name: 'Tarjeta de extranjería' },
    { id: '5', name: 'Cédula de extranjería' },
    { id: '6', name: 'NIT' },
    { id: '7', name: 'Pasaporte' },
    { id: '8', name: 'Documento de identificación extranjero' },
    { id: '9', name: 'PEP' },
    { id: '10', name: 'NIT otro país' },
    { id: '11', name: 'NUIP*' },
  ];

  readonly legal_organization_ids = [
    { id: '1', name: 'Persona Jurídica' },
    { id: '2', name: 'Persona Natural' },
  ];

  readonly tribute_ids = [
    { id: '18', name: 'IVA' },
    { id: '21', name: 'No aplica*' },
  ];

  selected_identification_document_id = signal('3');
  selected_legal_organization_id = signal('2');
  selected_tribute_id = signal('18');
  selected_country_id = '';
  selected_municipality_id = '';

  identification = signal('');
  dv = '';
  company = '';
  tradeName = '';
  names = '';
  address = '';
  email = '';
  phone = '';

  isJuridicalPerson = computed(() => {
    return this.selected_legal_organization_id() === '1';
  });

  countries = computed(() => this.newInvoiceService.countries());
  municipalities = computed(() => this.newInvoiceService.municipalities());

  hasNit() {
    return (
      this.selected_identification_document_id() === '6' ||
      this.selected_identification_document_id() === '10'
    );
  }

  try = computed(() => {
    if (
      this.selected_identification_document_id() !== '' &&
      this.identification().length > 0 &&
      this.selected_legal_organization_id() !== '' &&
      this.selected_tribute_id() !== ''
    ) {
      return false;
    } else {
      return true;
    }
  });
  ;

  exportCustomer() {
    const newCustomer: Customer = {
      identification_document_id: Number(
        this.selected_identification_document_id
      ),
      identification: this.identification(),
      legal_organization_id: this.selected_legal_organization_id(),
      tribute_id: this.selected_tribute_id(),
      ...(this.tradeName ? { trade_name: this.tradeName } : {}),
      ...(this.names ? { names: this.names } : {}),
      ...(this.address ? { address: this.address } : {}),
      ...(this.email ? { email: this.email } : {}),
      ...(this.phone ? { phone: this.phone } : {}),
    };

    if (this.hasNit()) {
      newCustomer.dv = this.dv;
    }

    if (this.isJuridicalPerson()) {
      newCustomer.company = this.company;
    }

    if (this.selected_country_id === '46') {
      newCustomer.municipality_id = this.selected_municipality_id;
    }
    console.table(newCustomer);
  }
}
