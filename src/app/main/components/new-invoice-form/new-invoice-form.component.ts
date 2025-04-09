import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-invoice-form',
  imports: [FormsModule],
  templateUrl: './new-invoice-form.component.html',
})
export class NewInvoiceFormComponent {
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

  selected_identification_document_id = '3';
  selected_legal_organization_id = signal('2');
  selected_tribute_id = '18';

  isJuridicalPerson = computed(() => {
    return this.selected_legal_organization_id() === '1';
  });

  hasNit() {
    return (
      this.selected_identification_document_id === '6' ||
      this.selected_identification_document_id === '10'
    );
  }
}
