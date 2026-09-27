import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export default function CopyButton({ text, ariaLabel = "Copy to clipboard" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for older browsers or non-secure contexts
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      aria-label={ariaLabel}
      title={copied ? "Copied!" : "Copy"}
      className="p-2 rounded hover:bg-alt-surface text-muted-text hover:text-accent-text focus-visible:outline-accent-text relative"
    >
      <div aria-live="polite" className="sr-only">
        {copied ? 'Copied' : ''}
      </div>
      {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
      
      {/* Tooltip */}
      {copied && (
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-text text-bg text-xs px-2 py-1 rounded whitespace-nowrap">
          Copied!
        </span>
      )}
    </button>
  );
}
