import React, { useId } from 'react';
import IStackProps from './IStackProps';
import { cn } from '@/lib/utils';
import { directions, itemAligns, justifyContent, breakpointsAliases } from './types';

/**
 * A stack component that arranges its children in a vertical or horizontal layout
 * @param props {@link IStackProps} - Props for the Stack component
 * @returns The rendered Stack component
 *
 * @example
 * ```tsx
 * function App() {
 *   return (
 *     <Stack>
 *       <Text>Item 1</Text>
 *       <Text>Item 2</Text>
 *     </Stack>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Responsive stack
 * function App() {
 *   return (
 *     <Stack responsive={{ sm: { direction: 'column' }, md: { direction: 'row' } }}>
 *       <Text>Item 1</Text>
 *       <Text>Item 2</Text>
 *     </Stack>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Wrap content
 * function App() {
 *   return (
 *     <Stack isWrap>
 *       <Text>Item 1</Text>
 *       <Text>Item 2</Text>
 *     </Stack>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Custom element
 * function App() {
 *   return (
 *     <Stack as="ul">
 *       <Text>Item 1</Text>
 *       <Text>Item 2</Text>
 *     </Stack>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Direction - Supported values: column, row, rowReverse, columnReverse
 * function App() {
 *   return (
 *     <Stack direction="row">
 *       <Text>Item 1</Text>
 *       <Text>Item 2</Text>
 *     </Stack>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Spacing
 * function App() {
 *   return (
 *     <Stack spacing="2">
 *       <Text>Item 1</Text>
 *       <Text>Item 2</Text>
 *     </Stack>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Justify
 * function App() {
 *   return (
 *     <Stack justify="center">
 *       <Text>Item 1</Text>
 *       <Text>Item 2</Text>
 *     </Stack>
 *   );
 * }
 * ```
 */
const Stack: React.FC<IStackProps> = ({ id, as = 'div', itemAlign, justify, direction = 'column', spacing = '1', responsive, children, isWrap }) => {
  const uniqueId = useId();
  const stackId = `stack-${id || uniqueId.replace(/:/g, '')}`;

  const className = cn(
    'flex',
    directions[direction],
    itemAlign && itemAligns[itemAlign],
    justify && justifyContent[justify],
    spacing && `gap-[calc(var(--spacing)*${spacing})]`,
    isWrap && 'flex-wrap',
    responsive && [
      // Ensure specific order: sm > md > lg > xl > 2xl
      ...breakpointsAliases.flatMap(key => {
        const config = responsive[key as keyof typeof responsive];
        if (!config) return [];

        return [
          ...(config.direction ? [`${key}:${directions[config.direction]}`] : []),
          ...(config.spacing ? [`${key}:gap-[calc(var(--spacing)*${config.spacing})]`] : []),
        ];
      }),
    ],
  );

  return React.createElement(
    as,
    {
      className,
      id,
      'data-stack': stackId,
    },
    children,
  );
};

export default Stack;
