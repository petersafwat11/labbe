import React from 'react';
import Card from '@/ui/commen/card/Card';
import ConfirmBtn from '@/ui/commen/confirmButton/ConfirmBtn';
import styles from './serviceSelectionCard.module.css';
import { useTranslation } from 'react-i18next';

const ServiceSelectionCard = ({
  title,
  mainPrice,
  subPrice,
  description,
  features,
  additionalFeaturesText,
  buttonText,
  iconPath,
  iconAlt,
  onClick,
  isSelected
}) => {
  const { t } = useTranslation('continueSignup');

  return (
    <Card
      className={`${styles.serviceSelectionCard} ${isSelected ? styles.selected : ''}`}
      iconPath={iconPath}
      iconAlt={iconAlt}
    >
      <h3 className={styles.cardTitle}>{title}</h3>
      <div className={styles.priceContainer}>
        <span className={styles.mainPrice}>{mainPrice}</span>
        <span className={styles.currencyAndPeriod}>{t('currency')}{subPrice ? ` / ${subPrice}` : ''}{t('perMonth')}</span>
      </div>
      <p className={styles.cardDescription}>{description}</p>
      <ul className={styles.featuresList}>
        {features.map((feature, index) => (
          <li key={index} className={styles.featureItem}>
            <span className={styles.checkIconContainer}>
              <img src="/svg/auth/true.svg" alt="feature status icon" className={styles.checkIcon} />
            </span>
            {feature.text}
          </li>
        ))}
      </ul>
      {additionalFeaturesText && (
        <p className={styles.additionalFeaturesText}>{additionalFeaturesText}</p>
      )}
      <div className={styles.buttonWrapper}>
        <ConfirmBtn
          text={buttonText}
          active={isSelected}
          clickHandler={onClick}
        />
      </div>
    </Card>
  );
};

export default ServiceSelectionCard; 