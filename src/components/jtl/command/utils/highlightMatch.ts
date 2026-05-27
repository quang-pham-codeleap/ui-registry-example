import React from 'react';

/**
 * Highlight the matching text in a string
 * @param value The value to highlight
 * @param entireValue The entire string value to match
 * @returns The highlighted text
 */
export default function highlightMatch(entireValue: string, value: string) {
  if (!value || !value.trim()) return entireValue;

  const searchValueLower = value.toLowerCase();
  const textLower = entireValue.toLowerCase();
  const result: React.ReactNode[] = [];
  let lastIndex = 0;

  let index = textLower.indexOf(searchValueLower);
  while (index !== -1) {
    // Add the text before the match
    if (index > lastIndex) {
      result.push(entireValue.substring(lastIndex, index));
    }

    // Add the matched text with highlighting
    const matchedText = entireValue.substring(index, index + value.length);
    result.push(React.createElement('strong', { key: `match-${index}` }, matchedText));

    // Update indices for next iteration
    lastIndex = index + value.length;
    index = textLower.indexOf(searchValueLower, lastIndex);
  }

  // Add any remaining text
  if (lastIndex < entireValue.length) {
    result.push(entireValue.substring(lastIndex));
  }

  return result;
}
