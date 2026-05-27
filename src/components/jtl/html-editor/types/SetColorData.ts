/**
 * Data payload for textColor and bgColor toolbar actions.
 * Used when the user picks a foreground or background color.
 */
type SetColorData = {
  /** Hex color string, e.g. "#db2777" or "#84cc16". */
  color: string;
};

export default SetColorData;
