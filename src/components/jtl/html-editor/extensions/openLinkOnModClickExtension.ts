import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';

/**
 * TipTap extension that opens links in a new tab when the user
 * holds Ctrl (Windows/Linux) or Cmd (Mac) while clicking.
 *
 * Without a modifier key, clicking a link selects it for editing
 * (standard editor behaviour). This mirrors the UX pattern used by
 * Google Docs, Notion, and other rich-text editors.
 *
 * How it works:
 *   1. A ProseMirror plugin registers a `handleClick` prop.
 *   2. On every click the handler checks for the modifier key.
 *   3. If modifier is held, it resolves the document position to find
 *      a `link` mark and reads its `href` attribute.
 *   4. The URL is opened in a new tab with `noopener,noreferrer` for security.
 *   5. The event is consumed (`return true`) to prevent the editor
 *      from also acting on the click.
 *
 * Requires `@tiptap/extension-link` to be registered so that the
 * `link` mark type exists in the schema.
 *
 * @see https://github.com/ueberdosis/tiptap/issues/3389
 */
const openLinkOnModClickExtension = Extension.create({
  name: 'openLinkOnModClick',

  /**
   * Registers a ProseMirror plugin that intercepts click events.
   * Only handles Ctrl/Cmd+Click on link marks; all other clicks
   * fall through to the default editor behaviour.
   */
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('openLinkOnModClick'),
        props: {
          /**
           * ProseMirror click handler.
           *
           * @param view  - The editor view instance.
           * @param pos   - The document position under the cursor.
           * @param event - The native mouse event.
           * @returns `true` to consume the event, `false` to let other handlers process it.
           */
          handleClick(view, pos, event) {
            // Only act when Ctrl (Windows/Linux) or Cmd (Mac) is held.
            const isModClick = event.ctrlKey || event.metaKey;

            if (!isModClick) {
              // No modifier — let the editor handle the click normally
              // (select text, place cursor, etc.).
              return false;
            }

            // Resolve the document position and inspect marks at the cursor.
            const { doc } = view.state;
            const resolvedPos = doc.resolve(pos);
            const marks = resolvedPos.marks();

            // Find the link mark among the marks at this position.
            const linkMark = marks.find(mark => mark.type.name === 'link');

            // No link mark or no href attribute — nothing to open.
            if (!linkMark || !linkMark.attrs.href) {
              return false;
            }

            // Open the URL in a new tab with security attributes.
            // 'noopener' prevents the new page from accessing window.opener.
            // 'noreferrer' prevents the Referer header from being sent.
            const href = String(linkMark.attrs.href);
            // Guard against dangerous protocols such as javascript:, data:, or vbscript:
            if (/^(javascript|data|vbscript):/i.test(href.trim())) {
              return false;
            }
            // Open the URL in a new tab with security attributes.
            // 'noopener' prevents the new page from accessing window.opener.
            // 'noreferrer' prevents the Referer header from being sent.
            window.open(href, '_blank', 'noopener,noreferrer');

            // Prevent the browser's default action (e.g. navigation) and
            // stop the event from reaching the editor's own click handler.
            event.preventDefault();
            return true;
          },
        },
      }),
    ];
  },
});

export default openLinkOnModClickExtension;
