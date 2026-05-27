import ToolbarAction from './ToolbarAction';
import ToolbarActionDataMap from './ToolbarActionDataMap';

/**
 * Generic function type for the HTML editor toolbar action handler.
 *
 * TypeScript infers the correct data type from the action name at the call site:
 *   - Actions listed in {@link ToolbarActionDataMap} require a typed `data` argument.
 *   - All other actions (e.g. 'undo', 'bold') take no data argument.
 *
 * @example
 * // Requires data — TypeScript enforces SetColorData shape:
 * onAction('textColor', { color: '#ff0000' });
 *
 * // No data allowed — TypeScript rejects extra arguments:
 * onAction('undo');
 *
 * // Wrong data shape — TypeScript compile error:
 * onAction('textColor', { url: '...' });
 */
type HandleToolbarAction = <A extends ToolbarAction>(
  action: A,
  // For actions with data: the second argument is required and typed.
  // For actions without data: no second argument is allowed.
  ...args: A extends keyof ToolbarActionDataMap ? [data: ToolbarActionDataMap[A]] : []
) => void;

export default HandleToolbarAction;
