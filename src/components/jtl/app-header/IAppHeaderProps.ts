import React from 'react';
import { LucideIconName } from '../icon/IIconProps';
import ITagProps from '../tag/ITagProps';
import IBadgeProps from '../badge/IBadgeProps';
import type { IStyledIconProps } from '../styled-icon';

/**
 * Props for the AppHeader component.
 * A header bar used at the top of app sections with configurable title,
 * icon, breadcrumb, tags, badge, actions, and plugins toggle.
 */
export default interface IAppHeaderProps {
  /** Page title displayed as text. When `titleOptions` is provided, this is the currently selected value. */
  title: string;

  /** When provided, title becomes a combobox dropdown with these options */
  titleOptions?: Array<{ label: string; value: string }>;

  /** Callback when a title option is selected (combobox mode) */
  onTitleChange?: (value: string) => void;

  /** Optional subtitle below the title */
  subtitle?: string;

  /** Optional breadcrumb above the title with an optional icon */
  breadcrumb?: {
    title: string;
    icon?: LucideIconName;
  };

  /** Styled icon displayed to the left of the title */
  icon?: IStyledIconProps;

  /** Tags displayed inline after the title */
  tags?: ITagProps[];

  /** Badge displayed after the tags (e.g. save state) */
  badge?: IBadgeProps;

  /** JSX slot for action buttons on the right side */
  actions?: React.ReactNode;

  /** Callback when puzzle icon is clicked. Renders the puzzle icon when provided. */
  onPuzzleToggle?: () => void;

  /**
   * Controls whether the puzzle toggle button is visible.
   * Defaults to `true`. Set to `false` to hide the button even when `onPuzzleToggle` is provided.
   * Useful when the AppHeader is used in secondary sections where only one puzzle button should appear.
   */
  showPuzzleButton?: boolean;

  /** Additional CSS class names */
  className?: string;
}
