import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type Resolver } from 'react-hook-form';
import { z } from 'zod';
import { IUseZodFormProps } from '../interfaces';

/**
 * Custom hook to create a form with Zod validation
 * @param props {@link IUseZodFormProps} - The props for the hook
 * @template TSchema - The Zod schema type
 *
 * @returns {UseFormReturn<z.infer<TSchema>>} The form instance
 *
 * @example
 * ```tsx
 * const form = useZodForm({ schema: z.object({ name: z.string() }) });
 * ```
 *
 * @example
 * ```tsx
 * // With default values
 * const form = useZodForm({ schema: z.object({ name: z.string() }), defaultValues: { name: 'John Doe' } });
 * ```
 */
export default function useZodForm<TSchema extends z.ZodType>({ schema, defaultValues, ...formProps }: IUseZodFormProps<TSchema>) {
  const resolver = (zodResolver as unknown as (schema: z.ZodTypeAny) => Resolver<z.infer<TSchema>>)(schema);
  return useForm<z.infer<TSchema>>({
    ...formProps,
    defaultValues,
    resolver,
  });
}
