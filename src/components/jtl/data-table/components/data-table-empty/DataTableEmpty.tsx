import React from 'react';
import { TableBody, TableCell, TableRow } from '../../../table/components/TablePrimitive';
import IDataTableEmptyProps from './IDataTableEmptyProps';

/**
 * DataTableEmpty component for rendering empty state
 */
const DataTableEmpty: React.FC<IDataTableEmptyProps> = ({ colSpan, emptyContent }) => {
  return (
    <TableBody>
      <TableRow>
        <TableCell colSpan={colSpan} className="text-center py-6">
          {emptyContent}
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default DataTableEmpty;
