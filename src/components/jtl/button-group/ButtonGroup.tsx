import React from 'react';
import { cn } from '@/lib/utils';
import IButtonGroupProps from './IButtonGroupProps';

/**
 * ButtonGroup component that groups multiple buttons together
 * @param props {@link IButtonGroupProps} - The component props
 * @returns The rendered button group component
 *
 * @example
 * ```tsx
 * <ButtonGroup>
 *   <Button label="Left" />
 *   <Button label="Center" />
 *   <Button label="Right" />
 * </ButtonGroup>
 * ```
 *
 * @example
 * ```tsx
 * // Vertical orientation
 * <ButtonGroup orientation="vertical">
 *   <Button label="Top" />
 *   <Button label="Middle" />
 *   <Button label="Bottom" />
 * </ButtonGroup>
 * ```
 *
 * @example
 * ```tsx
 * // Full width
 * <ButtonGroup fullWidth>
 *   <Button label="Option 1" />
 *   <Button label="Option 2" />
 *   <Button label="Option 3" />
 * </ButtonGroup>
 * ```
 *
 * @example
 * ```tsx
 * // With dropdown menu — no wrapper or open/close state needed
 * const [selected, setSelected] = useState('Save');
 *
 * <ButtonGroup>
 *   <Button label={selected} variant="outline" onClick={handleSave} />
 *   <ButtonGroupSeparator />
 *   <DropdownMenu>
 *     <DropdownMenuTrigger asChild>
 *       <Button aria-label="Open save options" icon="ChevronDown" variant="outline" />
 *     </DropdownMenuTrigger>
 *     <DropdownMenuContent align="end">
 *       <DropdownMenuItem onSelect={() => setSelected('Save')}>Save</DropdownMenuItem>
 *       <DropdownMenuItem onSelect={() => setSelected('Save as draft')}>Save as draft</DropdownMenuItem>
 *     </DropdownMenuContent>
 *   </DropdownMenu>
 * </ButtonGroup>
 * ```
 */
const ButtonGroup: React.FC<IButtonGroupProps> = ({ orientation = 'horizontal', fullWidth = false, children, ...props }) => {
  return (
    <div
      className={cn(
        'inline-flex',
        orientation === 'horizontal' ? 'flex-row' : 'flex-col',
        fullWidth && 'w-full',
        '[&>button]:relative',
        '[&>button]:focus:z-10',
        orientation === 'horizontal'
          ? [
              '[&>button:not(:first-child):not(:last-child)]:rounded-none',
              '[&>button:first-child:not(:last-child)]:rounded-r-none',
              '[&>button:last-child:not(:first-child)]:rounded-l-none',
              '[&>button:not(:first-child)]:border-l-0',
            ]
          : [
              '[&>button:not(:first-child):not(:last-child)]:rounded-none',
              '[&>button:first-child:not(:last-child)]:rounded-b-none',
              '[&>button:last-child:not(:first-child)]:rounded-t-none',
              '[&>button:not(:first-child)]:border-t-0',
            ],
        fullWidth && '[&>button]:flex-1',
      )}
      {...props}
    >
      {children}
    </div>
  );
};

ButtonGroup.displayName = 'ButtonGroup';

export default ButtonGroup;
