export const justifyContent = {
  start: 'justify-start',
  end: 'justify-end',
  center: 'justify-center',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
  stretch: 'justify-stretch',
  baseline: 'justify-baseline',
  normal: 'justify-normal',
};

type Justify = keyof typeof justifyContent;
export default Justify;
