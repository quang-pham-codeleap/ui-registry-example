import { IconType } from '../../../icon';
import { ICustomComponentConfig } from '../../interfaces';

/**
 * Interface for breadcrumb item
 */
export default interface IBreadcrumbItemProps extends ICustomComponentConfig {
  /**
   * Label to display for the breadcrumb item
   */
  label?: string;

  /**
   * Route/URL for the breadcrumb item
   */
  route?: string;

  /**
   * Children breadcrumb items
   */
  children?: IBreadcrumbItemProps[];

  /**
   * Whether the breadcrumb item is the last item
   */
  isLastItem?: boolean;

  /**
   * Callback function to be called when the breadcrumb item is clicked
   */
  onClick?: () => void;

  /**
   * Icon to display for the breadcrumb item
   */
  icon?: IconType;
}
