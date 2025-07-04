'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import styles from './templateCard.module.css';
import { useTranslation } from 'react-i18next';

function TemplateCard({ template, isSelected, onSelect, disabledHover }) {
  const [hoveredTemplate, setHoveredTemplate] = useState(null);
  const { t } = useTranslation('createEvent');
  return (
    <div
      onMouseEnter={() => !disabledHover && setHoveredTemplate(template.id)}
      onMouseLeave={() => !disabledHover && setHoveredTemplate(null)}
      key={template.id}
      className={`${styles.templateItem} ${isSelected ? styles.selected : ''}`}
    >
      <Image
        src={template.image}
        alt={template.name}
        width={100}
        height={120}
      />
      <div
        className={`${styles.overlay} ${
          hoveredTemplate === template.id ? styles.active : ''
        }`}
      >
        <button
          type="button"
          className={styles.overlayButton}
          onClick={() => onSelect(template)}
        >
          {t('choose')}
        </button>
      </div>
      {isSelected && (
        <div className={styles.selectedIndicator}>
          <img
            src="/svg/events/check-circle.svg"
            alt="Selected"
            width={24}
            height={24}
          />
        </div>
      )}
    </div>
  );
}

export default TemplateCard;
