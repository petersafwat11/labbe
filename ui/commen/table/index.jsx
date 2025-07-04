'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import styles from './table.module.css';
// TODO: Replace with your actual CheckBox and TableArrow components
const CheckBox = ({ checked, onChange }) => (
  <input type="checkbox" onChange={onChange} />
);
const TableArrow = () => (
  <span
    style={{
      display: 'inline-block',
      width: 12,
      height: 12,
      border: 'solid #333',
      borderWidth: '0 2px 2px 0',
      padding: 2,
      transform: 'rotate(45deg)',
    }}
  />
);

const DynamicTable = ({
  columns = [],
  data = [],
  caption,
  addFilter,
  filters,
  checkedRows = [],
  onToggleRowCheck,
  onToggleAllRows,
}) => {
  const tableRef = useRef(null);

  // Function to synchronize header and body cell widths
  const synchronizeColumnWidths = useCallback(() => {
    if (!tableRef.current) return;

    const headerCells = tableRef.current.querySelectorAll('[data-header-cell]');
    const bodyRows = tableRef.current.querySelectorAll('[data-body-row]');

    headerCells.forEach((headerCell, index) => {
      const columnId = headerCell.getAttribute('data-column-id');
      const headerWidth = headerCell.offsetWidth;

      // Apply width to all body cells in this column
      bodyRows.forEach((bodyRow) => {
        const bodyCell = bodyRow.querySelector(
          `[data-column-id="${columnId}"]`
        );
        if (bodyCell) {
          bodyCell.style.width = `${headerWidth}px`;
          bodyCell.style.minWidth = `${headerWidth}px`;
          bodyCell.style.maxWidth = `${headerWidth}px`;
        }
      });
    });
  }, []);

  // Function to get width of a specific header cell by column ID
  const getHeaderCellWidth = useCallback((columnId) => {
    if (!tableRef.current) return null;

    const headerCell = tableRef.current.querySelector(
      `[data-header-cell][data-column-id="${columnId}"]`
    );

    if (headerCell) {
      return {
        offsetWidth: headerCell.offsetWidth,
        clientWidth: headerCell.clientWidth,
        scrollWidth: headerCell.scrollWidth,
        computedWidth: window.getComputedStyle(headerCell).width,
      };
    }

    return null;
  }, []);

  // Function to apply width to body cells of a specific column
  const applyWidthToColumn = useCallback((columnId, width) => {
    if (!tableRef.current) return;

    const bodyRows = tableRef.current.querySelectorAll('[data-body-row]');

    bodyRows.forEach((bodyRow) => {
      const bodyCell = bodyRow.querySelector(`[data-column-id="${columnId}"]`);
      if (bodyCell) {
        bodyCell.style.width = `${width}px`;
        bodyCell.style.minWidth = `${width}px`;
        bodyCell.style.maxWidth = `${width}px`;
      }
    });
  }, []);

  // Function to synchronize all columns or specific column
  const syncColumnWidths = useCallback(
    (specificColumnId = null) => {
      if (specificColumnId) {
        const headerWidth = getHeaderCellWidth(specificColumnId);
        if (headerWidth) {
          applyWidthToColumn(specificColumnId, headerWidth.offsetWidth);
        }
      } else {
        synchronizeColumnWidths();
      }
    },
    [getHeaderCellWidth, applyWidthToColumn, synchronizeColumnWidths]
  );

  // Synchronize widths on mount and when data changes
  useEffect(() => {
    // Small delay to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      synchronizeColumnWidths();
    }, 100);

    return () => clearTimeout(timer);
  }, [data, columns, synchronizeColumnWidths]);

  // Synchronize widths on window resize
  useEffect(() => {
    const handleResize = () => {
      synchronizeColumnWidths();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [synchronizeColumnWidths]);

  const handleAddFilter = useCallback(
    (filter) => {
      addFilter && addFilter(filter.key, filter.value);
    },
    [addFilter]
  );

  return (
    <div className={styles.tableWrapper} ref={tableRef}>
      {caption && <div className={styles.caption}>{caption}</div>}
      {/* Header */}
      <div
        className={styles.headerRow}
        style={{ gridTemplateColumns: `auto repeat(${columns.length}, 1fr)` }}
      >
        <div
          className={styles.headerCell}
          data-header-cell
          data-column-id="checkbox"
        >
          <CheckBox
            checked={
              checkedRows &&
              checkedRows.length === data.length &&
              data.length > 0
            }
            onChange={() => onToggleAllRows && onToggleAllRows()}
          />
        </div>
        {columns.map((col) => (
          <div
            key={String(col.key)}
            className={
              styles.headerCell +
              (filters?.orderBy === col?.filterKey &&
              col?.filterKey !== undefined
                ? ' ' + styles.headerCellActive
                : '') +
              (col.className ? ' ' + col.className : '')
            }
            data-header-cell
            data-column-id={col.key}
            onClick={() => {
              if (col?.filterKey) {
                handleAddFilter({
                  key: 'orderBy',
                  value: col?.filterKey?.toString(),
                });
              }
            }}
            style={{ cursor: col?.filterKey ? 'pointer' : 'default' }}
          >
            <div>{col.label}</div>
            {filters?.orderBy === col?.filterKey &&
              col?.filterKey !== undefined && (
                <div
                  className={filters?.order === 'ASC' ? styles.arrowAsc : ''}
                >
                  <TableArrow />
                </div>
              )}
          </div>
        ))}
      </div>
      {/* Body */}
      <div>
        {data.map((row, rowIndex) =>
          row ? (
            <div
              key={rowIndex}
              className={
                styles.bodyRow +
                (checkedRows?.includes(row?.id)
                  ? ' ' + styles.bodyRowChecked
                  : '')
              }
              data-body-row
              style={{
                gridTemplateColumns: `auto repeat(${columns.length}, 1fr)`,
              }}
              onClick={() => {
                if (checkedRows && checkedRows.length > 0) return;
                // TODO: Add row click logic if needed
              }}
            >
              <div className={styles.bodyCell} data-column-id="checkbox">
                <CheckBox
                  checked={checkedRows && row && checkedRows.includes(row?.id)}
                  onChange={() => onToggleRowCheck && onToggleRowCheck(row?.id)}
                />
              </div>
              {columns.map((col) => (
                <div
                  key={String(col.key)}
                  className={
                    styles.bodyCell + (col.className ? ' ' + col.className : '')
                  }
                  data-column-id={col.key}
                >
                  {col.render &&
                    !col.moreRenders &&
                    col.render(row[col.key], row)}
                  {col.render && col.moreRenders && col.render(row, row)}
                </div>
              ))}
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default DynamicTable;
