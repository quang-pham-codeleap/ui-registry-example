import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../dialog';
import { Icon } from '../icon';
import { cn } from '@/lib';
import { Command as CommandPrimitive } from 'cmdk';
import React, { useCallback } from 'react';
import { ALWAYS_ALLOWED_KEYS, NUMERIC_CHAR_PATTERN } from './constants';

const Command: React.FC<React.ComponentProps<typeof CommandPrimitive>> = ({ className, ...props }) => {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        'flex',
        'h-full',
        'w-full',
        'flex-col',
        'bg-[var(--popover)]',
        'text-[var(--popover-foreground)]',
        'rounded-[var(--border-radius-lg)]',
        'border',
        'border-[var(--border)]',
        className,
      )}
      {...props}
    />
  );
};

const CommandDialog: React.FC<
  React.ComponentProps<typeof Dialog> & {
    title?: string;
    description?: string;
    className?: string;
  }
> = ({ title = 'Command Palette', description = 'Search for a command to run...', children, className, ...props }) => {
  return (
    <Dialog {...props}>
      <DialogHeader className="sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent className={cn('overflow-hidden p-0', className)} hasCloseButton={false}>
        {children}
      </DialogContent>
    </Dialog>
  );
};

const CommandInput: React.FC<
  React.ComponentProps<typeof CommandPrimitive.Input> & {
    suffix?: React.ReactNode;
    /**
     * Restricts input to numeric characters only when set to "number".
     * Note: cmdk explicitly omits the native `type` prop from its Input component,
     * so this is a custom prop handled via an onKeyDown guard — it is NOT
     * forwarded to the underlying <input> element.
     */
    type?: React.HTMLInputTypeAttribute;

    /**
     * Whether to show the focus ring border on the input wrapper.
     * Should be true when the command is open or rendered inside a popover.
     */
    showFocusBorder?: boolean;
  }
> = ({ className, suffix, type, onKeyDown, showFocusBorder, ...props }) => {
  /**
   * When type="number", block any key that is not a digit, minus, decimal point,
   * or a navigation/control key. This ensures only numeric characters can be typed.
   * Still calls the user-provided onKeyDown handler afterward (composition).
   */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (type === 'number') {
        const isAllowedKey = ALWAYS_ALLOWED_KEYS.has(e.key);
        // Allow Ctrl/Cmd combinations (copy, paste, select-all, undo, etc.)
        const isModifierCombo = e.ctrlKey || e.metaKey;

        if (!isAllowedKey && !isModifierCombo && !NUMERIC_CHAR_PATTERN.test(e.key)) {
          e.preventDefault();
        }
      }

      // Always call the consumer's onKeyDown so cmdk navigation keeps working
      onKeyDown?.(e);
    },
    [type, onKeyDown],
  );

  /**
   * When type="number", sanitize pasted content so that only numeric
   * characters remain. This covers paste via keyboard shortcuts or
   * context menu that bypasses onKeyDown filtering.
   */
  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLDivElement>) => {
      if (type !== 'number') {
        return;
      }

      const target = e.target as HTMLInputElement | null;
      if (!target || target.tagName !== 'INPUT') {
        return;
      }

      // Let the paste occur, then sanitize the resulting value.
      setTimeout(() => {
        const currentValue = target.value;
        const sanitized = Array.from(currentValue)
          .filter(ch => NUMERIC_CHAR_PATTERN.test(ch))
          .join('');

        if (sanitized !== currentValue) {
          target.value = sanitized;
        }
      }, 0);
    },
    [type],
  );

  return (
    <div
      data-slot="command-input-wrapper"
      onPaste={handlePaste}
      className={cn(
        'flex',
        'h-10',
        'items-center',
        'gap-3',
        'border-[var(--border)]',
        'py-2',
        // If `end` jsx exist, it will handle its own padding right
        suffix ? 'pl-3' : 'px-3',
        'bg-[var(--background)]',
        showFocusBorder && 'border-b border-[var(--border)] focus-within:border-b-[var(--ring)]',
        className,
      )}
    >
      <Icon name="Search" size={16} className="shrink-0 text-[var(--muted-foreground)]" />
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn(
          '!placeholder:text-[var(--muted-foreground)]',
          'flex',
          'w-full',
          'text-[length:var(--typography-typography-components-small-font-size)]',
          'outline-hidden',
          'disabled:cursor-not-allowed',
          'disabled:opacity-50',
        )}
        onKeyDown={handleKeyDown}
        {...props}
      />
      {suffix}
    </div>
  );
};

const CommandList: React.FC<React.ComponentProps<typeof CommandPrimitive.List>> = ({ className, ...props }) => {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(
        'max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto',
        // Disable browser scroll anchoring so our manual useLayoutEffect compensation
        // in Command.tsx is the sole mechanism keeping the viewport stable when the
        // "Selected" group changes height. Without this, the browser and our code both
        // adjust scrollTop, causing a double-compensation jump.
        '[overflow-anchor:none]',
        className,
      )}
      {...props}
    />
  );
};

const CommandEmpty: React.FC<React.ComponentProps<typeof CommandPrimitive.Empty>> = ({ ...props }) => {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className="py-6 text-center text-[length:var(--typography-typography-components-small-font-size)]"
      {...props}
    />
  );
};

const CommandGroup: React.FC<React.ComponentProps<typeof CommandPrimitive.Group>> = ({ className, ...props }) => {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        'text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium',
        className,
      )}
      {...props}
    />
  );
};

const CommandSeparator: React.FC<React.ComponentProps<typeof CommandPrimitive.Separator>> = ({ className, ...props }) => {
  return <CommandPrimitive.Separator data-slot="command-separator" className={cn('bg-[var(--muted)] h-px', className)} {...props} />;
};

const CommandItem: React.FC<React.ComponentProps<typeof CommandPrimitive.Item> & { htmlFor?: string }> = ({ className, ...props }) => {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        'data-[selected=true]:bg-[var(--accent)]',
        'data-[selected=true]:text-[var(--accent-foreground)]',
        "[&_svg:not([class*='text-'])]:text-[var(--muted-foreground)]",
        'relative',
        'flex',
        'cursor-default',
        'items-center',
        'gap-2',
        'rounded-sm',
        'px-2',
        'py-1.5',
        'text-[length:var(--typography-typography-components-small-font-size)]',
        'outline-hidden',
        'select-none',
        'data-[disabled=true]:pointer-events-none',
        'data-[disabled=true]:opacity-50',
        '[&_svg]:pointer-events-none',
        '[&_svg]:shrink-0',
        '[&_svg:not([class*="size-"])]:size-4',
        'hover:bg-[var(--accent)]',
        'hover:cursor-pointer',
        className,
      )}
      {...props}
    />
  );
};

const CommandShortcut: React.FC<React.ComponentProps<'span'>> = ({ className, ...props }) => {
  return <span data-slot="command-shortcut" className={cn('text-muted-foreground ml-auto text-xs tracking-widest', className)} {...props} />;
};

const CommandLoading: React.FC<React.ComponentProps<typeof CommandPrimitive.Loading>> = ({ ...props }) => {
  return <CommandPrimitive.Loading {...props} />;
};

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
  CommandLoading,
};
