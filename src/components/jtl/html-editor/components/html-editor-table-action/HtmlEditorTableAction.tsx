import React, { useCallback } from 'react';
import { ToggleGroupItem } from '../../../toggle-group';
import IHtmlEditorTableActionProps from './IHtmlEditorTableActionProps';
import { Tooltip } from '../../../tooltip';

/**
 * Table toolbar action button.
 * Clicking this button inserts a 3×3 empty table at the current cursor position.
 *
 * @param props {@link IHtmlEditorTableActionProps}
 */
const HtmlEditorTableAction: React.FC<IHtmlEditorTableActionProps> = ({ onAction }) => {
  // Handle button click to insert table.
  // Dispatches 'insertTable' action which creates a 3×3 table via TipTap command.
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      onAction('insertTable');
    },
    [onAction],
  );

  return (
    <Tooltip content="Tabelle einfügen" asChild>
      <ToggleGroupItem value="insertTable" icon="Table2" aria-label="Tabelle einfügen" data-action="insertTable" onClick={handleClick} />
    </Tooltip>
  );
};

HtmlEditorTableAction.displayName = 'HtmlEditorTableAction';

export default HtmlEditorTableAction;
