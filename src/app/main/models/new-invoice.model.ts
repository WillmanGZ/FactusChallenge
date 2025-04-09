export interface NewInvoice {
  document: string; //Form
  numbering_range_id: number; //Solicitud
  reference_code: string; // Solicitud / postproceso
  observation: string; // Form
  payment_form_code?: number; // Form
  payment_due_date?: Date; //Formato YYYY-MM-DD
  payment_method_code?: number;
  customer: Customer; // Form
  items: Item[]; //Form
}

export interface Customer {
  identification_document_id: number; //Codigo para tipo de identificacion
  identification: string; //Numero de identificacion
  legal_organization_id: string; // ID que corresponsa al tipo de organizacion.
  tribute_id: string; // ID del tributo.
  dv?: string; //Numero de identificacion en caso de ser NIT
  company?: string; //Solo si es persona JURIDICA
  trade_name?: string;
  names?: string; //Solo para personas naturales
  address?: string;
  municipality_id?: string; //SOLO OBLIGATORIO PARA COLOMBIA
  email?: string;
  phone?: string;
}

export interface Item {
  code_reference: string;
  name: string;
  quantity: number;
  discount_rate: number; //Porcentaje del descuento del producto o servicio (máximo dos decimales).
  price: number; //Precio del producto o servicio con impuestos incluidos (máximo dos decimales).
  tax_rate: string; // Porcentaje del impuesto aplicado al producto o servicio.
  unit_measure_id: number; //ID que corresponda a la unidad de medida del item.
  standard_code_id: number; //ID que corresponde al codigo de estandar que se adopto para los productos o servicios.
  is_excluded: number; //Si el producto está excluido de IVA (0: no, 1: sí).
  tribute_id: number; //Tipo de tributo aplicado.
  withholding_taxes: WithholdingTax[]; //Array de objetos (retenciones), corresponse las retenciones aplicadas al producto o servicio. Se debe enviar un objeto por cada retención.
}

export interface WithholdingTax {
  code: string; //Código relacionado con la retención aplicada al producto o servicio.
  withholding_tax_rate: number; // Porcentaje de la retención aplicada al producto o servicio. El valor se maneja con máximos 2 decimales
}
