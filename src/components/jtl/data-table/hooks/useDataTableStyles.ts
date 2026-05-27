import { TableStyle } from '../../table/types';

/**
 * Get style from context
 * @param defaultStyle Default style
 * @param key Key of style
 * @returns Style from context
 */
export default function useDataTableStyles<Key extends keyof TableStyle>(
  defaultStyle: TableStyle[Key],
  key: Key,
  styles?: TableStyle,
): TableStyle[Key] {
  return Object.keys(defaultStyle).reduce(
    (acc, k) => {
      let newValue = defaultStyle[k as keyof TableStyle[Key]];
      if (styles && styles[key] && styles[key][k as keyof TableStyle[keyof TableStyle]]) {
        newValue = styles[key][k as keyof TableStyle[keyof TableStyle]];
      }
      if (newValue) {
        acc[k as keyof TableStyle[Key]] = newValue;
      }
      return acc;
    },
    {} as TableStyle[Key],
  );
}
