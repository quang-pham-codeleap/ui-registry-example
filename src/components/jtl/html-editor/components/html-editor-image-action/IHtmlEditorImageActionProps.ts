import React from 'react';
import { SelectedImageData, HandleToolbarAction } from '../../types';

/**
 * Props for the HtmlEditorImageAction component.
 */
export default interface IHtmlEditorImageActionProps extends React.PropsWithChildren {
  /**
   * Callback fired when the user submits image data from the popover.
   * Calls onAction('insertImage', { src, alt, alignment }) to insert the image.
   */
  onAction?: HandleToolbarAction;

  /**
   * Current image data when editing an existing image.
   * If provided, the popover inputs will be pre-filled with these values.
   * When null, the popover is ready for creating a new image.
   */
  selectedImage?: SelectedImageData | null;

  /**
   * When true, the popover is forced open from the outside (e.g. after a clipboard paste attempt).
   * The component syncs this to its internal open state via useEffect.
   */
  open?: boolean;

  /**
   * Called when the popover closes so the parent can reset the forced-open state.
   */
  onOpenChange?: (open: boolean) => void;
}
