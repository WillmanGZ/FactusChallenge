import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NumberingRange } from '@main/models/numbering-ranges.model';
import { NewInvoiceService } from '@main/services/new-invoice.service';

@Component({
  selector: 'app-new-invoice-general-form',
  imports: [FormsModule],
  templateUrl: './new-invoice-general-form.component.html',
})
export class NewInvoiceGeneralFormComponent {
  private newInvoiceService = inject(NewInvoiceService);

  numberingRanges = signal<NumberingRange[]>([]);
  numbering_range_id = signal(8);

  constructor() {
    this.getNumberingRanges();
  }

  getNumberingRanges() {
    this.newInvoiceService.getNumberingRanges().subscribe({
      next: (response) => {
        this.numberingRanges.set(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
