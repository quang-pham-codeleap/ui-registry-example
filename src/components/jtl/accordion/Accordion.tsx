import React, { cloneElement, isValidElement, Children } from 'react';
import { cn } from '@/lib/utils';
import IAccordionProps from './IAccordionProps';
import { AccordionRoot } from './components/AccordionPrimitives';
import { IAccordionItemProps } from './components/accordion-item';

/**
 * A vertically stacked set of interactive headings that each reveal a section of content.
 * Used for organizing and presenting content in a collapsible format to save space.
 * Based on Shadcn UI Accordion, uses Radix UI Accordion primitives.
 *
 * @component
 *
 * @param props {@link IAccordionProps} - The component props
 *
 * @example
 * // Basic usage with single item
 * <Accordion defaultValue="item-1">
 *   <AccordionItem value="item-1" title="Section 1" text="Content for section 1" />
 * </Accordion>
 *
 * @example
 * // Multiple accordion items
 * <Accordion>
 *   <AccordionItem value="item-1" title="Section 1" text="Content for section 1" />
 *   <AccordionItem value="item-2" title="Section 2" text="Content for section 2" />
 *   <AccordionItem value="item-3" title="Section 3" text="Content for section 3" />
 * </Accordion>
 *
 * @example
 * // Small size variant
 * <Accordion size="sm">
 *   <AccordionItem value="item-1" title="Section 1" text="Content for section 1" />
 * </Accordion>
 *
 * @example
 * // With custom content in items
 * <Accordion>
 *   <AccordionItem value="item-1" title="Custom Content">
 *     <div className="custom-content">Custom HTML content here</div>
 *   </AccordionItem>
 * </Accordion>
 *
 * @returns {JSX.Element} Accordion component
 */
const Accordion: React.FC<IAccordionProps> = ({ defaultValue, children, size = 'default' }) => {
  return (
    <AccordionRoot type="single" collapsible defaultValue={defaultValue} className={cn('w-full rounded-[var(--border-radius-lg)] bg-[var(--muted)]')}>
      {Children.map(children, child => {
        if (isValidElement(child)) {
          // Cast the child to ReactElement with IAccordionItemProps to ensure TypeScript knows it's an object type
          const childElement = child as React.ReactElement<IAccordionItemProps>;

          // Clone the child element to pass additional props
          return cloneElement(childElement, {
            ...childElement.props,
            size,
          });
        }
        return child;
      })}
    </AccordionRoot>
  );
};

Accordion.displayName = 'Accordion';

export default Accordion;
