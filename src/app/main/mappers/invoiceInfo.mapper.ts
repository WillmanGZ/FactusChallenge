import { WatchInvoice } from '../models/invoice.model';

export interface InvoiceUrl {
  public_url: string;
}

export function mapToInvoiceUrl(invoice: WatchInvoice): InvoiceUrl {
  return {
    public_url: invoice.data.bill.public_url,
  };
}
