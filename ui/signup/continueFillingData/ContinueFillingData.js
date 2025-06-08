import InputGroup from '@/ui/commen/inputs/inputGroup/InputGroup';
import Image from 'next/image';
import React from 'react';
import styles from './continueFillingData.module.css';
import ConfirmBtn from '@/ui/commen/confirmButton/ConfirmBtn';
import { StepTitle } from '../whiteLabel/title/SectionTitle';
import SectionTitle from '../whiteLabel/title/SectionTitle';
import { useTranslation } from 'react-i18next';

const ContinueFillingData = ({ data, setData, showFormsForSignup }) => {
  const { t } = useTranslation('signup');

  return (
    <div className={styles.form_container}>
      <StepTitle
        title={t('signupForm.personalInfo.title')}
        description={t('signupForm.initialForm.description')}
      />
      <div className={styles.form}>
        <div className={styles.section}>
          <SectionTitle title={t('signupForm.personalInfo.title')} />
          <InputGroup
            label={t('signupForm.personalInfo.name.label')}
            type="text"
            placeholder={t('signupForm.personalInfo.name.placeholder')}
            required
            name="name"
            value={data.name.value}
            onChange={(e) =>
              setData({ ...data, name: { value: e.target.value } })
            }
            error={data.name.error}
            iconPath="auth/profile.svg"
          />
        </div>
        <div className={styles.services}>
          <SectionTitle title={t('signupForm.initialForm.service.label')} />
          <p className={styles.services_description}>
            {t('signupForm.initialForm.description')}
          </p>
          <div className={styles.services_list}>
            <Service
              title={t('signupForm.initialForm.service.options.whiteLabel')}
              description={t(
                'signupForm.initialForm.service.descriptions.whiteLabel'
              )}
              iconPath="/svg/auth/plateform.svg"
              clickHandler={() =>
                setData({
                  ...data,
                  service: {
                    value: t(
                      'signupForm.initialForm.service.options.whiteLabel'
                    ),
                  },
                })
              }
              selectedService={data.service.value}
            />
            <Service
              title={t('signupForm.initialForm.service.options.hosted')}
              description={t(
                'signupForm.initialForm.service.descriptions.hosted'
              )}
              iconPath="/svg/auth/invite.svg"
              clickHandler={() =>
                setData({
                  ...data,
                  service: {
                    value: t('signupForm.initialForm.service.options.hosted'),
                  },
                })
              }
              selectedService={data.service.value}
            />
            <Service
              title={t('signupForm.initialForm.service.options.selfService')}
              description={t(
                'signupForm.initialForm.service.descriptions.selfService'
              )}
              iconPath="/svg/auth/qrcode.svg"
              clickHandler={() =>
                setData({
                  ...data,
                  service: {
                    value: t(
                      'signupForm.initialForm.service.options.selfService'
                    ),
                  },
                })
              }
              selectedService={data.service.value}
            />
          </div>
        </div>
        <ConfirmBtn
          clickHandler={showFormsForSignup}
          text={t('signupForm.initialForm.buttons.confirm')}
          active={data.name.value && data.service.value}
        />
      </div>
    </div>
  );
};

export default ContinueFillingData;

export const Service = ({
  title,
  description,
  iconPath,
  clickHandler,
  selectedService,
}) => {
  return (
    <div
      onClick={clickHandler}
      className={`${styles.service} ${
        selectedService === title ? styles.selected_service : ''
      }`}
    >
      <div className={styles.service_icon}>
        <Image
          src={iconPath}
          alt={title || 'service icon'}
          width={32}
          height={32}
        />
      </div>
      <div className={styles.service_text}>
        <h4 className={styles.service_title}>{title}</h4>
        <p className={styles.service_description}>{description}</p>
      </div>
    </div>
  );
};
