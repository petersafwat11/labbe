import React from 'react';
import ContinueSignupForm from '@/ui/signup/continueSignupForm/ContinueSignupForm';
import initTranslations from '@/localization/i18n';

async function Page(params) {
  const { lang } = await params;
  await initTranslations(lang, ['continueSignup']);
  return <ContinueSignupForm />;
}

export default Page; 