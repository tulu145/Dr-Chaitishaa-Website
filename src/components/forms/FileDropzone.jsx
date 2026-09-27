/**
 * FileDropzone — drag-and-drop + click file upload.
 * Accepts PDF, PNG, JPEG, WebP up to 2 MB.
 * Stores file metadata in Redux; base64 is computed on demand at submission.
 *
 * Props:
 *   onFile(file, metadata)  called with the File object + { name, size, mimeType }
 *   onRemove()              called when the user clears the file
 *   currentFile             { name, size, mimeType } | null  (from Redux state)
 *   error                   string | undefined
 */
import { useRef, useState, useCallback } from 'react';
import { ACCEPTED_FILE_TYPES, MAX_FILE_SIZE_BYTES } from '@/utils/constants.js';
import { formatFileSize } from '@/utils/format.js';
import InlineError from '@/components/feedback/InlineError.jsx';

const ACCEPTED_MIME = Object.keys(ACCEPTED_FILE_TYPES);
const ACCEPTED_EXT = Object.values(ACCEPTED_FILE_TYPES).flat().join(', ');

function validateFile(file) {
  if (!ACCEPTED_MIME.includes(file.type)) {
    return `File type not accepted. Use PDF, PNG, JPEG or WebP.`;
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return `File exceeds 2 MB limit (${formatFileSize(file.size)}).`;
  }
  return null;
}

export default function FileDropzone({ onFile, onRemove, currentFile, error: externalError }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [localError, setLocalError] = useState('');

  const errorMessage = externalError || localError;

  const processFile = useCallback((file) => {
    const err = validateFile(file);
    if (err) {
      setLocalError(err);
      return;
    }
    setLocalError('');
    onFile(file, { name: file.name, size: file.size, mimeType: file.type });
  }, [onFile]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  }, [processFile]);

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    // Reset so the same file can be re-selected after removal
    e.target.value = '';
  };

  if (currentFile) {
    return (
      <div className="flex items-center justify-between gap-3 p-4 rounded-lg border border-line bg-alt-surface text-sm">
        <div className="flex items-center gap-2 min-w-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-text shrink-0" aria-hidden="true">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
          </svg>
          <span className="truncate text-text font-medium">{currentFile.name}</span>
          <span className="text-muted-text shrink-0">({formatFileSize(currentFile.size)})</span>
        </div>
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove file ${currentFile.name}`}
          className="text-muted-text hover:text-rose-text transition-colors focus-visible:outline-2 focus-visible:outline-accent-text rounded"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        aria-label="Upload floor plan or property document"
        aria-describedby={errorMessage ? 'dropzone-error' : undefined}
        onDragEnter={(e) => { e.preventDefault(); setDragging(true); }}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click(); }}
        className={`flex flex-col items-center justify-center gap-2 p-8 rounded-lg border-2 border-dashed cursor-pointer transition-colors text-center focus-visible:outline-2 focus-visible:outline-accent-text ${
          dragging
            ? 'border-accent-text bg-accent-text/5'
            : errorMessage
            ? 'border-rose-text bg-rose-text/5'
            : 'border-line hover:border-accent-text hover:bg-alt-surface'
        }`}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-text" aria-hidden="true">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        <p className="text-sm text-text font-medium">
          Drop your floor plan here, or <span className="text-accent-text underline">browse</span>
        </p>
        <p className="text-xs text-muted-text">PDF, PNG, JPEG or WebP — max 2 MB</p>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_EXT}
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
        onChange={handleChange}
      />
      <InlineError id="dropzone-error" message={errorMessage} />
    </div>
  );
}
