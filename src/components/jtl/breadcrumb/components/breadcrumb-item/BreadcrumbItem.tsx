import React, { useCallback, useMemo } from 'react';
import { BreadcrumbLink, BreadcrumbPage } from '../../BreadcrumbPrimitives';
import IBreadcrumbItemProps from './IBreadcrumbItemProps';
import { JTLDropdown } from '../../../jtl-dropdown';
import { Icon } from '../../../icon';
import { IconExtend } from '../../../icon/components';
import { createMenuItem } from '../../utils';

/**
 * Render a breadcrumb item based on its type and position
 */
const BreadcrumbItem: React.FC<IBreadcrumbItemProps> = props => {
  const { label, route, isLastItem, onClick, children, icon, as: component, urlField } = props;
  const hasChildren = children && children.length > 0;

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (onClick) {
        e.preventDefault();
        onClick();
      }
    },
    [onClick],
  );

  const itemComponent = useMemo(
    () => (
      <BreadcrumbLink
        href={route}
        className="flex items-center gap-1 text-[var(--muted-foreground)]"
        onClick={handleClick}
        as={component}
        urlField={urlField}
      >
        {icon && <IconExtend icon={icon} size={16} />}
        {label}
      </BreadcrumbLink>
    ),
    [route, handleClick, icon, label, component, urlField],
  );

  if (!label && !icon) {
    console.warn('Breadcrumb: At least one of label or icon is required of BreadcrumbItem');
  }

  if (isLastItem) {
    return <BreadcrumbPage>{label}</BreadcrumbPage>;
  }

  if (hasChildren) {
    const itemDropdownMenuItems = children?.map(child => createMenuItem(child)) || [];

    return (
      <JTLDropdown menuItems={itemDropdownMenuItems}>
        <div className="flex items-center gap-1">
          {itemComponent}
          <Icon name="ChevronDown" size={16} className="text-[var(--muted-foreground)]" />
        </div>
      </JTLDropdown>
    );
  }

  return itemComponent;
};

export default BreadcrumbItem;
