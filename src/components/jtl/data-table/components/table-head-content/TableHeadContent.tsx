import { memo } from 'react';
import { flexRender } from '@tanstack/react-table';
import { Text } from '../../../text';
import { Box } from '../../../box';
import { cn } from '@/lib';
import { DataTableSortButton } from '../data-table-sort-button';
import { DataTableHeadAction } from '../data-table-head-action';
import ITableHeadContentProps from './ITableHeadContentProps';
import { useDataTableStaticContext, useDataTableStyles } from '../../hooks';

/**
 * TableHeadContent component for rendering the table head content
 */
const TableHeadContent = <T extends object>({
  headerDef,
  headerContext,
  isSelectionColumn,
  isActionColumn,
  isSorting,
  sorting,
  columnAlign,
  column,
  columnActionEnabled,
}: ITableHeadContentProps<T>) => {
  // Get styles from context
  const { styles } = useDataTableStaticContext<T>();

  // Get text style from context
  const headerTextProps = useDataTableStyles({ color: 'muted' }, 'headerText', styles);

  if (isSelectionColumn || isActionColumn) {
    return <>{flexRender(headerDef, headerContext)}</>;
  }

  return (
    <>
      <Box
        className={cn(
          'flex items-center w-full gap-1',
          columnActionEnabled && 'w-[calc(100%-28px)]',
          columnAlign && `justify-${columnAlign}`,
          '[&_span]:leading-[var(--typography-base-sizes-small-line-height)]',
        )}
      >
        <Text as="span" type="muted" weight="medium" truncate {...headerTextProps}>
          {flexRender(headerDef, headerContext)}
        </Text>
        {isSorting && sorting?.direction && <DataTableSortButton sortDirection={sorting?.direction} />}
      </Box>
      {columnActionEnabled && column && <DataTableHeadAction column={column} />}
    </>
  );
};

export default memo(TableHeadContent) as typeof TableHeadContent;
