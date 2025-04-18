import { NumberingRange } from "./numbering-ranges.model";

export interface InvoiceResponse {
  status: string;
  message: string;
  data: Data;
}

export interface Data {
  data: Invoice[];
  pagination: Pagination;
}

export interface Invoice {
  id: number;
  document: Document;
  number: string;
  api_client_name: string;
  reference_code: string;
  identification: string;
  graphic_representation_name: string;
  company: string;
  trade_name: null | string;
  names: string;
  email: string;
  total: string;
  status: number;
  errors: string[];
  send_email: number;
  has_claim: number;
  is_negotiable_instrument: number;
  payment_form: Document;
  created_at: string;
  credit_notes: any[];
  debit_notes: any[];
}

export interface Document {
  code: string;
  name: Name;
}

export enum Name {
  FacturaElectrónicaDeVenta = 'Factura electrónica de Venta',
  PagoACrédito = 'Pago a crédito',
  PagoDeContado = 'Pago de contado',
}

export interface Pagination {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  links: Link[];
}

export interface Link {
  url: null | string;
  label: number | string;
  active: boolean;
  page?: number;
}

/* PDF & XML */

export interface PDFInvoiceResponse {
  status: string;
  message: string;
  data: PDFData;
}

export interface PDFData {
  file_name: string;
  pdf_base_64_encoded: string;
}

export interface XMLInvoiceResponse {
  status: string;
  message: string;
  data: XMLData;
}

export interface XMLData {
  file_name: string;
  xml_base_64_encoded: string;
}

/* Watch Invoice */

export interface WatchInvoice {
  status: string;
  message: string;
  data: WatchData;
}

export interface WatchData {
  company: Company;
  customer: Customer;
  numbering_range: NumberingRange;
  billing_period: any[];
  bill: Bill;
  related_documents: any[];
  items: Item[];
  withholding_taxes: any[];
  credit_notes: any[];
  debit_notes: any[];
}

export interface Bill {
  id: number;
  document: Document;
  number: string;
  reference_code: string;
  status: number;
  send_email: number;
  qr: string;
  cufe: string;
  validated: string;
  discount_rate: string;
  discount: string;
  gross_value: string;
  taxable_amount: string;
  tax_amount: string;
  total: string;
  observation: null;
  errors: any[];
  created_at: string;
  payment_due_date: null;
  qr_image: string;
  has_claim: number;
  is_negotiable_instrument: number;
  payment_form: Document;
  payment_method: Document;
  public_url: string;
}

export interface Company {
  url_logo: string;
  nit: string;
  dv: string;
  company: string;
  name: string;
  graphic_representation_name: string;
  registration_code: string;
  economic_activity: string;
  phone: string;
  email: string;
  direction: string;
  municipality: string;
}

export interface Customer {
  identification: string;
  dv: null;
  graphic_representation_name: string;
  trade_name: null;
  company: string;
  names: string;
  address: string;
  email: string;
  phone: string;
  legal_organization: LegalOrganization;
  tribute: LegalOrganization;
  municipality: any[];
}

export interface LegalOrganization {
  id: number;
  code: string;
  name: string;
}

export interface Item {
  code_reference: string;
  name: string;
  quantity: number;
  discount_rate: string;
  discount: string;
  gross_value: string;
  tax_rate: string;
  taxable_amount: string;
  tax_amount: string;
  price: string;
  is_excluded: number;
  unit_measure: LegalOrganization;
  standard_code: LegalOrganization;
  tribute: LegalOrganization;
  total: number;
  withholding_taxes: any[];
}


