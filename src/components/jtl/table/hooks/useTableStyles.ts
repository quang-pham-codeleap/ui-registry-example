import { TableContext } from '../context';
import { TableStyle } from '../types';
import { useContext } from 'react';

/**
 * Get style from context
 * @param defaultStyle Default style
 * @param key Key of style
 * @returns Style from context
 */
export default function useTableStyles<Key extends keyof TableStyle>(defaultStyle: TableStyle[Key], key: Key): TableStyle[Key] {
  const context = useContext(TableContext);

  return Object.keys(defaultStyle).reduce(
    (acc, k) => {
      const newValue = context[key]?.[k as keyof TableStyle[keyof TableStyle]] || defaultStyle[k as keyof TableStyle[Key]];
      if (newValue) {
        acc[k as keyof TableStyle[Key]] = newValue;
      }
      return acc;
    },
    {} as TableStyle[Key],
  );
}
