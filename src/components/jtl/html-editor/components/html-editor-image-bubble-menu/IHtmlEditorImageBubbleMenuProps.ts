import { SelectedImageData, HandleToolbarAction } from '../../types';

/**
 * Props for the HtmlEditorImageBubbleMenu component.
 * Shown when an image node is selected in the editor.
 */
export default interface IHtmlEditorImageBubbleMenuProps {
  /**
   * The currently selected image data (src, alt, alignment).
   * When null, the bubble menu should not render.
   */
  selectedImage: SelectedImageData | null;

  /**
   * Callback fired when the user interacts with the bubble menu.
   * Calls typed actions like:
   *   - onAction('imageAlignment', { alignment: 'center' })
   *   - onAction('imageAlt', { alt: 'new alt text' })
   *   - onAction('deleteImage')
   */
  onAction?: HandleToolbarAction;
}
