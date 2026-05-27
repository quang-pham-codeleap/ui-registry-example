export const itemAligns = {
  start: 'items-start',
  end: 'items-end',
  center: 'items-center',
  baseline: 'items-baseline',
  stretch: 'items-stretch',
};

type ItemAlign = keyof typeof itemAligns;
export default ItemAlign;
