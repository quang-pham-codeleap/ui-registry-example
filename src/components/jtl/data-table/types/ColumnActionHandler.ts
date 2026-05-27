import ColumnActionState from './ColumnActionState';

/**
 * Column action handler type
 * @param enabled If true, shows a dropdown menu on each column header with actions like sort, hide, etc
 * @param onClick Callback when an action is triggered from a column header's dropdown menu
 */
type ColumnActionHandler = {
  enabled?: boolean;
  onClick?: (action: ColumnActionState) => void;
};

export default ColumnActionHandler;
