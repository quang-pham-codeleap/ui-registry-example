import React, { useCallback, useMemo } from 'react';
import { HtmlEditorToolbarPopoverAction } from '../html-editor-toolbar-popover-action';
import { Box } from '../../../box';
import { LucideIconName } from '../../../icon';
import IHtmlEditorTextAlignmentActionProps from './IHtmlEditorTextAlignmentActionProps';
import { ALIGNMENT_OPTIONS } from '../../constants';
import { Button } from '../../../button';
import { ToolbarAction } from '../../types';

/**
 * Text-alignment toolbar action.
 *
 * Opens a popover with a horizontal row of four alignment buttons:
 * left, center, right, and justify. The currently active alignment
 * is highlighted with an accent background and the trigger icon
 * updates to reflect the selection.
 *
 * Follows the same composition pattern as HtmlEditorTypographyAction:
 * pure render shell — all state lives in the parent editor.
 */
const HtmlEditorTextAlignmentAction: React.FC<IHtmlEditorTextAlignmentActionProps> = ({ onAction, selectedAlignment }) => {
  /**
   * Fires onAction with the chosen alignment value when the user clicks a button.
   */
  const handleAlignmentSelect = useCallback(
    (value: ToolbarAction) => {
      onAction(value);
    },
    [onAction],
  );

  /**
   * Derives the trigger icon from the currently active alignment.
   * Defaults to AlignLeft when nothing is selected.
   */
  const triggerIcon = useMemo(() => ALIGNMENT_OPTIONS.find(a => a.value === selectedAlignment)?.icon ?? 'AlignLeft', [selectedAlignment]);

  /**
   * Popover body — a horizontal row of alignment icon buttons.
   * The active button receives an accent background; others are neutral.
   */
  const popoverContent = useMemo(
    () => (
      <Box className="flex flex-row gap-1 p-1">
        {ALIGNMENT_OPTIONS.map(({ value, icon, ariaLabel }) => {
          return (
            <Button
              key={value}
              type="button"
              onClick={() => handleAlignmentSelect(value)}
              aria-label={ariaLabel}
              aria-pressed={selectedAlignment === value}
              variant="ghost"
              icon={icon as LucideIconName}
            />
          );
        })}
      </Box>
    ),
    [selectedAlignment, handleAlignmentSelect],
  );

  return (
    <HtmlEditorToolbarPopoverAction popoverWidth="w-fit" action="textAlignment" icon={triggerIcon as LucideIconName} ariaLabel="Ausrichtung">
      {popoverContent}
    </HtmlEditorToolbarPopoverAction>
  );
};

HtmlEditorTextAlignmentAction.displayName = 'HtmlEditorTextAlignmentAction';

export default HtmlEditorTextAlignmentAction;
