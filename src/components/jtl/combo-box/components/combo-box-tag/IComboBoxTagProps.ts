import React from 'react';

/**
 * Props interface for the ComboBoxTag component.
 */
export default interface IComboBoxTagProps {
  /**
   * Label of the tag
   */
  label: React.ReactNode;
  /**
   * Callback function to handle tag close
   */
  onClose: (e: React.MouseEvent) => void;
}
