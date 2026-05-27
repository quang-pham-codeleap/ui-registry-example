import React from 'react';
import { AlertVariant } from '../types';

/**
 * Props for Alert Primitive Wrapper component
 */
export default interface IAlertWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
}
