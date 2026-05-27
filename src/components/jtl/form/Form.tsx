import React, { useCallback } from 'react';
import { FormProvider, FormStateContext } from './FormPrimitives';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import IFormProps from './IFormProps';
/**
 * Form component that integrates react-hook-form with Zod validation
 * @param props {@link IFormProps} - Props for the Form component
 * @template TSchema - The Zod schema type
 * @returns The rendered Form component
 *
 * @example
 * ```tsx
 * // Default
 * function App() {
 *    const loginFormSchema = z.object({
 *      email: z.string().email({ message: 'Please enter a valid email address' }),
 *      password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
 *    });
 *
 *    const form = useForm<LoginFormData>({
 *     resolver: zodResolver(loginFormSchema),
 *     defaultValues: {
 *       email: '',
 *       password: '',
 *     },
 *   });
 *
 *   const onSubmit = (data: z.infer<typeof loginFormSchema>) => {
 *     console.log(data);
 *     alert('Login form submitted successfully!');
 *   };
 *
 *   return (
 *     <Form form={form} onSubmit={onSubmit}>
 *       <Box className="w-lg flex flex-col items-center space-y-4">
 *         <Field name="email">
 *           <FieldLabel>Email</FieldLabel>
 *           <FieldControl>
 *             <Input type="email" placeholder="Enter your email" />
 *           </FieldControl>
 *         </Field>
 *         <Field name="password">
 *           <FieldLabel>Password</FieldLabel>
 *           <FieldControl>
 *             <Input type="password" placeholder="Enter your password" />
 *           </FieldControl>
 *         </Field>
 *         <Button type="submit" label="Submit" />
 *       </Box>
 *     </Form>
 *   );
 * }
 * ```
 */
const Form = <TSchema extends z.ZodType>({
  form,
  children,
  onSubmit,
  onError,
  disabled = false,
  loading = false,
  className,
  id,
  noValidate = false,
  ariaLabel,
  ariaLabelledBy,
}: IFormProps<TSchema>) => {
  /**
   * Determine if form should be disabled.
   * Disabled when explicitly disabled or when loading.
   * Declared before handleSubmit so it can be referenced in the callback.
   */
  const isDisabled = disabled || loading;

  /**
   * Handles form submission while stopping event propagation to prevent
   * nested forms from triggering parent form submissions.
   * Also guards against keyboard submission (e.g. Enter key) when disabled or loading —
   * pointer-events-none only blocks mouse events.
   */
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.stopPropagation();
      if (isDisabled) {
        e.preventDefault();
        return;
      }
      form?.handleSubmit(onSubmit, onError)(e);
    },
    [form, onSubmit, onError, isDisabled],
  );

  /**
   * If form is not provided, warn and return null
   */
  if (!form) {
    console.warn('form prop should not be null');
    return null;
  }

  return (
    <FormProvider {...form}>
      {/* Provide form-level disabled state so FieldControl can inject it onto inputs */}
      <FormStateContext.Provider value={{ disabled: isDisabled }}>
        <form
          id={id}
          onSubmit={handleSubmit}
          noValidate={noValidate}
          // aria-busy signals to screen readers that the form is processing a submission
          aria-busy={loading || undefined}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          className={cn('w-full', isDisabled && 'pointer-events-none opacity-50', className)}
          aria-disabled={isDisabled || undefined}
        >
          {children}
        </form>
      </FormStateContext.Provider>
    </FormProvider>
  );
};

Form.displayName = 'Form';

export default Form;
