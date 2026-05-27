/**
 * Data payload for the setSearchTerm toolbar action.
 * Used when the user types in the search input field.
 * An empty string clears the current search and removes highlights.
 */
type SetSearchTermData = {
  /** The search string to highlight in the document. Empty string to clear. */
  term: string;
};

export default SetSearchTermData;
