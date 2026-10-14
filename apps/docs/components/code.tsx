'use client';
import { useState } from 'react';
import { Button } from '@chamfer/ui';
import { IconCheck, IconCopy } from '@tabler/icons-react';
export function Code({ children, label = 'TypeScript' }: { children: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  return (
    <div className="code-block">
      <div className="code-header">
        <span>{label}</span>
        <Button
          variant="ghost"
          size="sm"
          aria-label="Copy code"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(children);
              setCopied(true);
              setFailed(false);
              setTimeout(() => setCopied(false), 2000);
            } catch {
              setFailed(true);
            }
          }}
        >
          {copied ? <IconCheck /> : <IconCopy />}
          {copied ? 'Copied' : 'Copy'}
        </Button>
      </div>
      <pre>
        <code>{children}</code>
      </pre>
      <span className="ch-sr-only" role="status">
        {copied
          ? 'Code copied.'
          : failed
            ? 'Copy unavailable. Select and copy the code manually.'
            : ''}
      </span>
    </div>
  );
}
