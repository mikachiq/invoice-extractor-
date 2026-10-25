export type ExtractionWarning = { code: string; message: string };

export type InvoiceItem = {
  id: string;
  description: string | null;
  quantity: number | null;
  unit_price: number | null;
  line_total: number | null;
};

export type Invoice = {
  company_name: string | null;
  po_number: string | null;
  invoice_number: string | null;
  currency: string | null;
  items: InvoiceItem[];
  stated_total: number | null;
  warnings: ExtractionWarning[];
};

export type ExtractionResponse = { success: true; data: Invoice };
export type APIError = { success: false; error: { code: string; message: string } };
