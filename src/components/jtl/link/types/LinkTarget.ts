import FrameName from './FrameName';

/**
 * Attribute value specifies that the linked page or form response will be opened in the named frame
 */
type LinkTarget = '_blank' | '_self' | '_parent' | '_top' | FrameName;

export default LinkTarget;
