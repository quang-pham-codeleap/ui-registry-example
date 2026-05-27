export const directions = {
  row: 'flex-row',
  rowReverse: 'flex-row-reverse',
  column: 'flex-col',
  columnReverse: 'flex-col-reverse',
};

type Direction = keyof typeof directions;

export default Direction;
