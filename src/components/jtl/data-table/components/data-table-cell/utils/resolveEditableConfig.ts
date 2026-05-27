import { EditableResolutionParam, ResolvedEditableConfig } from '../types';

/**
 * Resolves the editable configuration for a cell.
 *
 * This function handles the various formats that `editable` can take:
 * - `boolean`: Simple enable/disable
 * - `function`: Dynamic determination based on record/row
 * - `EditableConfig`: Full configuration object
 *
 * @param params - The parameters needed to resolve editability
 * @returns The resolved editable config, or null if not editable
 *
 * @example
 * ```typescript
 * const config = resolveEditableConfig({
 *   cellEdit: { onSave: handleSave },
 *   isSelectionColumn: false,
 *   isActionColumn: false,
 *   columnDef: { key: 'name', editable: true },
 *   record: { id: 1, name: 'John' },
 *   rowIndex: 0,
 * });
 * // Returns: { type: 'text' }
 * ```
 */
export default function resolveEditableConfig<T extends object>(params: EditableResolutionParam<T>): ResolvedEditableConfig {
  const { cellEdit, isSelectionColumn, isActionColumn, columnDef, record, rowIndex } = params;

  // Early return for non-editable scenarios
  if (!cellEdit || isSelectionColumn || isActionColumn) {
    return null;
  }

  if (!columnDef?.editable) {
    return null;
  }

  const editable = columnDef.editable;

  // Handle function-based editability (dynamic per row)
  if (typeof editable === 'function') {
    const result = editable(record, rowIndex);

    if (result === false) return null;
    if (result === true) return { type: 'text' };

    return result;
  }

  // Handle boolean editability
  if (editable === true) {
    return { type: 'text' };
  }

  // Handle EditableConfig object
  return editable;
}
