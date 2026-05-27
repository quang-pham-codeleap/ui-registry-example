import CommandVariant from './CommandVariant';

/**
 * Conditional type for the item-select callback, narrowed by the command variant.
 * In checkbox mode the handler receives an array of selected string values;
 * in all other modes it receives a single string value.
 */
type OnItemSelect<T extends CommandVariant> = T extends 'checkbox' ? (value: string[]) => void : (value: string) => void;

export default OnItemSelect;
