import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewInvoiceService } from '@main/services/new-invoice.service';
import {
  identification_document_ids,
  legal_organization_ids,
  tribute_ids,
} from '@main/static/new-invoice.info';
import { ToastService } from '@shared/services/toast.service';

@Component({
  selector: 'app-client-details',
  imports: [FormsModule],
  templateUrl: './client-details.component.html',
})
export class ClientDetailsComponent {
  private toastService = inject(ToastService);
  private newInvoiceService = inject(NewInvoiceService);

  readonly identification_document_ids = identification_document_ids;
  readonly legal_organization_ids = legal_organization_ids;
  readonly tribute_ids = tribute_ids;

  identification_document_id = signal('3');
  identification = signal('');
  legal_organization_id = signal('2');
  tribute_id = signal('18');
  dv = signal('');
  company = signal('');
  trade_name = signal('');
  names = signal('');
  address = signal('');
  municipality_id = signal('');
  email = signal('');
  phone = signal('');
  country_id = signal('');

  isJuridicalPerson = computed(() => {
    return this.legal_organization_id() === '1';
  });

  countries = computed(() => this.newInvoiceService.countries());
  municipalities = computed(() => this.newInvoiceService.municipalities());

  hasNit() {
    return (
      this.identification_document_id() === '6' ||
      this.identification_document_id() === '10'
    );
  }

  validations(): boolean {
    const idValue = this.identification().trim();
    const regIdentification = /^\d{6,11}$/;
    if (!idValue || !regIdentification.test(idValue)) {
      this.toastService.error(
        'Error',
        'El documento de identidad debe tener entre 6 y 11 dígitos numéricos'
      );
      return false;
    }

    if (this.hasNit()) {
      const regDV = /^[0-9]$/;
      if (!this.dv || !regDV.test(this.dv().trim())) {
        this.toastService.error(
          'Error',
          'El dígito de verificación debe ser un número entre 0 y 9 (NIT)'
        );
        return false;
      }
    }

    if (this.isJuridicalPerson()) {
      if (!this.company || this.company().trim().length === 0) {
        this.toastService.error(
          'Error',
          'El nombre de la empresa es obligatorio para personas jurídicas'
        );
        return false;
      }
    }

    if (this.email && this.email().trim().length > 0) {
      const regEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      if (!regEmail.test(this.email().trim())) {
        this.toastService.error('Error', 'El correo electrónico no es válido');
        return false;
      }
    }

    if (this.phone && this.phone().trim().length > 0) {
      const regPhone = /^[0-9()+\-\s]{7,15}$/;
      if (!regPhone.test(this.phone().trim())) {
        this.toastService.error('Error', 'El número de teléfono no es válido');
        return false;
      }
    }

    const validateOptionalField = (value: string): boolean => {
      if (!value) return true;
      const trimmed = value.trim();
      return trimmed.length >= 3 && trimmed.length <= 100;
    };

    if (!validateOptionalField(this.trade_name())) {
      this.toastService.error(
        'Error',
        'El nombre comercial debe tener entre 3 y 100 caracteres'
      );
      return false;
    }

    if (!validateOptionalField(this.names())) {
      this.toastService.error(
        'Error',
        'El nombre del cliente debe tener entre 3 y 100 caracteres'
      );
      return false;
    }

    if (!validateOptionalField(this.address())) {
      this.toastService.error(
        'Error',
        'La dirección debe tener entre 3 y 100 caracteres'
      );
      return false;
    }

    if (this.country_id() === '') {
      this.toastService.error('Error', 'Debes seleccionar un país');
      return false;
    }

    if (this.country_id() === '46') {
      if (!this.municipality_id() || this.municipality_id().trim() === '') {
        this.toastService.error('Error', 'Debes seleccionar un municipio');
        return false;
      }
    }

    return true;
  }
}
