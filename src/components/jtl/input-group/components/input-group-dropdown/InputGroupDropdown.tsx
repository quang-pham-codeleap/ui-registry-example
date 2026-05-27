import React, { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { DropdownItem, JTLDropdown } from '../../../jtl-dropdown';
import { Button } from '../../../button';
import IInputGroupDropdownProps from './IInputGroupDropdownProps';
import { InputGroupButton } from '../input-group-button';
import { useInputGroupAddonContext } from '../../hooks';

/**
 * InputGroupDropdown component wraps JTLDropdown for selection menus within InputGroup.
 * Provides a dropdown trigger that matches the input group styling.
 *
 * @param props {@link IInputGroupDropdownProps} - Props for the InputGroupDropdown component
 * @returns The rendered InputGroupDropdown component
 *
 * @example
 * ```tsx
 * // External dropdown on the left for country code selection
 * <InputGroup>
 *   <InputGroupDropdown
 *     label="+1"
 *     menuItems={[
 *       { type: 'item', label: '+1 (US)' },
 *       { type: 'item', label: '+44 (UK)' },
 *     ]}
 *   />
 *   <InputGroupInput placeholder="Phone number" />
 * </InputGroup>
 * ```
 */
const InputGroupDropdown: React.FC<IInputGroupDropdownProps> = ({ label, menuItems, disabled = false, onClose, width }) => {
  const { side, inline } = useInputGroupAddonContext();

  /**
   * External dropdown trigger styles
   */
  const externalTriggerStyles = cn(side === 'left' && '[&_button]:border-r-0', side === 'right' && '[&_button]:border-l-0');

  /**
   * Inline dropdown trigger styles
   */
  const inlineTriggerStyles = cn('flex items-center justify-center', 'bg-transparent', 'cursor-pointer');

  /**
   * Render the dropdown trigger based on inline prop
   */
  const triggerElement = inline ? (
    <Button variant="ghost" size={'xs'} label={label} icon="ChevronDown" iconPosition="right" disabled={disabled} />
  ) : (
    <InputGroupButton variant={'outline'} label={label} icon="ChevronDown" iconPosition="right" disabled={disabled} />
  );

  const newMenu = useMemo(() => menuItems.map(item => ({ type: DropdownItem.Default, ...item })), [menuItems]);

  return (
    <div className={inline ? inlineTriggerStyles : externalTriggerStyles}>
      <JTLDropdown menuItems={newMenu} onClose={onClose} width={width}>
        {triggerElement}
      </JTLDropdown>
    </div>
  );
};

InputGroupDropdown.displayName = 'InputGroupDropdown';

export default InputGroupDropdown;
