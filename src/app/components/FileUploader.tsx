"use client";
import { useRef, useState } from "react";
import { FileUp, Trash2 } from "lucide-react";
export function FileUploader({ file, onChange, error }: { file: File | null; onChange: (file: File | null) => void; error?: string }) {
  const input = useRef<HTMLInputElement>(null); const [dragging, setDragging] = useState(false); const useFile = (f?: File) => f && onChange(f);
  return <div className={`drop-zone ${dragging ? "is-dragging" : ""}`} onPaste={(e) => useFile(e.clipboardData.files[0])} onDragOver={(e) => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={(e) => { e.preventDefault(); setDragging(false); useFile(e.dataTransfer.files[0]); }}>
    <input ref={input} className="sr-only" type="file" accept=".pdf,.jpg,.jpeg,.png,.webp" onChange={(e) => useFile(e.target.files?.[0])}/>
    {file ? <div className="file-selected"><FileUp size={29}/><strong>{file.name}</strong><span>{file.type || "Document"} · {(file.size / 1024 / 1024).toFixed(2)} MB</span><div className="file-actions"><button type="button" className="secondary-button" onClick={() => input.current?.click()}>Replace</button><button type="button" className="text-button danger" onClick={() => onChange(null)}><Trash2 size={15}/> Remove</button></div></div> : <><div className="upload-icon"><FileUp size={30}/></div><h3>Drop your invoice here</h3><p>or paste it with Ctrl + V</p><button type="button" className="secondary-button" onClick={() => input.current?.click()}>Browse files</button><small>PDF, JPG, PNG, WEBP · Maximum 4 MB</small></>}
    {error && <p role="alert" className="panel-error">{error}</p>}
  </div>;
}
