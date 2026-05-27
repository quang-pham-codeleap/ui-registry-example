import React from 'react';
import { JTLDropdown } from '../../../jtl-dropdown';
import { BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbSeparator } from '../../BreadcrumbPrimitives';
import IBreadcrumbEllipsisDropdownProps from './IBreadcrumbEllipsisDropdownProps';

/**
 * Render the ellipsis dropdown
 */
const BreadcrumbEllipsisDropdown: React.FC<IBreadcrumbEllipsisDropdownProps> = ({ ellipsisDropdownMenuItems }) => {
  return (
    <>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <JTLDropdown menuItems={ellipsisDropdownMenuItems}>
          <BreadcrumbEllipsis />
        </JTLDropdown>
      </BreadcrumbItem>
    </>
  );
};

export default BreadcrumbEllipsisDropdown;
