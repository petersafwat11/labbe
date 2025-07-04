'use client';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CardLayout from '../../commen/card/CardLayout';
import styles from './templatesSection.module.css';
import Tabs from '../../commen/tabs/Tabs';
import { templates } from '@/app/[lang]/host/create-event/_components/eventSteps/Step4';
import TemplateCard from '@/ui/commen/templateCard';
const dummyTemplates = [
  {
    labelKey: 'templates.wedding',
    fallback: 'حفلات زفاف',
    templates: templates.slice(0, 3),
  },
  {
    labelKey: 'templates.graduation',
    fallback: 'حفلات تخرج',
    templates: templates.slice(3, 5),
  },
  {
    labelKey: 'templates.birthday',
    fallback: 'حفلات عيد ميلاد',
    templates: templates.slice(5, 7),
  },
];

function TemplatesSection() {
  const { t } = useTranslation('home-events');
  const dummyTabs = [
    {
      key: 'templates.wedding',
      label: t('templates.wedding', 'حفلات زفاف'),
    },
    {
      key: 'templates.graduation',
      label: t('templates.graduation', 'حفلات تخرج'),
    },
    {
      key: 'templates.birthday',
      label: t('templates.birthday', 'حفلات عيد ميلاد'),
    },
  ];
  const [activeTab, setActiveTab] = useState(dummyTabs[0].key);
  return (
    <CardLayout className={styles.card}>
      <h3 className={styles.title}>
        {t('templates.title', 'قوالب المناسبات')}
      </h3>
      <p className={styles.description}>
        {t('templates.description', 'اختر قالب مناسب لمناسبتك')}
      </p>
      <Tabs tabs={dummyTabs} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className={styles.templatesContent}>
        {dummyTemplates
          .find((tpl) => tpl.labelKey === activeTab)
          ?.templates.map((tpl, idx) => (
            <TemplateCard
              key={idx}
              template={tpl}
              isSelected={false}
              onSelect={() => {}}
              disabledHover={true}
            />
          ))}
      </div>
    </CardLayout>
  );
}

export default TemplatesSection;
