import React from 'react';
import { Icon } from '../../../icon';
import ITableLoaderProps from './ITableLoaderProps';

const TableLoader: React.FC<ITableLoaderProps> = () => {
  return (
    <>
      <div className="absolute inset-0 bg-[var(--background)] opacity-70 z-10 rounded-[var(--border-radius-default)]"></div>
      <div className="absolute inset-0 flex items-center justify-center z-11">
        <Icon name="Loader" className="animate-spin text-[var(--primary)]" size={24} />
      </div>
    </>
  );
};

export default TableLoader;
