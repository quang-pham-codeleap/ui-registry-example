/**
 * Data payload for the setLink toolbar action.
 * Contains the URL and optional display text for link insertion/editing.
 */
type SetLinkData = {
  /** The href URL for the link. Required field. */
  url: string;

  /**
   * The visible text for the link.
   * When empty or omitted, the URL is used as display text.
   */
  displayText: string;
};

export default SetLinkData;
