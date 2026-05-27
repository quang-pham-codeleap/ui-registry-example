import RowActionMenuItem from './RowActionMenuItem';

/**
 * Props for the row action feature
 * @param enabled If true, shows a dropdown menu on each row with actions like delete, export, etc
 * @param menuItems An array of actions (e.g., "Delete", "Export") to display when row action is triggered.
 *
 * @example
 * ```tsx
 * const rowActionHandler: RowActionHandler<User> = {
 *   enabled: true,
 *   menuItems: [
 *     {
 *       label: 'Edit',
 *       icon: 'Edit',
 *       onClick: (record) => console.log('Edit', record),
 *     },
 *     {
 *       label: 'Delete',
 *       icon: 'Trash2',
 *       onClick: (record) => console.log('Delete', record),
 *     },
 *   ],
 * };
 * ```
 */
type RowActionHandler<T> = {
  enabled: boolean;
  menuItems: RowActionMenuItem<T>[];
};

export default RowActionHandler;
