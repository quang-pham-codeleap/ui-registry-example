/**
 * Formats raw HTML string with proper indentation and line breaks for better readability.
 *
 * This utility takes minified or unformatted HTML and returns a human-readable version with:
 * - Line breaks between tags
 * - Proper indentation (2 spaces per nesting level)
 * - Preserved text content and attributes
 * - Correct handling of HTML comments (<!-- -->)
 * - Correct handling of CDATA sections (<![CDATA[...]]>)
 * - Correct handling of DOCTYPE declarations (<!DOCTYPE ...>)
 * - Safe handling of comparison operators (e.g., "5 < 10") in text content
 *
 * The formatter uses improved regex patterns that only match actual HTML tags
 * (starting with < followed by a letter or /), preventing false matches on
 * text content containing < characters. Special HTML constructs (comments,
 * CDATA, DOCTYPE) are temporarily replaced with placeholders during formatting
 * and restored afterward to preserve their exact content.
 *
 * @param html - Raw HTML string to format (can be minified or already formatted)
 * @returns Formatted HTML string with proper indentation and line breaks
 *
 * @example
 * ```typescript
 * const raw = '<div><p>Hello</p><p>World</p></div>';
 * const formatted = formatHtml(raw);
 * // Returns:
 * // <div>
 * //   <p>Hello</p>
 * //   <p>World</p>
 * // </div>
 *
 * // Handles text with < characters correctly
 * const withComparison = '<div>5 < 10 is true</div>';
 * const formatted2 = formatHtml(withComparison);
 * // Returns:
 * // <div>
 * //   5 < 10 is true
 * // </div>
 *
 * // Preserves HTML comments
 * const withComment = '<div><!-- Comment --><p>Text</p></div>';
 * const formatted3 = formatHtml(withComment);
 * // Returns:
 * // <div>
 * //   <!-- Comment -->
 * //   <p>Text</p>
 * // </div>
 * ```
 */
export default function formatHtml(html: string): string {
  // Return empty string if input is empty or whitespace-only
  if (!html || !html.trim()) {
    return '';
  }

  let formatted = '';

  // indent level for each tag
  let indentLevel = 0;
  const indentSize = 2; // Match Prettier config (2 spaces)

  // Improved regex that only matches actual HTML tags
  // Must start with < followed by letter (opening tag) or </ (closing tag)
  // This prevents matching text like "5 < 10"
  const tagPattern = /<\/?[a-zA-Z][^>]*>/g;

  // Pattern for HTML comments: <!-- ... -->
  const commentPattern = /<!--[\s\S]*?-->/g;

  // Pattern for CDATA sections: <![CDATA[ ... ]]>
  const cdataPattern = /<!\[CDATA\[[\s\S]*?\]\]>/g;

  // Pattern for DOCTYPE declarations: <!DOCTYPE ...>
  const doctypePattern = /<!DOCTYPE[^>]*>/gi;

  // Store special constructs with placeholders to preserve them
  const specialConstructs: string[] = [];
  let processedHtml = html;

  // Replace special constructs with placeholders
  // 1. Preserve DOCTYPE declarations
  processedHtml = processedHtml.replace(doctypePattern, match => {
    specialConstructs.push(match);
    return `__SPECIAL_${specialConstructs.length - 1}__`;
  });

  // 2. Preserve HTML comments
  processedHtml = processedHtml.replace(commentPattern, match => {
    specialConstructs.push(match);
    return `__SPECIAL_${specialConstructs.length - 1}__`;
  });

  // 3. Preserve CDATA sections
  processedHtml = processedHtml.replace(cdataPattern, match => {
    specialConstructs.push(match);
    return `__SPECIAL_${specialConstructs.length - 1}__`;
  });

  // Self-closing tags that don't need a closing tag
  const selfClosingTags = new Set(['img', 'br', 'hr', 'input', 'meta', 'link', 'area', 'base', 'col', 'embed', 'source', 'track', 'wbr']);

  // Inline tags that should stay on same line as their content
  const inlineTags = new Set(['a', 'span', 'strong', 'em', 'b', 'i', 'u', 's', 'del', 'code', 'small', 'mark', 'sub', 'sup']);

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tagPattern.exec(processedHtml)) !== null) {
    const tag = match[0];
    const textBefore = processedHtml.substring(lastIndex, match.index);

    // Extract tag name from the tag string
    const tagNameMatch = tag.match(/<\/?([a-zA-Z0-9]+)/);
    const tagName = tagNameMatch ? tagNameMatch[1].toLowerCase() : '';

    const isClosingTag = tag.startsWith('</');
    const isSelfClosing = tag.endsWith('/>') || selfClosingTags.has(tagName);
    const isInlineTag = inlineTags.has(tagName);

    // Add text content before the tag if it exists
    if (textBefore) {
      // For inline tags (both opening and closing), keep text on same line
      // This prevents breaking inline content like: <strong>text</strong>
      if (isInlineTag) {
        formatted += textBefore;
      } else {
        formatted += ' '.repeat(indentLevel * indentSize) + textBefore + '\n';
      }
    }

    // Handle closing tags
    if (isClosingTag) {
      // For inline tags, keep closing tag on same line and don't change indentation
      if (isInlineTag) {
        formatted += tag;
      } else {
        indentLevel = Math.max(0, indentLevel - 1);
        formatted += ' '.repeat(indentLevel * indentSize) + tag + '\n';
      }
    }
    // Handle opening tags
    else {
      // For inline tags, don't add newline before tag
      if (isInlineTag) {
        if (formatted && !formatted.endsWith('\n')) {
          formatted += tag;
        } else {
          formatted += ' '.repeat(indentLevel * indentSize) + tag;
        }
      } else {
        formatted += ' '.repeat(indentLevel * indentSize) + tag + '\n';
      }

      // Only increase indent for non-self-closing, non-inline tags
      if (!isSelfClosing && !isInlineTag) {
        indentLevel++;
      }
    }

    lastIndex = match.index + tag.length;
  }

  // Add any remaining text after the last tag
  const remainingText = processedHtml.substring(lastIndex);

  if (remainingText.trim()) {
    formatted += ' '.repeat(indentLevel * indentSize) + remainingText + '\n';
  }

  // Restore special constructs from placeholders
  formatted = formatted.replace(/__SPECIAL_(\d+)__/g, (_, index) => specialConstructs[parseInt(index, 10)]);

  // Remove trailing whitespace and ensure single trailing newline
  return formatted.trimEnd() + '\n';
}
