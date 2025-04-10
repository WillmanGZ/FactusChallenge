import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Customer } from '@main/models/new-invoice.model';
import { NewInvoiceService } from '@main/services/new-invoice.service';
import { ToastService } from '@shared/services/toast.service';

@Component({
  selector: 'app-client-details-form',
  imports: [FormsModule],
  templateUrl: './client-details-form.component.html',
})
export class ClientDetailsFormComponent {
  private toastService = inject(ToastService);
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

  isEnable = computed(() => {
    if (
      this.selected_identification_document_id() !== '' &&
      this.identification().length > 5 &&
      this.selected_legal_organization_id() !== '' &&
      this.selected_tribute_id() !== ''
    ) {
      return false;
    } else {
      return true;
    }
  });

  hasNit() {
    return (
      this.selected_identification_document_id() === '6' ||
      this.selected_identification_document_id() === '10'
    );
  }

  exportCustomer() {
    if (this.validations()) {
      const newCustomer: Customer = {
        identification_document_id: Number(
          this.selected_identification_document_id()
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

  validations(): boolean {
    // Validar el número de identificación: requerido, y debe ser entre 6 y 11 dígitos.
    const idValue = this.identification().trim();
    const regIdentification = /^\d{6,11}$/;
    if (!idValue || !regIdentification.test(idValue)) {
      this.toastService.error(
        'Error',
        'El documento de identidad debe tener entre 6 y 11 dígitos numéricos'
      );
      return false;
    }

    // Validar DV si el documento es NIT
    if (this.hasNit()) {
      const regDV = /^[0-9]$/;
      if (!this.dv || !regDV.test(this.dv.trim())) {
        this.toastService.error(
          'Error',
          'El dígito de verificación debe ser un número entre 0 y 9 (NIT)'
        );
        return false;
      }
    }

    // Validar "company" si es persona jurídica.
    if (this.isJuridicalPerson()) {
      if (!this.company || this.company.trim().length === 0) {
        this.toastService.error(
          'Error',
          'El nombre de la empresa es obligatorio para personas jurídicas'
        );
        return false;
      }
    }

    // Validar email si se suministra (opcional).
    if (this.email && this.email.trim().length > 0) {
      const regEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      if (!regEmail.test(this.email.trim())) {
        this.toastService.error('Error', 'El correo electrónico no es válido');
        return false;
      }
    }

    // Validar teléfono si se suministra (opcional).
    if (this.phone && this.phone.trim().length > 0) {
      const regPhone = /^[0-9()+\-\s]{7,15}$/;
      if (!regPhone.test(this.phone.trim())) {
        this.toastService.error('Error', 'El número de teléfono no es válido');
        return false;
      }
    }

    // Validar "tradeName", "names" y "address" si se ingresan, con longitudes entre 3 y 100 caracteres.
    const validateOptionalField = (value: string): boolean => {
      if (!value) return true;
      const trimmed = value.trim();
      return trimmed.length >= 3 && trimmed.length <= 100;
    };

    if (!validateOptionalField(this.tradeName)) {
      this.toastService.error(
        'Error',
        'El nombre comercial debe tener entre 3 y 100 caracteres'
      );
      return false;
    }

    if (!validateOptionalField(this.names)) {
      this.toastService.error(
        'Error',
        'El nombre del cliente debe tener entre 3 y 100 caracteres'
      );
      return false;
    }

    if (!validateOptionalField(this.address)) {
      this.toastService.error(
        'Error',
        'La dirección debe tener entre 3 y 100 caracteres'
      );
      return false;
    }

    if (this.selected_country_id === '') {
      this.toastService.error('Error', 'Debes seleccionar un país');
      return false;
    }

    // Validar municipio si el país seleccionado es Colombia ('46').
    if (this.selected_country_id === '46') {
      if (
        !this.selected_municipality_id ||
        this.selected_municipality_id.trim() === ''
      ) {
        this.toastService.error('Error', 'Debes seleccionar un municipio');
        return false;
      }
    }

    return true;
  }
}
