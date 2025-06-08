'use client';
import React, { useEffect, useState } from 'react';
import styles from './signupForm.module.css';
import FormHeader from '@/ui/commen/formHeader/FormHeader';
import WhiteLabelForm from '../whiteLabel/WhiteLabelForm';
import ContinueFillingData from '../continueFillingData/ContinueFillingData';
import { useTranslation } from 'react-i18next';

const SignupForm = () => {
  const { t } = useTranslation('signup');
  const [data, setData] = useState({
    name: { value: '', error: '' },
    service: { value: '', error: '' },
  });
  const [whiteLabelData, setWhiteLabelData] = useState({
    identity: {
      arabic_name: { value: '', error: '' },
      english_name: { value: '', error: '' },
      logo: { value: '', error: '' },
      primaryColor: { value: '', error: '' },
      secondaryColor: { value: '', error: '' },
      fontFamily: { value: '', error: '' },
    },
    loginData: {
      email: { value: '', error: '' },
      domain: { value: '', error: '' },
    },
    systemRequirements: {
      numberOfEvents: { value: '', error: '' },
      numberOfGuestsPerEvent: { value: '', error: '' },
      eventsTypes: { value: [], error: '' },
      services: { value: [], error: '' },
    },
    additionalServices: [],
    paymentData: {
      companyName: { value: '', error: '' },
      licenseNumber: { value: '', error: '' },
      TaxNumber: { value: '', error: '' },
      city: { value: '', error: '' },
      neighborhood: { value: '', error: '' },
      street: { value: '', error: '' },
      buildingNumber: { value: '', error: '' },
      additionalNumber: { value: '', error: '' },
      placeType: { value: '', error: '' },
      placeNumber: { value: '', error: '' },
      paymentMethod: { value: [], error: '' },
    },
  });
  const [hostData, setHostData] = useState({
    accountData: {
      name: { value: '', error: '' },
      email: { value: '', error: '' },
      password: { value: '', error: '' },
      confirmPassword: { value: '', error: '' },
    },
    companyData: {
      logo: { value: '', error: '' },
      companyName: { value: '', error: '' },
    },
  });
  const [showSignupform, setShowSignupform] = useState(false);
  const showFormsForSignup = () => {
    if (
      data.service.value ===
      t('signupForm.initialForm.service.options.whiteLabel')
    ) {
      setShowSignupform('whiteLabel');
    } else {
      setShowSignupform('host');
    }
  };
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div className={styles.container}>
      <div className={styles.form_header}>
        <FormHeader />
      </div>
      {showSignupform === 'whiteLabel' ? (
        <WhiteLabelForm
          whiteLabelData={whiteLabelData}
          setWhiteLabelData={setWhiteLabelData}
        />
      ) : showSignupform === 'host' ? (
        <div>host</div>
      ) : (
        <ContinueFillingData
          showFormsForSignup={showFormsForSignup}
          data={data}
          setData={setData}
        />
      )}
    </div>
  );
};

export default SignupForm;
