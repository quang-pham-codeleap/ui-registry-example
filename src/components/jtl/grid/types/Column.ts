import DesktopColumnSpan from './DesktopColumnSpan';
import MobileColumnSpan from './MobileColumnSpan';

/**
 * Type for responsive values
 */
type Column = {
  /**
   * Default value
   */
  xs?: MobileColumnSpan;

  /**
   * Small value for breakpoints minimum width of 640px
   */
  sm?: MobileColumnSpan;

  /**
   * Medium value for breakpoints minimum width of 768px
   */
  md?: MobileColumnSpan;

  /**
   * Large value for breakpoints minimum width of 1024px
   */
  lg?: DesktopColumnSpan;

  /**
   * Extra large value for breakpoints minimum width of 1280px
   */
  xl?: DesktopColumnSpan;
};

export default Column;
