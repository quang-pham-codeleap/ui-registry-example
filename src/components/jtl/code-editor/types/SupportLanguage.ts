// Exporting as const means it will be typed as a Tuple instead of string[]
export const defaultLanguages = ['json', 'html', 'css', 'javascript', 'typescript'] as const;

// Convert the Tuple to a union
type SupportLanguage = (typeof defaultLanguages)[number];

export default SupportLanguage;
