"use client";
import { LoaderCircle } from "lucide-react";
export function ProcessingOverlay({ stage }: { stage: number }) { const messages = ["Uploading your invoice...", "Reading your document...", "Extracting invoice details...", "Checking the extracted information...", "Almost done — preparing your results..."]; return <div role="status" aria-live="polite" className="upload-processing"><div className="processing-spinner"><LoaderCircle size={37}/></div><h3>{messages[stage % messages.length]}</h3><p>This can take a moment for multi-page documents.</p></div>; }
