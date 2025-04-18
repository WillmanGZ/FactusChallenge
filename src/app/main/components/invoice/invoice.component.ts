import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  input,
  inject,
  signal,
} from '@angular/core';
import { Invoice } from '@main/models/invoice.model';
import { InvoiceService } from '@main/services/invoice.service';
import { ToastService } from '@shared/services/toast.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PdfIconComponent } from '@icons/pdf-icon.component';
import { XmlIconComponent } from '@icons/xml-icon.component';
import { LinkIconComponent } from '@icons/link-icon.component';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  imports: [PdfIconComponent, XmlIconComponent, LinkIconComponent],
})
export class InvoiceComponent implements AfterViewInit {
  private invoiceService = inject(InvoiceService);
  private toastService = inject(ToastService);
  private sanitizer = inject(DomSanitizer);

  private invoicePdf64 = signal('');
  private invoiceXml64 = signal('');

  invoice = input.required<Invoice>();
  invoiceUrl = signal('');

  invoicePdfSafeUrl = signal<SafeResourceUrl | null>(null);

  @ViewChild('invoiceModal') invoiceModal!: ElementRef<HTMLDialogElement>;

  ngAfterViewInit(): void {
    if (typeof this.invoiceModal.nativeElement.showModal !== 'function') {
    }
  }

  openModal(): void {
    this.invoiceModal.nativeElement.showModal();

    this.invoiceService.getInvoiceURL(this.invoice()).subscribe({
      next: (url) => {
        this.invoiceUrl.set(url);
      },
      error: () => {
        this.toastService.error(
          'Error',
          'No se pudo obtener la URL de la factura'
        );
      },
    });

    this.invoiceService.getInvoicePDF(this.invoice()).subscribe({
      next: (pdf) => {
        this.invoicePdf64.set(pdf.pdf_base_64_encoded);
        const fullBase64 = `data:application/pdf;base64,${this.invoicePdf64()}`;
        this.invoicePdfSafeUrl.set(
          this.sanitizer.bypassSecurityTrustResourceUrl(fullBase64)
        );
      },
      error: () => {
        this.toastService.error(
          'Error',
          'No se pudo obtener el PDF de la factura'
        );
      },
    });

    this.invoiceService.getInvoiceXML(this.invoice()).subscribe({
      next: (xml) => {
        this.invoiceXml64.set(xml.xml_base_64_encoded);
      },
      error: () => {
        this.toastService.error(
          'Error',
          'No se pudo obtener el XML de la factura'
        );
      },
    });
  }

  downloadPDF(): void {
    const base64 = this.invoicePdf64();
    const link = document.createElement('a');
    link.href = `data:application/pdf;base64,${base64}`;
    link.download = `factura_${this.invoice().number}.pdf`;
    link.click();
  }

  downloadXML(): void {
    const base64 = this.invoiceXml64();
    const link = document.createElement('a');
    link.href = `data:application/xml;base64,${base64}`;
    link.download = `factura_${this.invoice().number}.xml`;
    link.click();
  }
}
