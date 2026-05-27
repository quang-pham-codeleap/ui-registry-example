/**
 * Data payload for the setReplaceTerm toolbar action.
 * Used when the user types in the replace input field.
 */
type SetReplaceTermData = {
  /** The replacement string used when replacing search results. */
  term: string;
};

export default SetReplaceTermData;
