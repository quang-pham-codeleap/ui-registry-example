import React from 'react';
import { Root } from '@radix-ui/react-label';
import { cn } from '@/lib/utils';
import ILabelProps from './ILabelProps';
import { LabelVariant, labelVariants } from './types';

/**
 * Default class name for the label component
 */
const defaultClass = 'font-[family-name:var(--typography-font-family-font-sans)] disabled:cursor-not-allowed disabled:opacity-50';

/**
 * Label component that renders an accessible label associated with controls.
 * Supports different variants for styling.
 */
const Label: React.FC<ILabelProps> = ({ ref, className, variant = 'title', ...props }) => (
  <Root ref={ref} className={cn(defaultClass, labelVariants[variant as LabelVariant], className)} {...props} />
);
Label.displayName = Root.displayName;

export default Label;
