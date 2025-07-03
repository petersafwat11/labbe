'use client';
import { StepTitle } from '@/ui/commen/title/SectionTitle';
import Image from 'next/image';
import React, { useState } from 'react';
import styles from '../createEvent.module.css';
import TemplateForm from './TemplateForm';
import TextArea from '@/ui/commen/inputs/inputGroup/TextArea';
import InputGroup from '@/ui/commen/inputs/inputGroup/InputGroup';
function Step4() {
  const [isOpen, setIsOpen] = useState(true);
  const templates = [
    {
      id: 1,
      image: '/svg/events/template1.svg',
    },
    {
      id: 2,
      image: '/svg/events/template2.svg',
    },
    {
      id: 3,
      image: '/svg/events/template3.svg',
    },
    {
      id: 4,
      image: '/svg/events/template1.svg',
    },
    {
      id: 5,
      image: '/svg/events/template2.svg',
    },
    {
      id: 6,
      image: '/svg/events/template3.svg',
    },
    {
      id: 7,
      image: '/svg/events/template1.svg',
    },
    {
      id: 8,
      image: '/svg/events/template2.svg',
    },
    {
      id: 9,
      image: '/svg/events/template3.svg',
    },
  ];
  const [hoveredTemplate, setHoveredTemplate] = useState(null);
  return (
    <div>
      <StepTitle title={'تخصيص الدعوة'} description={'صمم الدعوة على كيفك'} />
      <div className={styles.templatesContainer}>
        {templates.map((template, index) => (
          <div
            onMouseEnter={() => setHoveredTemplate(template.id)}
            onMouseLeave={() => setHoveredTemplate(null)}
            key={index}
            className={styles.templateItem}
          >
            <Image
              src={template.image}
              alt={template.name}
              width={100}
              height={120}
            />
            <div
              className={`${styles.overlay} ${
                hoveredTemplate === template.id ? styles.active : ''
              }`}
            >
              <button
                type="button"
                className={styles.overlayButton}
                onClick={() => setIsOpen(true)}
              >
                اخيار
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.formContainer}>
        <TextArea
          name="invitationMessage"
          label="رسالة الدعوة"
          placeholder="ادخل رسالة الدعوة"
        />
        <InputGroup
          name="resenceReply"
          label="رد تلقائي للحضور"
          placeholder="ادخل رسالة الرد"
        />
        <InputGroup
          name="absenceReply"
          label="رد تلقائي للغياب"
          placeholder="ادخل رسالة الرد"
        />

        <InputGroup
          name="expectedReply"
          label="رد تلقائي للمتوقع الحضور"
          placeholder="ادخل رسالة الرد"
        />
        <InputGroup
          label="اضف ملاحظتك (اختياري)"
          placeholder="ادخل ملاحظتك"
          name="note"
        />
      </div>

      <TemplateForm isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}

export default Step4;
