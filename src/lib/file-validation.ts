export const supportedTypes = ["application/pdf", "image/jpeg", "image/png", "image/webp"] as const;
const signatures: Record<string, number[]> = { "application/pdf": [0x25, 0x50, 0x44, 0x46], "image/png": [0x89, 0x50, 0x4e, 0x47], "image/jpeg": [0xff, 0xd8, 0xff], "image/webp": [0x52, 0x49, 0x46, 0x46] };
export function maxUploadBytes() { return Number(process.env.MAX_UPLOAD_SIZE_MB ?? 4) * 1024 * 1024; }
export function validateFile(file: File, bytes?: Uint8Array): string | null {
  if (!file.size) return "EMPTY_FILE";
  if (file.size > maxUploadBytes()) return "FILE_TOO_LARGE";
  if (!supportedTypes.includes(file.type as (typeof supportedTypes)[number])) return "UNSUPPORTED_FILE";
  if (bytes && !signatures[file.type].every((v, i) => bytes[i] === v)) return "UNSUPPORTED_FILE";
  return null;
}
