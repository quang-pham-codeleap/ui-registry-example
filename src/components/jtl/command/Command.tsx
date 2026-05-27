import { Fragment, useMemo, useRef } from 'react';
import { Popover, PopoverContent, PopoverAnchor } from '../popover';
import { CommandContent } from './components/command-content';
import { CommandEmpty } from './components/command-empty';
import { CommandInput } from './components/command-input';
import { CommandLoading } from './components/command-loading';
import { CommandSelected } from './components/command-selected';
import { Command as CommandProvider, CommandList } from './CommandPrimitive';
import { BOX_SHADOW_STYLE, COMMAND_VARIANT } from './constants';
import { useCommandInput, useCommandSelection, useCommandState } from './hooks';
import ICommandProps from './ICommandProps';
import { CommandItem } from './types';
import { Box } from '../box';
import { Select } from '../select';
import { cn } from '@/lib';
import { CommandVariant } from './types';

const Command = <T extends CommandVariant = 'simple'>({
  value,
  groups,
  loop,
  placeholder,
  maxLength,
  onValueChange,
  defaultValue,
  shouldFilter,
  openOnFocus,
  variant = 'simple' as T,
  isLoading,
  loadingLabel,
  noResultsLabel,
  showLoadingOnType,
  hideContent,
  onItemSelect,
  onDebouncedValueChange,
  delay,
  searchConfig,
  filter,
  footer,
  isPopover = false,
  selectionConfig,
  renderItem,
  inputType,
  ref,
}: ICommandProps<T>) => {
  const selectedGroupRef = useRef<HTMLDivElement>(null);
  const commandListRef = useRef<HTMLDivElement>(null);

  const { open, setOpen, isPending, setIsPending, valueState, setValueState, availableRef, inputRef } = useCommandState({
    value,
    defaultValue,
    onValueChange,
    variant,
    showLoadingOnType,
    onDebouncedValueChange,
    delay,
    openOnFocus,
    isPopover,
    ref,
  });

  const { handleInputOnValueChange, handleInputOnFocus } = useCommandInput({
    open,
    setOpen,
    setValueState,
    setIsPending,
    showLoadingOnType,
    openOnFocus,
  });

  const { handleContentItemOnSelect, handleCheckboxGroupChange, handleGroupSelectAll, handleGroupClear, handleClearAll } = useCommandSelection({
    value,
    variant,
    setValueState,
    setOpen,
    onItemSelect,
    commandListRef,
    selectedGroupRef,
  });

  /**
   * Render the command list content based on loading state and search mode
   */
  const commandContent = useMemo(() => {
    if (isLoading || (showLoadingOnType && isPending)) {
      return <CommandLoading loadingLabel={loadingLabel} />;
    }

    // ── Checkbox variant layout with selected-on-top ─────────────────────────
    if (variant === COMMAND_VARIANT.CHECKBOX) {
      return (
        <CommandSelected
          value={(value as string[]) ?? []}
          groups={groups}
          inputValue={valueState}
          selectedGroupRef={selectedGroupRef}
          onCheckboxGroupChange={handleCheckboxGroupChange}
          onItemSelect={handleContentItemOnSelect as (item: CommandItem) => void}
          onGroupClear={handleGroupClear}
          onGroupSelectAll={handleGroupSelectAll}
          onClearAll={handleClearAll}
          noResultsLabel={noResultsLabel}
          renderItem={renderItem}
        />
      );
    }

    // ── Default layout ──────────────────────────────────────────────────────
    return (
      <Fragment>
        <CommandContent
          groups={groups}
          variant={variant}
          inputValue={valueState}
          checkboxValue={variant === COMMAND_VARIANT.CHECKBOX ? (value as string[]) : []}
          onItemSelect={handleContentItemOnSelect}
          renderItem={renderItem}
        />
        <CommandEmpty inputValue={valueState} noResultsLabel={noResultsLabel} />
      </Fragment>
    );
  }, [
    isLoading,
    showLoadingOnType,
    isPending,
    groups,
    variant,
    valueState,
    value,
    handleContentItemOnSelect,
    handleCheckboxGroupChange,
    handleGroupSelectAll,
    handleGroupClear,
    handleClearAll,
    noResultsLabel,
    loadingLabel,
    renderItem,
  ]);

  const roundedClass = 'rounded-[var(--border-radius-lg)]';
  const roundedTopClass = 'rounded-t-[var(--border-radius-lg)]';

  const flyoutContent = (
    <div
      className={cn('bg-[var(--background)]', isPopover ? roundedClass : 'border border-[var(--border)] rounded-b-[var(--border-radius-lg)]')}
      style={{ boxShadow: BOX_SHADOW_STYLE }}
    >
      {selectionConfig?.enabled && (
        <Box className="p-2 pb-0">
          <Select isPortal={false} options={selectionConfig.options} onChange={selectionConfig.onSelect} value={selectionConfig.value} />
        </Box>
      )}
      {isPopover && (
        <CommandInput
          ref={inputRef}
          maxLength={maxLength}
          placeholder={placeholder}
          value={valueState}
          onValueChange={handleInputOnValueChange}
          onFocus={handleInputOnFocus}
          searchConfig={searchConfig}
          showFocusBorder
          className={cn('border-b border-b-[var(--border)]', hideContent ? roundedClass : roundedTopClass)}
          type={inputType}
        />
      )}
      {!hideContent && (
        <CommandList
          ref={commandListRef}
          className={cn(
            'text-popover-foreground outline-none animate-in mt-1',
            // Fix the list height in checkbox mode so that the "Ausgewählt" section
            // appearing/growing at the top never changes the popover's overall height.
            // The useLayoutEffect in useCommandSelection compensates scrollTop to keep
            // the main list visually stable, but that only works when the list has a
            // fixed height (otherwise the popover itself would grow).
            variant === COMMAND_VARIANT.CHECKBOX && 'h-[300px]',
          )}
          onMouseDown={e => e.preventDefault()}
        >
          {commandContent}
        </CommandList>
      )}
      {footer && <Box className="px-3 py-2 border-t border-[var(--border)] bg-[var(--muted)] rounded-b-[var(--border-radius-lg)]">{footer}</Box>}
    </div>
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverAnchor asChild>
        <CommandProvider
          shouldFilter={shouldFilter}
          loop={loop}
          filter={filter}
          style={open ? { boxShadow: BOX_SHADOW_STYLE } : undefined}
          ref={availableRef}
          className={cn(open && !isPopover ? `rounded-none ${roundedTopClass}` : roundedClass)}
        >
          {!isPopover && (
            <CommandInput
              maxLength={maxLength}
              placeholder={placeholder}
              value={valueState}
              onValueChange={handleInputOnValueChange}
              onFocus={handleInputOnFocus}
              searchConfig={searchConfig}
              showFocusBorder={open}
              className={open ? roundedTopClass : roundedClass}
              type={inputType}
            />
          )}
          {isPopover && flyoutContent}
          {!isPopover && open && (
            <PopoverContent
              className="!p-0"
              side="bottom"
              align="start"
              sideOffset={0}
              onOpenAutoFocus={e => e.preventDefault()}
              style={{ width: 'var(--radix-popover-trigger-width)' }}
            >
              {flyoutContent}
            </PopoverContent>
          )}
        </CommandProvider>
      </PopoverAnchor>
    </Popover>
  );
};

export default Command;
