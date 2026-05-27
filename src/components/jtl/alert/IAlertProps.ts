import React from 'react';
import { AlertVariant } from './types';
import { IconType } from '../icon';

/**
 * Props for Alert component
 * @interface IAlertProps
 */
export default interface IAlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'style'> {
  /**
   * Title of the alert
   */
  title?: string;
  /**
   * Optional description text
   */
  description?: React.ReactNode;
  /**
   * Optional icon component
   */
  icon?: IconType;
  /**
   * Whether the alert can be closed
   * @default true
   */
  closable?: boolean;
  /**
   * Variant for styling
   * @default 'default'
   */
  variant?: AlertVariant;

  /**
   * Whether the icon should be shown
   * @default true
   */
  isShowIcon?: boolean;

  /**
   * Callback function to be called when the alert is closed
   */
  onClose?: () => void;
}
