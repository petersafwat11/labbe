import InputGroup from '@/ui/commen/inputs/inputGroup/InputGroup';
import Image from 'next/image';
import React from 'react';
import styles from './continueFillingData.module.css';
import ConfirmBtn from '@/ui/commen/confirmButton/ConfirmBtn';
import { StepTitle } from '../whiteLabel/title/SectionTitle';
import SectionTitle from '../whiteLabel/title/SectionTitle';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const ContinueFillingData = ({ data, setData, showFormsForSignup }) => {
  const { t } = useTranslation('signup');

  // Define validation schema
  const signupSchema = z.object({
    name: z.string()
      .min(2, t('signupForm.personalInfo.errors.nameMinLength'))
      .max(50, t('signupForm.personalInfo.errors.nameMaxLength')),
    service: z.string()
      .min(1, t('signupForm.initialForm.service.errors.serviceRequired'))
  });

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch
  } = useForm({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
    defaultValues: {
      name: data.name.value,
      service: data.service.value
    }
  });

  // Watch form values
  const formValues = watch();

  const onSubmit = () => {
    // The handleSubmit function from useForm will automatically prevent onSubmit from being called if there are validation errors.
    // So, we just need to call showFormsForSignup directly here.
    showFormsForSignup(formValues);
  };

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
            value={formValues.name}
            onChange={(e) => {
              setValue('name', e.target.value);
              setData((prevData) => ({
                ...prevData,
                name: { value: e.target.value, error: errors.name?.message || '' },
              }));
            }}
            error={errors.name?.message}
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
              clickHandler={() => {
                setValue('service', t('signupForm.initialForm.service.options.whiteLabel'));
                setData((prevData) => ({
                  ...prevData,
                  service: { value: t('signupForm.initialForm.service.options.whiteLabel'), error: errors.service?.message || '' },
                }));
              }}
              selectedService={formValues.service}
            />
            <Service
              title={t('signupForm.initialForm.service.options.hosted')}
              description={t(
                'signupForm.initialForm.service.descriptions.hosted'
              )}
              iconPath="/svg/auth/invite.svg"
              clickHandler={() => {
                setValue('service', t('signupForm.initialForm.service.options.hosted'));
                setData((prevData) => ({
                  ...prevData,
                  service: { value: t('signupForm.initialForm.service.options.hosted'), error: errors.service?.message || '' },
                }));
              }}
              selectedService={formValues.service}
            />
            <Service
              title={t('signupForm.initialForm.service.options.selfService')}
              description={t(
                'signupForm.initialForm.service.descriptions.selfService'
              )}
              iconPath="/svg/auth/qrcode.svg"
              clickHandler={() => {
                setValue('service', t('signupForm.initialForm.service.options.selfService'));
                setData((prevData) => ({
                  ...prevData,
                  service: { value: t('signupForm.initialForm.service.options.selfService'), error: errors.service?.message || '' },
                }));
              }}
              selectedService={formValues.service}
            />
          </div>
          {errors.service && (
            <p className={styles.error}>{errors.service.message}</p>
          )}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <ConfirmBtn
            text={t('signupForm.initialForm.buttons.confirm')}
            active={formValues.name.length > 0 && formValues.service.length > 0}
            type="submit"
          />
        </form>
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
