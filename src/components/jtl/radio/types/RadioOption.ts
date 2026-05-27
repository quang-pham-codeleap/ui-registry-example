import React from 'react';

type RadioOption = {
  /**
   * The label text to display next to the radio button
   */
  label: React.ReactNode;
  /**
   * The value associated with this radio option
   */
  value: string | number;
  /**
   * Optional description text to display below the label
   */
  description?: string;
};

export default RadioOption;
