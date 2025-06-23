import React from 'react';
import initTranslations from '@/localization/i18n';
import Form from '@/ui/signup/host/Form';

async function Page(params) {
  const { lang } = await params;

  const { t } = await initTranslations(lang, 'login');
  // console.log("t('loginForm.greeting')..", t('loginForm.greeting'));
  return <Form />;
}

export default Page;
