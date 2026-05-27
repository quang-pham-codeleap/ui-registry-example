import React, { useCallback, useState } from 'react';
import { AlertDescription, AlertTitle, AlertWrapper } from './AlertPrimitives';
import { Icon, LucideIconName } from '../icon';
import IAlertProps from './IAlertProps';
import { AlertVariant } from './types';
import { cn } from '@/lib';
import { IconExtend } from '../icon/components';

/**
 * Default icon mapping for different alert variants
 * Each alert type has a corresponding icon for visual identification
 */
const ALERT_VARIANT_ICONS = {
  default: 'Terminal',
  destructive: 'CircleAlert',
  success: 'CircleCheck',
  secondary: 'Terminal',
  info: 'Info',
  warning: 'TriangleAlert',
} as const satisfies Record<AlertVariant, LucideIconName>;

/**
 * Standard size for all icons used in alerts (in pixels)
 */
const ALERT_ICON_SIZE = 16;

/**
 * Alert component that displays important messages with various visual styles.
 * Used for communicating state, notifications or providing feedback to the user.
 *
 * @component
 *
 * @param props {@link IAlertProps} - The component props
 *
 * @example
 * // Basic usage with title and description
 * <Alert
 *   title="Alert Title"
 *   description="This is an alert description."
 * />
 *
 * @example
 * // Destructive variant for errors
 * <Alert
 *   title="Error Alert"
 *   description="Something went wrong."
 *   variant="destructive"
 * />
 *
 * @example
 * // Info variant for information
 * <Alert
 *   title="Info Alert"
 *   description="Here's some information."
 *   variant="info"
 * />
 *
 * @example
 * // Success variant for confirmations
 * <Alert
 *   title="Success Alert"
 *   description="Operation completed successfully."
 *   variant="success"
 * />
 *
 * @example
 * // Warning variant for warnings
 * <Alert
 *   title="Warning Alert"
 *   description="Please be careful."
 *   variant="warning"
 * />
 *
 * @example
 * // Alert with only title
 * <Alert title="Simple Alert" />
 *
 * @example
 * // Alert with only description
 * <Alert description="Alert message without title" />
 *
 * @example
 * // Alert without close button and icon
 * <Alert
 *   title="Simple alert without icons and closing"
 *   closable={false}
 *   isShowIcon={false}
 * />
 *
 * @returns {JSX.Element} Alert component
 */
const Alert: React.FC<IAlertProps & React.RefAttributes<HTMLDivElement>> = ({
  title,
  icon,
  description,
  variant = 'default',
  closable = true,
  isShowIcon = true, // Whether to show the icon
  ref,
  onClose,
  ...props
}) => {
  // Track visibility state internally
  const [isVisible, setIsVisible] = useState(true);

  /**
   * Handle alert dismissal
   * - Updates internal visibility state
   * - Calls the optional onClose callback if provided
   */
  const handleClose = useCallback(() => {
    setIsVisible(false);
    onClose?.();
  }, [onClose]);

  // Early return if alert is dismissed
  if (!isVisible) {
    return null;
  }

  // Early return if alert has no content
  if (!title && !description) {
    return null;
  }

  /**
   * Determine which icon to display:
   * - Use custom icon if provided
   * - Otherwise use the default icon for the current variant
   */
  const iconName = icon || ALERT_VARIANT_ICONS[variant as AlertVariant];

  /**
   * Determine description positioning class based on title presence
   * - When title exists: description spans 2 columns starting from column 2
   * - When no title: description starts at row 1, column 2
   */
  const descriptionPositionClass = !title ? 'row-start-1 col-start-2' : 'col-span-2 col-start-2';

  return (
    <AlertWrapper ref={ref} variant={variant} {...props}>
      {/* Grid layout for alert content:
          - Column 1: Icon (if shown)
          - Column 2: Title/Description text
          - Column 3: Close button (if closable)
       */}
      <div className="grid grid-cols-[auto_1fr_auto] grid-rows-[auto_auto] gap-x-4 gap-y-1">
        {/* Alert Icon */}
        {isShowIcon && (
          <div className={title ? 'self-center' : 'self-start'}>
            <IconExtend icon={iconName} size={ALERT_ICON_SIZE} />
          </div>
        )}

        {/* Alert Title */}
        {title && <AlertTitle className="self-center font-medium">{title}</AlertTitle>}

        {/* Close Button */}
        {closable && (
          <button
            onClick={handleClose}
            className={cn('hover:opacity-70 hover:cursor-pointer transition-opacity', title ? 'self-center' : 'self-start')}
            aria-label="Close alert"
            type="button"
          >
            <Icon name="X" size={ALERT_ICON_SIZE} />
          </button>
        )}

        {/* Alert Description */}
        {description && <AlertDescription className={cn('self-center font-normal', descriptionPositionClass)}>{description}</AlertDescription>}
      </div>
    </AlertWrapper>
  );
};

Alert.displayName = 'Alert';

export default Alert;
