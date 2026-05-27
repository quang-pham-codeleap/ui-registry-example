import React from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '../../../popover';
import { ToggleGroupItem } from '../../../toggle-group';
import { Tooltip } from '../../../tooltip';
import IHtmlEditorToolbarPopoverActionProps from './IHtmlEditorToolbarPopoverActionProps';
import { Text } from '../../../text';
import { Box } from '../../../box';
import { cn } from '@/lib';

/**
 * Reusable base component for toolbar buttons that open a popover.
 *
 * Wraps a ToggleGroupItem inside a Radix Popover using the `asChild` pattern,
 * so the ToggleGroup context flows through the trigger transparently.
 * Includes a Tooltip that displays the ariaLabel on hover.
 *
 * Behavior:
 * - `children` renders inside PopoverContent.
 *   When omitted a German placeholder text is shown instead.
 * - Supports both controlled and uncontrolled modes:
 *   - Controlled: Pass `open` and `onOpenChange` props to manage state externally
 *   - Uncontrolled: Omit both props and let Radix manage state internally
 */
const HtmlEditorToolbarPopoverAction: React.FC<IHtmlEditorToolbarPopoverActionProps> = ({
  action,
  icon,
  label,
  ariaLabel,
  children,
  popoverWidth,
  open,
  onOpenChange,
}) => {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <Tooltip content={ariaLabel} asChild>
        <PopoverTrigger asChild>
          <ToggleGroupItem value={action} icon={icon} label={label} aria-label={ariaLabel} />
        </PopoverTrigger>
      </Tooltip>
      <PopoverContent className={cn('p-0', popoverWidth)}>
        {children ?? (
          <Box className="p-2">
            <Text type="muted">Wird in einem nächsten Schritt implementiert.</Text>
          </Box>
        )}
      </PopoverContent>
    </Popover>
  );
};

HtmlEditorToolbarPopoverAction.displayName = 'HtmlEditorToolbarPopoverAction';

export default HtmlEditorToolbarPopoverAction;
