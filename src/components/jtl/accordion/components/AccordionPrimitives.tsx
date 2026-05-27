'use client';

import React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { cva } from 'class-variance-authority';
import { ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';

// --- Root Accordion Component ---
const AccordionRoot = AccordionPrimitive.Root;

// --- Accordion Item Component ---
const accordionItemVariants = cva('flex flex-col ', {
  variants: {
    size: {
      default: 'gap-4 px-4 py-4',
      sm: 'gap-3 px-4 py-3',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

interface AccordionItemProps extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item & React.RefAttributes<HTMLDivElement>> {
  size?: 'default' | 'sm';
}

const AccordionItemPrimitive: React.FC<AccordionItemProps> = ({ className, size = 'default', ...props }) => (
  <AccordionPrimitive.Item
    className={cn(
      accordionItemVariants({ size }),
      'data-[state=open]:border data-[state=open]:border-[var(--border)] data-[state=open]:rounded-[var(--border-radius-lg)] data-[state=open]:bg-[var(--background)]',
      className,
    )}
    {...props}
  />
);
AccordionItemPrimitive.displayName = 'AccordionItemPrimitive';

// --- Accordion Trigger (Header) Component ---
const accordionTriggerVariants = cva(
  'flex flex-1 items-center justify-between h-6 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180 cursor-pointer',
  {
    variants: {
      size: {
        default: 'text-[length:var(--typography-base-sizes-base-font-size)]',
        sm: 'text-[length:var(--typography-base-sizes-base-font-size)]',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

interface AccordionTriggerProps extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> {
  size?: 'default' | 'sm';
}

const AccordionTrigger: React.FC<AccordionTriggerProps & React.RefAttributes<HTMLButtonElement>> = ({
  className,
  children,
  size = 'default',
  ...props
}) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger className={cn(accordionTriggerVariants({ size }), className)} {...props}>
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
);
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

// --- Accordion Content Component ---

interface AccordionContentProps extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> {}

const AccordionContent: React.FC<AccordionContentProps & React.RefAttributes<HTMLDivElement>> = ({ className, children, ...props }) => (
  <AccordionPrimitive.Content
    className={cn('overflow-hidden transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down', className)}
    {...props}
  >
    <div className="flex flex-col gap-3 ">{children}</div>
  </AccordionPrimitive.Content>
);
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { AccordionContent, AccordionItemPrimitive, AccordionRoot, AccordionTrigger };
