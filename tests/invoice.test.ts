import { describe, expect, it } from "vitest";
import { calculateLineTotal, calculateSubtotal } from "../src/lib/invoice-calculations";
import { createCsv, invoiceFilename } from "../src/lib/export-csv";
describe("invoice utilities", () => { const invoice = { company_name: "Acme", po_number: "PO-1", invoice_number: "INV-1", currency: "USD", stated_total: 12.5, warnings: [], items: [{ id: "1", description: "Widget, large", quantity: 2, unit_price: 6.25, line_total: 12.5 }] }; it("calculates", () => { expect(calculateLineTotal(invoice.items[0])).toBe(12.5); expect(calculateSubtotal(invoice.items)).toBe(12.5); }); it("exports safely", () => { expect(createCsv(invoice)).toContain('"Widget, large"'); expect(invoiceFilename(invoice, "csv")).toBe("invoice-INV-1.csv"); }); });
