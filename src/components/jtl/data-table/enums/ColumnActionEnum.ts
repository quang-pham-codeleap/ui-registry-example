/**
 * Column action enum
 */
enum ColumnActionEnum {
  /**
   * Sort ascending
   * This action is implemented by internal table sorting state management
   */
  SortAsc = 'SortAsc',
  /**
   * Sort descending
   * This action is implemented by internal table sorting state management
   */
  SortDes = 'SortDes',
  /**
   * ClearSort
   * This action is implemented by internal table sorting state management
   */
  ClearSort = 'ClearSort',
  /**
   * Filter
   * This action is not implemented by internal table sorting state management
   * You need to implement it by yourself via columnAction callback
   */
  Filter = 'Filter',
  /**
   * Pin left
   * This action is not implemented by internal table sorting state management
   * You need to implement it by yourself via columnAction callback
   */
  PinLeft = 'PinLeft',
  /**
   * Pin right
   * This action is not implemented by internal table sorting state management
   * You need to implement it by yourself via columnAction callback
   */
  PinRight = 'PinRight',
  /**
   * Rename
   * This action is not implemented by internal table sorting state management
   * You need to implement it by yourself via columnAction callback
   */
  Rename = 'Rename',
  /**
   * Hide
   * This action is not implemented by internal table sorting state management
   * You need to implement it by yourself via columnAction callback
   */
  Hide = 'Hide',
  /**
   * Set color
   * This action is not implemented by internal table sorting state management
   * You need to implement it by yourself via columnAction callback
   */
  SetColor = 'SetColor',
  /**
   * Auto resize
   * This action is not implemented by internal table sorting state management
   * You need to implement it by yourself via columnAction callback
   */
  AutoResize = 'AutoResize',
  /**
   * Auto resize all
   * This action is not implemented by internal table sorting state management
   * You need to implement it by yourself via columnAction callback
   */
  AutoResizeAll = 'AutoResizeAll',
}

export default ColumnActionEnum;
