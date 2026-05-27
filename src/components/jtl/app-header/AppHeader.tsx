import React, { useCallback } from 'react';
import { cn } from '@/lib/utils';
import { StyledIcon } from '../styled-icon';
import { Tag } from '../tag';
import { Badge } from '../badge';
import { Separator } from '../separator';
import { Text } from '../text';
import { Icon } from '../icon';
import { Button } from '../button';
import { TitleCombobox } from './components/title-combobox';
import IAppHeaderProps from './IAppHeaderProps';

/**
 * AppHeader component renders a configurable header bar for app sections.
 * It supports a title (as text or combobox dropdown), breadcrumb navigation,
 * styled icon, inline tags, badge, action buttons, and a plugins toggle.
 *
 * @component
 *
 * @param props {@link IAppHeaderProps} - The component props
 *
 * @example
 * // Basic usage
 * <AppHeader title="Dashboard" />
 *
 * @example
 * // With icon and subtitle
 * <AppHeader
 *   title="Orders"
 *   subtitle="Manage your orders"
 *   icon={{ icon: "ShoppingCart", variant: "primary" }}
 * />
 *
 * @example
 * // With combobox title
 * <AppHeader
 *   title="Shop A"
 *   titleOptions={[{ label: "Shop A", value: "a" }, { label: "Shop B", value: "b" }]}
 *   onTitleChange={(value) => console.log(value)}
 * />
 *
 * @returns {JSX.Element} AppHeader component
 */
const AppHeader: React.FC<IAppHeaderProps> = ({
  title,
  titleOptions,
  onTitleChange,
  subtitle,
  breadcrumb,
  icon,
  tags,
  badge,
  actions,
  onPuzzleToggle,
  showPuzzleButton = true,
  className,
}) => {
  /** Handles puzzle toggle button click */
  const handlePuzzleToggle = useCallback(() => {
    onPuzzleToggle?.();
  }, [onPuzzleToggle]);

  /** Whether the title should render as a combobox dropdown */
  const hasTitleOptions = titleOptions && titleOptions.length > 0;

  return (
    <header aria-label="App Header" className={cn('flex flex-col gap-1.5', className)}>
      {/* Breadcrumb row */}
      {breadcrumb && (
        <div className="flex items-center gap-5 self-stretch">
          {breadcrumb.icon && (
            <div className="p-2">
              <Icon name={breadcrumb.icon} size={12} />
            </div>
          )}
          <Text type="small" color="muted">
            {breadcrumb.title}
          </Text>
        </div>
      )}

      {/* Main row */}
      <div className="flex items-center justify-between gap-4">
        {/* Left section */}
        <div className="flex items-center gap-4 min-w-0">
          {icon && <StyledIcon icon={icon.icon} variant={icon.variant} size={icon.size} />}

          <div className="flex flex-col gap-0.5 min-w-0">
            {/* Title area: title/combobox + tags + separator + badge */}
            <div className="flex flex-wrap items-center gap-4 min-w-0">
              {hasTitleOptions ? (
                <TitleCombobox title={title} titleOptions={titleOptions} onTitleChange={onTitleChange} />
              ) : (
                <Text type="h3" weight="semibold">
                  {title}
                </Text>
              )}

              {tags && tags.length > 0 && (
                <>
                  <div className="h-5">
                    <Separator orientation="vertical" />
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {tags.map((tagProps, index) => (
                      <Tag key={`${tagProps.label}-${index}`} {...tagProps} />
                    ))}
                  </div>
                </>
              )}

              {badge && (
                <>
                  <div className="h-5">
                    <Separator orientation="vertical" />
                  </div>
                  <div aria-live="polite">
                    <Badge {...badge} />
                  </div>
                </>
              )}
            </div>

            {/* Subtitle */}
            {subtitle && (
              <Text type="small" color="muted">
                {subtitle}
              </Text>
            )}
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-3 shrink-0">
          {actions}
          {onPuzzleToggle && showPuzzleButton && (
            <Button variant="secondary" size="icon" icon="Puzzle" onClick={handlePuzzleToggle} aria-label="Toggle puzzle" />
          )}
        </div>
      </div>
    </header>
  );
};

AppHeader.displayName = 'AppHeader';

export default AppHeader;
