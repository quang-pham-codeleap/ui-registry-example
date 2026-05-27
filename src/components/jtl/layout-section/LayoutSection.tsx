import { cn } from '@/lib/utils';
import ILayoutSectionProps from './ILayoutSectionProps';
import { layoutSectionVariants } from './types';

/**
 * A section component that provides consistent spacing and layout structure
 * @param props {@link ILayoutSectionProps} - Props for the LayoutSection component
 * @returns The rendered LayoutSection component
 *
 * @example
 * ```tsx
 * // Default
 * function App() {
 *   return (
 *     <LayoutSection variant="default">
 *       ... Your component
 *     </LayoutSection>
 *   );
 * }
 * ```
 */
const LayoutSection = ({ children, variant }: ILayoutSectionProps) => {
  const baseStyles = 'flex-[2_2_480px] min-w-[51%] max-w-[calc(100%-1rem)] mt-4 ml-4 print:flex-[2_2_360px]';

  return <div className={cn(baseStyles, variant && layoutSectionVariants[variant])}>{children}</div>;
};

LayoutSection.displayName = 'LayoutSection';

export default LayoutSection;
