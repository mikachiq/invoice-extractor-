import Decimal from "decimal.js";
import type { ExtractionWarning, Invoice, InvoiceItem } from "@/types/invoice";

const money = (value: Decimal) => value.toDecimalPlaces(2, Decimal.ROUND_HALF_UP).toNumber();
export function calculateLineTotal(item: Pick<InvoiceItem, "quantity" | "unit_price">): number | null {
  if (item.quantity === null || item.unit_price === null || !Number.isFinite(item.quantity) || !Number.isFinite(item.unit_price)) return null;
  return money(new Decimal(item.quantity).mul(item.unit_price));
}
export function calculateSubtotal(items: InvoiceItem[]): number | null {
  const totals = items.map((item) => calculateLineTotal(item) ?? item.line_total).filter((value): value is number => value !== null && Number.isFinite(value));
  return totals.length ? money(totals.reduce((sum, value) => sum.plus(value), new Decimal(0))) : null;
}
export function validationWarnings(invoice: Invoice): ExtractionWarning[] {
  const warnings: ExtractionWarning[] = [...invoice.warnings];
  if (!invoice.company_name) warnings.push({ code: "MISSING_COMPANY", message: "Company name wasn't found. Enter it manually if needed." });
  if (!invoice.invoice_number) warnings.push({ code: "MISSING_INVOICE", message: "Invoice number wasn't found. Enter it manually if needed." });
  if (!invoice.po_number) warnings.push({ code: "MISSING_PO", message: "PO number wasn't found. Enter it manually if needed." });
  if (invoice.items.some((i) => i.quantity === null || i.unit_price === null)) warnings.push({ code: "INCOMPLETE_ITEM", message: "One or more items have missing quantity or price, so the subtotal may be incomplete." });
  const subtotal = calculateSubtotal(invoice.items);
  if (subtotal !== null && invoice.stated_total !== null && Math.abs(subtotal - invoice.stated_total) > 0.02) warnings.push({ code: "TOTAL_MISMATCH", message: "The invoice total doesn't match the sum of listed items. Check prices, quantities, and additional charges." });
  return warnings;
}
