/**
 * Typography variants
 */
export const typographyVariants = {
  h1: 'text-[length:var(--typography-typography-components-h1-font-size-lg)] font-[var(--typography-typography-components-h1-font-weight)] leading-[var(--typography-base-sizes-5x-large-line-height)] tracking-[var(--typography-typography-components-h1-letter-spacing)]',
  h2: 'text-[length:var(--typography-typography-components-h2-font-size)] font-[var(--typography-typography-components-h2-font-weight)] leading-[var(--typography-typography-components-h2-line-height)] tracking-[var(--typography-typography-components-h2-letter-spacing)]',
  h3: 'text-[length:var(--typography-typography-components-h3-font-size)] font-[var(--typography-typography-components-h3-font-weight)] leading-[var(--typography-typography-components-h3-line-height)] tracking-[var(--typography-typography-components-h3-letter-spacing)]',
  h4: 'text-[length:var(--typography-typography-components-h4-font-size)] font-[var(--typography-typography-components-h4-font-weight)] leading-[var(--typography-typography-components-h4-line-height)] tracking-[var(--typography-typography-components-h4-letter-spacing)]',
  body: 'text-[length:var(--typography-typography-components-p-font-size)] font-[var(--typography-typography-components-p-font-weight)] leading-[var(--typography-typography-components-p-line-height)] tracking-[var(--typography-typography-components-p-letter-spacing)]',
  'inline-code':
    'relative rounded-[var(--radius-rounded)] bg-[var(--muted)] font-[family-name:var(--typography-typography-components-inline-code-font-family)] text-[length:var(--typography-typography-components-inline-code-font-size)] font-[var(--typography-typography-components-inline-code-font-weight)] leading-[var(--typography-typography-components-inline-code-line-height)] tracking-[var(--typography-typography-components-inline-code-letter-spacing)] px-[4.8px] py-[3.2px]',
  lead: 'text-[length:var(--typography-typography-components-lead-font-size)] font-[var(--typography-typography-components-lead-font-weight)] leading-[var(--typography-typography-components-lead-line-height)] tracking-[var(--typography-typography-components-lead-letter-spacing)] text-[var(--muted-foreground)]',
  large:
    'text-[length:var(--typography-typography-components-large-font-size)] font-[var(--typography-typography-components-large-font-weight)] leading-[var(--typography-typography-components-large-line-height)] tracking-[var(--typography-typography-components-large-letter-spacing)]',
  small:
    'text-[length:var(--typography-typography-components-small-font-size)] font-[var(--typography-typography-components-small-font-weight)] leading-[var(--typography-base-sizes-small-line-height)] tracking-[var(--typography-typography-components-small-letter-spacing)]',
  muted:
    'text-[var(--muted-foreground)] text-[length:var(--typography-typography-components-small-font-size)] font-[var(--typography-typography-components-small-font-weight)] leading-[var(--typography-typography-components-small-line-height)] ',
  xs: 'text-[length:var(--typography-base-sizes-extra-small-font-size)] leading-[var(--typography-base-sizes-extra-small-line-height)] tracking-[var(--typography-typography-components-small-letter-spacing)]',
};

/**
 * Available variant values for the Text component
 */
export const TypographyVariants = Object.keys(typographyVariants) as TypographyVariant[];

/**
 * Type of text
 */
type TypographyVariant = keyof typeof typographyVariants;

export default TypographyVariant;
