import HandleToolbarAction from '../../types/HandleToolbarAction';

/**
 * Props for the TypographyAction component.
 */
export default interface IHtmlEditorTypographyActionProps {
  /** Fired when the user selects a typography style (e.g. 'h1', 'body', 'small'). */
  onAction: HandleToolbarAction;
  /** The currently active text style value (e.g. 'h1', 'body'). Used to show the check icon. */
  selectedStyle?: string;
}
