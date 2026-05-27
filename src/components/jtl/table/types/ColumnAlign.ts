export const columnAligns = {
  start: 'text-left',
  center: 'text-center',
  end: 'text-right',
};

/**
 * Available column alignment values for the Table component
 */
export const ColumnAligns = Object.keys(columnAligns) as ColumnAlign[];

type ColumnAlign = keyof typeof columnAligns;

export default ColumnAlign;
