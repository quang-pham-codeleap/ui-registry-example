import React from 'react';
import { Label } from '../label';
import IErrorMessageProps from './IErrorMessageProps';

const ErrorMessage: React.FC<IErrorMessageProps> = ({ message, id }) => {
  if (!message) return null;
  // role="alert" announces the error to screen readers immediately when it appears
  return (
    <Label id={id} variant="error" role="alert">
      {message}
    </Label>
  );
};

export default ErrorMessage;
