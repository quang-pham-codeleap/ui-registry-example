import React from 'react';
import { Root } from '@radix-ui/react-label';
import { LabelVariant } from './types';

type OmitLabelProps = Omit<React.ComponentPropsWithRef<typeof Root>, 'asChild'>;

/**
 * Label props interface
 * @interface ILabelProps
 * @extends {React.ComponentPropsWithRef<typeof Root>}
 */
export default interface ILabelProps extends OmitLabelProps {
  /**
   * The variant of the label, which determines its styling.
   */
  variant?: LabelVariant;
}
