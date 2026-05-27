import React, { useState, useRef, useEffect, useCallback } from 'react';
import { format, parse, isValid } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { cn } from '@/lib/utils';
import { DatePicker } from '../../../date-picker';
import { DateRangePicker } from '../../../date-range-picker';
import IEditableCellProps from './IEditableCellProps';
import { Button } from '../../../button';
import { Input } from '../../../input';
import { DateRangeValue } from '../../types';

const DEFAULT_DATE_FORMAT = 'dd.MM.yyyy';

/**
 * EditableCell component that wraps cell content with inline editing capability.
 * Shows an edit icon on hover, allows inline editing, and saves on blur or Enter.
 * Supports different editor types: 'text' (default) and 'date'.
 */
const EditableCell = ({ value, isEditable, editorType = 'text', dateFormat = DEFAULT_DATE_FORMAT, onSave, children }: IEditableCellProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState<string>(typeof value === 'string' ? value : '');
  const [dateRangeValue, setDateRangeValue] = useState<DateRange | undefined>(
    typeof value === 'object' && 'from' in value ? (value as DateRange) : undefined,
  );
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Update editValue when value prop changes
  useEffect(() => {
    if (typeof value === 'string') {
      setEditValue(value);
    } else if (typeof value === 'object' && 'from' in value) {
      setDateRangeValue(value as DateRange);
    }
  }, [value]);

  // Focus input when entering edit mode (only for text editor)
  useEffect(() => {
    if (isEditing && editorType === 'text' && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing, editorType]);

  // Handle click outside for date picker
  useEffect(() => {
    if (!isEditing || (editorType !== 'date' && editorType !== 'dateRange')) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsEditing(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isEditing, editorType]);

  const handleSave = useCallback(() => {
    if (typeof value === 'string' && editValue !== value) {
      onSave(editValue);
    }
    setIsEditing(false);
  }, [editValue, value, onSave]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSave();
      } else if (e.key === 'Escape') {
        if (typeof value === 'string') {
          setEditValue(value);
        }
        setIsEditing(false);
      }
    },
    [handleSave, value],
  );

  const handleEditClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
    setIsHovered(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  // Handle date change from DatePicker - passes Date object to onSave
  const handleDateChange = useCallback(
    (date: Date | undefined) => {
      if (date && isValid(date)) {
        const formattedDate = format(date, dateFormat);
        setEditValue(formattedDate);
        onSave(date); // Pass Date object, not string
      }
      setIsEditing(false);
    },
    [dateFormat, onSave],
  );

  // Parse string value to Date for DatePicker
  const parseDateValue = useCallback((): Date | undefined => {
    if (!editValue || typeof editValue !== 'string') return undefined;
    try {
      const parsed = parse(editValue, dateFormat, new Date());
      return isValid(parsed) ? parsed : undefined;
    } catch {
      return undefined;
    }
  }, [editValue, dateFormat]);

  // Handle date range change
  const handleDateRangeChange = useCallback(
    (range: DateRange | undefined) => {
      if (range) {
        setDateRangeValue(range);
        // Convert to DateRangeValue for onSave
        const rangeValue: DateRangeValue = { from: range.from, to: range.to };
        onSave(rangeValue);
      }
      setIsEditing(false);
    },
    [onSave],
  );

  // Early return for non-editable cells
  if (!isEditable) {
    return <>{children}</>;
  }

  if (isEditing) {
    // Date range editor
    if (editorType === 'dateRange') {
      return (
        <div
          ref={containerRef}
          className="relative"
          onClick={e => e.stopPropagation()}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === 'Escape') {
              e.stopPropagation();
            }
          }}
          role="button"
          tabIndex={0}
        >
          <DateRangePicker value={dateRangeValue} onChange={handleDateRangeChange} format={dateFormat} />
        </div>
      );
    }

    // Date editor
    if (editorType === 'date') {
      return (
        <div
          ref={containerRef}
          className="relative"
          onClick={e => e.stopPropagation()}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === 'Escape') {
              e.stopPropagation();
            }
          }}
          role="button"
          tabIndex={0}
        >
          <DatePicker value={parseDateValue()} onChange={handleDateChange} format={dateFormat} />
        </div>
      );
    }

    // Text editor (default)
    return (
      <Input
        ref={inputRef}
        type="text"
        value={editValue}
        onChange={setEditValue}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        onClick={e => e.stopPropagation()}
      />
    );
  }

  return (
    <div className="flex items-center w-full gap-2 group/editable" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <span className="flex-1 truncate">{children}</span>
      <div className={cn('transition-opacity', isHovered ? 'opacity-100' : 'opacity-0')}>
        <Button variant="ghost" onClick={handleEditClick} icon="SquarePen" size="xs" aria-label="Edit cell" />
      </div>
    </div>
  );
};

export default EditableCell;
