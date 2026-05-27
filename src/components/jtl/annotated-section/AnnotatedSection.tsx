import { Box } from '../box';
import { Text } from '../text';
import IAnnotatedSectionProps from './IAnnotatedSectionProps';

/**
 * A section component that includes a title and description alongside its content
 * Typically used within a Layout component to create a consistent page structure
 * @param props {@link IAnnotatedSectionProps} - Props for the AnnotatedSection component
 * @returns The rendered AnnotatedSection component
 *
 * @example
 * ```tsx
 * function App() {
 *   return (
 *     <AnnotatedSection
 *       title="Settings"
 *       description="Configure your application settings"
 *       id="settings-section"
 *     >
 *       ...Your component
 *     </AnnotatedSection>
 *   );
 * }
 * ```
 */
const AnnotatedSection = ({ children, title, description, id }: IAnnotatedSectionProps) => {
  const descriptionMarkup = typeof description === 'string' ? <Text type="body">{description}</Text> : description;

  return (
    <div className="min-w-0 flex-[1_1_100%] max-w-[calc(100%-1rem)] mt-4 ml-4">
      <div className="flex flex-wrap -mt-4 -ml-4">
        <div className="flex-[1_1_240px] min-w-0 max-w-[calc(100%-1rem)] mt-4 ml-4 pt-4 pr-4 md:pb-4">
          <Box>
            <Text id={id} type="h4">
              {title}
            </Text>
            {descriptionMarkup && <Box className="text-[var(--secondary-foreground)]">{descriptionMarkup}</Box>}
          </Box>
        </div>
        <div className="flex-[2_2_480px] min-w-0 max-w-[calc(100%-1rem)] mt-4 ml-4">{children}</div>
      </div>
    </div>
  );
};

AnnotatedSection.displayName = 'AnnotatedSection';

export default AnnotatedSection;
