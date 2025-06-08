import React from 'react';
import styles from './stepTwo.module.css';
import InputGroup from '@/ui/commen/inputs/inputGroup/InputGroup';
import { StepTitle } from '../title/SectionTitle';
import SectionTitle from '../title/SectionTitle';
import { useTranslation } from 'react-i18next';

const StepTwo = ({ whiteLabelData, setWhiteLabelData }) => {
  const { t } = useTranslation('signup');

  const handleInputChange = (section, field, value) => {
    setWhiteLabelData({
      ...whiteLabelData,
      [section]: {
        ...whiteLabelData[section],
        [field]: { value, error: '' },
      },
    });
  };

  return (
    <div className={styles.container}>
      <StepTitle
        title={t('signupForm.whiteLabel.login.title')}
        description={t('signupForm.whiteLabel.login.description')}
      />

      <div className={styles.sections}>
        <div className={styles.section}>
          <SectionTitle
            title={t('signupForm.whiteLabel.login.title')}
            icon="/svg/auth/personal-info.svg"
            height={24}
            width={24}
          />

          <div className={styles.inputs}>
            <InputGroup
              label={t('signupForm.whiteLabel.login.fields.email.label')}
              type="email"
              placeholder={t(
                'signupForm.whiteLabel.login.fields.email.placeholder'
              )}
              required
              name="email"
              value={whiteLabelData.loginData.email.value}
              onChange={(e) =>
                handleInputChange('loginData', 'email', e.target.value)
              }
              error={whiteLabelData.loginData.email.error}
              iconPath="auth/building.svg"
            />
            <InputGroup
              label={t('signupForm.whiteLabel.login.fields.domain.label')}
              type="url"
              placeholder={t(
                'signupForm.whiteLabel.login.fields.domain.placeholder'
              )}
              required
              name="domain"
              value={whiteLabelData.loginData.domain.value}
              onChange={(e) =>
                handleInputChange('loginData', 'domain', e.target.value)
              }
              error={whiteLabelData.loginData.domain.error}
              iconPath="auth/building.svg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepTwo;
