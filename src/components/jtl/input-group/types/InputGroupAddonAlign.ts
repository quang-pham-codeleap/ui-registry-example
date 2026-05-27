/**
 * Alignment positions for InputGroupAddon
 * Based on the 5-Slot Spatial Model:
 * - outline-left (Slot 1): Outside main border, left side
 * - inline-left (Slot 2): Inside visual boundary, left side
 * - inline-right (Slot 4): Inside visual boundary, right side
 * - outline-right (Slot 5): Outside main border, right side
 *
 * Note: Slot 3 (The Control) is handled by InputGroupInput directly
 */
type InputGroupAddonAlign = 'outline-left' | 'inline-left' | 'inline-right' | 'outline-right';

export default InputGroupAddonAlign;
