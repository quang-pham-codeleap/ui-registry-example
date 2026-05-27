import { cn } from '@/lib/utils';
import { Label } from '../../../label';
import { Box } from '../../../box';
import IFieldLabelProps from './IFieldLabelProps';
import { useFieldContext } from '../../hooks';

/**
 * FieldLabel — context-aware label slot for the Field compound pattern.
 *
 * Handles label styling (required indicator, disabled/error states) while
 * the user controls the label content and layout (via Box/Grid).
 *
 * In form integration mode (inside `<Field name="...">`), `htmlFor` is
 * automatically read from context — no need to pass it manually.
 * Providing `htmlFor` explicitly always overrides the context value.
 */
const FieldLabel = ({ children, htmlFor, required = false, disabled = false, isError = false, extra, className }: IFieldLabelProps) => {
  // Read name from FieldContext — used for auto-injecting htmlFor when Field has a name
  const { name, fieldState } = useFieldContext();

  // Explicit htmlFor prop takes priority; falls back to context name (works in both modes)
  const resolvedHtmlFor = htmlFor ?? name;

  const errorVisible = isError || fieldState?.invalid;

  // Shared label element used in both layout variants
  const labelEl = (
    <Label
      htmlFor={resolvedHtmlFor}
      variant="field"
      className={cn(
        // Base layout for inline content (icon, tooltip, etc.)
        'inline-flex items-center gap-1',
        // Disabled state
        disabled && 'opacity-50 cursor-not-allowed',
        // Error state
        errorVisible && 'text-[var(--danger-text)]',
        className,
      )}
    >
      {children}
      {/* Required indicator — hidden from screen readers, purely visual */}
      {required && (
        <span className="text-[var(--danger-text)]" aria-hidden="true">
          *
        </span>
      )}
    </Label>
  );

  // When extra is provided, render a full-width row with label left and extra right
  if (extra) {
    return (
      <Box className="flex items-center justify-between w-full gap-2">
        {labelEl}
        <Box className="flex items-center gap-1">{extra}</Box>
      </Box>
    );
  }

  return labelEl;
};

FieldLabel.displayName = 'FieldLabel';

export default FieldLabel;
