# Invoice Extractor

Upload a PDF or image invoice, extract editable data with Gemini, then export CSV or Excel. Documents are sent to Gemini only for the current request and are not stored by the app.

## Local development

1. Run `npm install`.
2. Copy `.env.example` to `.env.local`.
3. Set `XAI_API_KEY` and optionally `XAI_MODEL` (default: `grok-4`).
4. Run `npm run dev`.

`MAX_UPLOAD_SIZE_MB` defaults to 4. The API key is read only by the server-side route.

## Verification

Run `npm test`, `npm run lint`, `npx tsc --noEmit`, and `npm run build`.

## Vercel deployment

Push this folder to GitHub, import it into Vercel, then configure `XAI_API_KEY`, `XAI_MODEL`, and `MAX_UPLOAD_SIZE_MB` in Vercel Environment Variables. No separate backend is needed.
