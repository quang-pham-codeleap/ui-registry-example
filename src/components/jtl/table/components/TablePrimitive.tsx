import React from 'react';

import { cn } from '@/lib/utils';

const Table = ({ className, ...props }: React.HTMLAttributes<HTMLTableElement> & React.RefAttributes<HTMLTableElement>) => (
  <table className={cn('w-full caption-bottom text-sm', className)} {...props} />
);
Table.displayName = 'Table';

const TableHeader = ({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement> & React.RefAttributes<HTMLTableSectionElement>) => (
  <thead className={cn('[&_tr]:border-b-0 [&_tr]:border-[var(--border)]', className)} {...props} />
);
TableHeader.displayName = 'TableHeader';

const TableBody = ({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement> & React.RefAttributes<HTMLTableSectionElement>) => (
  <tbody className={cn('[&_tr:last-child]:border-0', className)} {...props} />
);
TableBody.displayName = 'TableBody';

const TableFooter = ({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement> & React.RefAttributes<HTMLTableSectionElement>) => (
  <tfoot className={cn('border-t bg-muted/50 font-medium [&>tr]:last:border-b-0', className)} {...props} />
);
TableFooter.displayName = 'TableFooter';

const TableRow = ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement> & React.RefAttributes<HTMLTableRowElement>) => (
  <tr className={cn('border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted border-[var(--border)]', className)} {...props} />
);
TableRow.displayName = 'TableRow';

const TableHead = ({ className, ...props }: React.ThHTMLAttributes<HTMLTableCellElement> & React.RefAttributes<HTMLTableCellElement>) => (
  <th className={cn('h-10 px-4 text-left align-middle font-medium text-muted-foreground ', className)} {...props} />
);
TableHead.displayName = 'TableHead';

const TableCell = ({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement> & React.RefAttributes<HTMLTableCellElement>) => (
  <td className={cn('p-4 align-middle ', className)} {...props} />
);
TableCell.displayName = 'TableCell';

const TableCaption = ({ className, ...props }: React.HTMLAttributes<HTMLTableCaptionElement> & React.RefAttributes<HTMLTableCaptionElement>) => (
  <caption className={cn('mt-4 text-sm text-muted-foreground', className)} {...props} />
);
TableCaption.displayName = 'TableCaption';

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
