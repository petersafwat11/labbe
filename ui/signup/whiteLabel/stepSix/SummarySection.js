import React from 'react';
import SectionTitle from '../../../commen/title/SectionTitle';
import styles from '../stepSix/stepSix.module.css';

const SummarySection = ({ title, icon, data, fields }) => {
  return (
    <div className={styles.section}>
      <SectionTitle title={title} icon={icon} height={24} width={24} />
      <div className={styles.summary_content}>
        {fields.map((field) => {
          const fieldValue = data[field.key];
          if (
            fieldValue === undefined ||
            fieldValue === null ||
            (typeof fieldValue === 'string' && fieldValue === '') ||
            (Array.isArray(fieldValue) && fieldValue.length === 0)
          )
            return null;

          let displayValue = fieldValue;
          if (Array.isArray(fieldValue)) {
            displayValue =
              fieldValue.length > 0 ? fieldValue.join(', ') : 'None selected';
          }

          return (
            <div key={field.key} className={styles.summary_item}>
              <span className={styles.summary_label}>{field.label}:</span>
              <span className={styles.summary_value}>
                {field.type === 'color' ? (
                  <div className={styles.color_preview}>
                    <div
                      className={styles.color_swatch}
                      style={{ backgroundColor: fieldValue }}
                    />
                    <span>{fieldValue}</span>
                  </div>
                ) : field.type === 'logo' ? (
                  fieldValue instanceof File ? (
                    <img
                      src={URL.createObjectURL(fieldValue)}
                      alt="Logo"
                      className={styles.logo_preview}
                    />
                  ) : (
                    <img
                      src={fieldValue}
                      alt="Logo"
                      className={styles.logo_preview}
                    />
                  )
                ) : (
                  displayValue
                )}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SummarySection;
