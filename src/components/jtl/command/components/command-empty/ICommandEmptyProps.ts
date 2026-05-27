/*
 * Props for the CommandEmpty component
 */
export default interface ICommandEmptyProps {
  /**
   * The current value of the input
   */
  inputValue: string;

  /**
   * No results found label
   */
  noResultsLabel?: string | ((inputValue: string) => string);
}
