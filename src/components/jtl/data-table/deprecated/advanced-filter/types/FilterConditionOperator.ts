/**
 * Enum for filter condition operators
 */
enum FilterConditionOperator {
  Equals = 'eq',
  NotEquals = 'neq',
  GreaterThan = 'gt',
  GreaterThanOrEqual = 'gte',
  LessThan = 'lt',
  LessThanOrEqual = 'lte',
  StartsWith = 'startsWith',
  EndsWith = 'endsWith',
  Contains = 'contains',
  In = 'in',
}

/**
 * Object mapping filter condition operators to their shortcuts
 */
export const operatorShortcutObject: Record<FilterConditionOperator, string> = {
  [FilterConditionOperator.Equals]: '=',
  [FilterConditionOperator.NotEquals]: '!=',
  [FilterConditionOperator.GreaterThan]: '>',
  [FilterConditionOperator.GreaterThanOrEqual]: '>=',
  [FilterConditionOperator.LessThan]: '<',
  [FilterConditionOperator.LessThanOrEqual]: '<=',
  [FilterConditionOperator.StartsWith]: 'starts with',
  [FilterConditionOperator.EndsWith]: 'ends with',
  [FilterConditionOperator.Contains]: 'contains',
  [FilterConditionOperator.In]: 'in',
};

/**
 * Object mapping filter condition operators to their text
 */
export const operatorTextObject: Record<FilterConditionOperator, string> = {
  [FilterConditionOperator.Equals]: 'ist',
  [FilterConditionOperator.NotEquals]: 'ist nicht',
  [FilterConditionOperator.GreaterThan]: 'ist größer als',
  [FilterConditionOperator.GreaterThanOrEqual]: 'ist größer oder gleich',
  [FilterConditionOperator.LessThan]: 'ist kleiner als',
  [FilterConditionOperator.LessThanOrEqual]: 'ist kleiner oder gleich',
  [FilterConditionOperator.StartsWith]: 'beginnt mit',
  [FilterConditionOperator.EndsWith]: 'endet mit',
  [FilterConditionOperator.Contains]: 'enthält',
  [FilterConditionOperator.In]: 'ist einer',
};

export default FilterConditionOperator;
