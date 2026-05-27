/**
 * Visual style variants for the Section component
 */
export const layoutSectionVariants = {
  fullWidth: 'flex-[1_1_100%]',
  oneHalf: 'flex-[1_1_28.125rem] min-w-0',
  oneThird: 'flex-[1_1_15rem] min-w-0',
};

/**
 * Available variant values for the LayoutSection component
 */
export const LayoutSectionVariants = Object.keys(layoutSectionVariants) as LayoutSectionVariant[];

/**
 * List type of Section variants based on the sectionVariants object
 */
type LayoutSectionVariant = keyof typeof layoutSectionVariants;
export default LayoutSectionVariant;
