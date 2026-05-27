import SelectItem from './SelectItem';

type SelectGroup = {
  /**
   * The label of the select group
   */
  label: string;
  /**
   * The children of the select group
   */
  children: SelectItem[];
};

export default SelectGroup;
