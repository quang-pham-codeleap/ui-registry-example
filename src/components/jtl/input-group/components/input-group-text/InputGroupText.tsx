import React, { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Text } from '../../../text';
import IInputGroupTextProps from './IInputGroupTextProps';
import { inputGroupSizes, inputGroupSideBorderRadius } from '../../types';
import { useInputGroupContext, useInputGroupAddonContext } from '../../hooks';

/**
 * InputGroupText component wraps the Text component for displaying static labels or units.
 * Commonly used for prefixes like "https://" or suffixes like currency symbols.
 *
 * @param props {@link IInputGroupTextProps} - Props for the InputGroupText component
 * @returns The rendered InputGroupText component
 *
 * @example
 * ```tsx
 * // External addon on the left
 * <InputGroup>
 *   <InputGroupText side="left">https://</InputGroupText>
 *   <InputGroupInput placeholder="example.com" />
 * </InputGroup>
 * ```
 *
 * @example
 * ```tsx
 * // Inline addon for currency
 * <InputGroup>
 *   <InputGroupInput placeholder="0.00" />
 *   <InputGroupText side="right" inline>USD</InputGroupText>
 * </InputGroup>
 * ```
 */
const InputGroupText: React.FC<IInputGroupTextProps> = ({ children }) => {
  /**
   * Get context values from parent InputGroup
   */
  const { size } = useInputGroupContext();
  const { inline, side } = useInputGroupAddonContext();
  /**
   * Compute styles based on size and side
   */
  const sizeStyles = useMemo(() => inputGroupSizes[size], [size]);
  const sideStyles = useMemo(() => inputGroupSideBorderRadius[side], [side]);

  /**
   * External addon styles - appears outside the input with background
   */
  const externalStyles = cn('flex items-center justify-center', 'bg-[var(--input)]', sizeStyles.height, sizeStyles.padding, sideStyles.borderRadius);

  /**
   * Inline addon styles - appears inside the input without background
   */
  const inlineStyles = cn('flex items-center justify-center', 'text-[var(--muted-foreground)]');

  return (
    <div className={inline ? inlineStyles : externalStyles}>
      <Text type="small" weight="medium" color={inline ? 'muted' : 'default'}>
        {children}
      </Text>
    </div>
  );
};

InputGroupText.displayName = 'InputGroupText';

export default InputGroupText;
