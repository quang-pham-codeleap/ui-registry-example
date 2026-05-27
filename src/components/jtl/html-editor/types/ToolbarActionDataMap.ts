import SetColorData from './SetColorData';
import SetFontSizeData from './SetFontSizeData';
import SetImageAlignmentData from './SetImageAlignmentData';
import SetImageAltData from './SetImageAltData';
import SetImageData from './SetImageData';
import SetLinkData from './SetLinkData';
import SetReplaceTermData from './SetReplaceTermData';
import SetSearchTermData from './SetSearchTermData';
import SetVideoAlignmentData from './SetVideoAlignmentData';
import SetVideoData from './SetVideoData';

/**
 * Maps each toolbar action that carries a data payload to its data type.
 *
 * Actions NOT listed here have no data parameter.
 * Used by {@link HandleToolbarAction} to derive the correct data type
 * from the action name at compile time.
 */
type ToolbarActionDataMap = {
  /** Link insertion / editing — requires URL and optional display text. */
  link: SetLinkData;

  /** Foreground color — requires the chosen hex color. */
  textColor: SetColorData;

  /** Background color — requires the chosen hex color. */
  bgColor: SetColorData;

  /** Image insertion — requires src and optional alt / alignment. */
  insertImage: SetImageData;

  /** Image alignment change — requires the new alignment value. */
  imageAlignment: SetImageAlignmentData;

  /** Image alt text update — requires the new alt string. */
  imageAlt: SetImageAltData;

  /** Search term update — requires the term (empty string clears search). */
  setSearchTerm: SetSearchTermData;

  /** Replace term update — requires the replacement string. */
  setReplaceTerm: SetReplaceTermData;

  /** Font size change — requires the numeric size in pixels. */
  fontSize: SetFontSizeData;

  /** Video insertion — requires src and optional alignment. */
  insertVideo: SetVideoData;

  /** Video alignment change — requires the new alignment value. */
  videoAlignment: SetVideoAlignmentData;
};

export default ToolbarActionDataMap;
