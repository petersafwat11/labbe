'use client';
import React, { useCallback } from 'react';
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
  const handleAddFilter = useCallback(
    (filter) => {
      addFilter && addFilter(filter.key, filter.value);
    },
    [addFilter]
  );

  return (
    <div className={styles.tableWrapper}>
      {caption && <div className={styles.caption}>{caption}</div>}
      {/* Header */}
      <div
        className={styles.headerRow}
        style={{ gridTemplateColumns: `auto repeat(${columns.length}, 1fr)` }}
      >
        <div className={styles.headerCell}>
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
              style={{
                gridTemplateColumns: `auto repeat(${columns.length}, 1fr)`,
              }}
              onClick={() => {
                if (checkedRows && checkedRows.length > 0) return;
                // TODO: Add row click logic if needed
              }}
            >
              <div className={styles.bodyCell}>
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
