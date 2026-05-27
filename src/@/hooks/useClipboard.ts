import { useCallback, useState } from 'react';

const useClipboard = (timeout = 2000) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = useCallback(
    (text: string, fieldName: string) => {
      try {
        navigator.clipboard
          .writeText(text)
          .then(() => {
            setCopiedField(fieldName);
            setTimeout(() => setCopiedField(null), timeout);
          })
          .catch(() => {
            console.error('Failed to copy text to clipboard');
          });
      } catch {
        console.error('Failed to copy text to clipboard');
      }
    },
    [timeout],
  );

  return {
    copiedField,
    copyToClipboard,
    isCopied: (fieldName: string) => copiedField === fieldName,
  };
};

export default useClipboard;
