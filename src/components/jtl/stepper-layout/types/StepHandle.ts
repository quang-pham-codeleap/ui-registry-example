/**
 * Contract for step form components that expose imperative validation.
 * Implement via `useImperativeHandle` in each step form:
 *
 * ```tsx
 * const Step1Form = forwardRef<StepHandle>((_, ref) => {
 *   const form = useForm<Step1Data>();
 *   useImperativeHandle(ref, () => ({
 *     validate: () => form.trigger(),
 *   }));
 *   return <form>...</form>;
 * });
 * ```
 */
type StepHandle = {
  /** Returns true if the step is valid and navigation should proceed */
  validate: () => Promise<boolean>;
};

export default StepHandle;
