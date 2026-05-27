import React from 'react';
import { ITextProps } from '../../text';

/**
 * TableStyle type
 * Using for define style of table and internal only
 */
type TableStyle = {
  header: Pick<React.CSSProperties, 'backgroundColor'>;
  headerText: Pick<ITextProps, 'color'>;
};

export default TableStyle;
