import React from 'react';
import ITextareaProps from './ITextareaProps';
import { TextareaAtom } from './components';
import { Label } from '../label';
import { ErrorMessage } from '../error-message';

/**
 * Textarea component that wraps TextareaAtom with additional features like label, description, and error states
 * @param props {@link ITextareaProps} - Props extending ITextareaProps including label, description, and error message
 * @returns A Textarea component
 *
 * @example
 * ```tsx
 * function App() {
 *   const [value, setValue] = useState('');
 *
 *   return (
 *     <Textarea
 *       label="Textarea"
 *       description="This is a textarea description."
 *       value={value}
 *       onChange={setValue}
 *     />
 *   )
 * }
 * ```
 */
const Textarea: React.FC<ITextareaProps & React.RefAttributes<HTMLTextAreaElement>> = ({ ref, label, description, errorMessage, ...props }) => {
  return (
    <div className="flex flex-col gap-2 relative">
      {label && (
        <Label variant="field" className={errorMessage ? 'text-[var(--danger-text)]' : ''}>
          {label}
        </Label>
      )}
      <TextareaAtom
        ref={ref}
        error={!!errorMessage}
        className={errorMessage ? 'outline-[var(--ring-error)] text-[var(--danger-text)]' : ''}
        {...props}
      />
      {description && <Label variant="subtitle">{description}</Label>}
      <ErrorMessage message={errorMessage} />
    </div>
  );
};
Textarea.displayName = 'Textarea';

export default Textarea;
