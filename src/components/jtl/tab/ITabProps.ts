import { ITab } from './interfaces';

/**
 * Props for the Tabs component
 */
export default interface ITabProps {
  /**
   * Array of tabs to display.
   * Each tab must have a unique ID.
   * @type ITab[] - { id: string, title: string }[]
   */
  tabs: ITab[];

  /**
   * ID of the currently active tab.
   * Must match the ID of one of the provided tabs.
   */
  activeTab: string;

  /**
   * Callback when a tab is selected.
   * @param tabId - The ID of the selected tab
   */
  onSelectTab: (tabId: string) => void;
}
