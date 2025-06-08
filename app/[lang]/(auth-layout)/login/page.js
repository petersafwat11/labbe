import React from 'react';
import Form from '@/ui/login/form/Form';
import initTranslations from '@/localization/i18n';
async function Page(params) {
  const { lang } = await params;

  const { t } = await initTranslations(lang, 'login');
  // console.log("t('loginForm.greeting')..", t('loginForm.greeting'));
  return <Form />;
}

export default Page;
