'use client';

import { I18nextProvider } from 'react-i18next';
import { createInstance } from 'i18next';
import React, { useEffect, useState } from 'react';
import initTranslations from '@/localization/i18n';

export default function ClientComponentsTranslationsProvider({
  children,
  locale,
  namespaces,
  resources,
}) {
  const [i18n, setI18n] = useState(() => {
    // Create a fallback instance immediately to prevent hydration issues
    const fallbackInstance = createInstance();
    fallbackInstance.init({
      lng: locale,
      fallbackLng: 'ar',
      supportedLngs: ['en', 'ar'],
      defaultNS: namespaces[0],
      fallbackNS: namespaces[0],
      ns: namespaces,
      resources: resources || {},
    });
    return fallbackInstance;
  });

  useEffect(() => {
    const initializeI18n = async () => {
      const i18nInstance = createInstance();
      await initTranslations(locale, namespaces, i18nInstance, resources);
      setI18n(i18nInstance);
    };

    initializeI18n();
  }, [locale, namespaces, resources]);

  // Don't render a div during loading, just render children
  // The i18n will be available after the effect runs
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
