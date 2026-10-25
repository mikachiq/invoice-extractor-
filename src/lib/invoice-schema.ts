import { z } from "zod";
import type { Invoice } from "@/types/invoice";

const nullableNumber = z.number().finite().nullable();
export const extractionSchema = z.object({
  company_name: z.string().trim().max(500).nullable(),
  po_number: z.string().trim().max(200).nullable(),
  invoice_number: z.string().trim().max(200).nullable(),
  currency: z.string().trim().max(10).nullable(),
  items: z.array(z.object({ description: z.string().trim().max(1000).nullable(), quantity: nullableNumber, unit_price: nullableNumber, line_total: nullableNumber })).max(250),
  stated_total: nullableNumber,
  warnings: z.array(z.object({ code: z.string(), message: z.string() })).default([]),
});

export function normalizeInvoice(value: unknown): Invoice {
  const parsed = extractionSchema.parse(value);
  return { ...parsed, items: parsed.items.map((item, index) => ({ ...item, id: `item-${index}-${crypto.randomUUID()}` })) };
}
