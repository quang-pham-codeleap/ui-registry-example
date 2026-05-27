import { IconType } from '../../icon';

/**
 * Interface representing a tab in the Tab component
 */
export default interface ITab {
  /**
   * Unique identifier for the tab
   */
  id: string;

  /**
   * Display text for the tab
   */
  title: string;

  /**
   * Optional icon to display before the tab title.
   * Accepts a Lucide icon name string or a React node.
   */
  icon?: IconType;
}
