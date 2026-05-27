import React, { useCallback, useEffect, useState } from 'react';
import { Input } from '../../../input';
import IDataTableGlobalSearchProps from './IDataTableGlobalSearchProps';
import { Box } from '../../../box';
import { Icon } from '../../../icon';

/**
 * DataTableGlobalSearch component for global searching in DataTable
 * Supports both controlled and uncontrolled approaches
 * - Uncontrolled: Component manages its own state
 * - Controlled: Parent component provides globalSearchValue
 *
 * @example
 * // Uncontrolled usage
 * <DataTableToolbarGlobalSearch onGlobalSearch={handleSearch} />
 *
 * // Controlled usage
 * <DataTableToolbarGlobalSearch
 *   globalSearchValue={searchValue}
 *   onGlobalSearch={handleSearch}
 * />
 */
const DataTableToolbarGlobalSearch: React.FC<IDataTableGlobalSearchProps> = ({
  placeholder,
  onChange,
  value: externalSearchValue,
  searchIcon = 'Search',
  isSearching,
}) => {
  // Determine if component is in controlled mode
  const isControlled = externalSearchValue !== undefined;

  // State for internal search value (used in uncontrolled mode)
  const [internalSearchValue, setInternalSearchValue] = useState<string>('');

  // The actual search value to use (either controlled or uncontrolled)
  const searchValue = isControlled ? externalSearchValue || '' : internalSearchValue;

  // State for mounted (to handle hydration issues)
  const [mounted, setMounted] = useState(false);

  // Mark component as mounted (to handle hydration issues)
  useEffect(() => {
    setMounted(true);
  }, []);

  /**
   * Handle input change
   */
  const handleInputChange = useCallback(
    (value: string) => {
      // Update internal state
      if (!isControlled) {
        setInternalSearchValue(value);
      }
      // Call onGlobalSearch if provided
      onChange?.(value);
    },
    [onChange, isControlled],
  );

  return (
    <Box className="w-72">
      <Input
        value={searchValue}
        placeholder={placeholder}
        onChange={mounted ? handleInputChange : undefined}
        leftIcon={isSearching ? <Icon name="Loader" animation="spin" /> : searchIcon}
        size="sm"
      />
    </Box>
  );
};

export default DataTableToolbarGlobalSearch;
