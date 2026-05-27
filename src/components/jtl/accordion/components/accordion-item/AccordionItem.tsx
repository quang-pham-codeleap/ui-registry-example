import IAccordionItemProps from './IAccordionItemProps';
import { AccordionTrigger, AccordionItemPrimitive } from '../AccordionPrimitives';
import { AccordionContent } from '../AccordionPrimitives';
import { Text } from '../../../text';

const AccordionItem = ({ value, title, text, children, size = 'default' }: IAccordionItemProps) => {
  return (
    <AccordionItemPrimitive key={value} value={value} size={size}>
      <AccordionTrigger size={size}>{title}</AccordionTrigger>
      <AccordionContent>
        {text && (
          <Text type="small" weight="regular">
            {text}
          </Text>
        )}
        {children}
      </AccordionContent>
    </AccordionItemPrimitive>
  );
};

export default AccordionItem;
