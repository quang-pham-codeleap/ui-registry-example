import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

type AsyncDefaultValue<TFieldValues> = (payload?: unknown) => Promise<TFieldValues>;

/**
 * Props for useZodForm hook
 * @template TSchema - The Zod schema type
 */
export default interface IUseZodFormProps<TSchema extends z.ZodType> extends Omit<UseFormProps<z.infer<TSchema>>, 'resolver'> {
  /**
   * Zod schema for form validation
   */
  schema: TSchema;

  /**
   * Default values for form fields
   */
  defaultValues?: z.infer<TSchema> | AsyncDefaultValue<z.infer<TSchema>>;
}
