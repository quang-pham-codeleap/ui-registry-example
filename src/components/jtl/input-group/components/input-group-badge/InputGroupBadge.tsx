import React from 'react';
import { Badge } from '../../../badge';
import IInputGroupBadgeProps from './IInputGroupBadgeProps';
import { InputGroupAddonWrapper } from '../input-group-addon-wrapper';

/**
 * InputGroup component wraps the Badge component for status cues or counts.
 * Used to display currency codes, units, status indicators, etc.
 *
 * @param props {@link IInputGroupBadgeProps} - Props for the InputGroupBadge component
 * @returns The rendered InputGroupBadge component
 *
 * @example
 * ```tsx
 * // Currency indicator on the right
 * <InputGroup>
 *   <InputGroupInput placeholder="0.00" />
 *   <InputGroupBadge side="right" label="USD" />
 * </InputGroup>
 * ```
 *
 * @example
 * ```tsx
 * // Status indicator with icon
 * <InputGroup>
 *   <InputGroupInput value="verified@email.com" />
 *   <InputGroupBadge
 *     side="right"
 *     label="Verified"
 *     variant="success"
 *     icon="CheckCircle"
 *   />
 * </InputGroup>
 * ```
 */
const InputGroupBadge: React.FC<IInputGroupBadgeProps> = ({ label, variant = 'secondary', icon }) => {
  return (
    <InputGroupAddonWrapper>
      <Badge label={label} variant={variant} icon={icon} />
    </InputGroupAddonWrapper>
  );
};

InputGroupBadge.displayName = 'InputGroupBadge';

export default InputGroupBadge;
