'use client';
import React from 'react';
import CardLayout from '@/ui/commen/card/CardLayout';
import styles from './templateForm.module.css';
import InputGroup from '@/ui/commen/inputs/inputGroup/InputGroup';
import InputSelect from '@/ui/commen/inputs/inputGroup/InputSelect';
import DatePicker from '@/ui/commen/inputs/datePicker';
import ColorPickerGroup from '@/ui/commen/inputs/inputGroup/ColorPickerGroup';
import PopupLayout from '@/ui/commen/popup/PopupLayout';
import TextArea from '@/ui/commen/inputs/inputGroup/TextArea';
import FormHeader from '@/ui/commen/formHeader/FormHeader';
import { StepTitle } from '@/ui/commen/title/SectionTitle';
import Calendar from '@/ui/commen/inputs/Calendar';
import TimePicker from '@/ui/commen/inputs/TimePicker';
import Button from '@/ui/commen/button/Button';
import { FaClosedCaptioning } from 'react-icons/fa6';
import { useMediaQuery } from '@/hooks/use-media-query';

const fontOptions = [
  { value: 'inter', label: 'inter' },
  { value: 'cairo', label: 'cairo' },
  { value: 'lato', label: 'lato' },
];

function TemplateForm({ isOpen, onClose }) {
  const isLg = useMediaQuery('(min-width: 1024px)');
  return (
    <PopupLayout isOpen={isOpen} onClose={onClose}>
      <div className={styles.header}>
        <h2>تعديل قالب التصميم</h2>
        <button style={{ cursor: 'pointer' }} onClick={onClose}>
          <img src="/svg/events/close-circle.svg" alt="close" />
        </button>
      </div>
      <CardLayout className={styles.container}>
        <form className={styles.rightForm}>
          <div className={styles.formGrid}>
            <div style={{ gridColumn: 'span 2' }}>
              <TextArea
                label="نص الرسالة"
                placeholder="ادخل نص الرسالة"
                name="messageText"
              />
            </div>
            <InputGroup
              label="اسم العروسة"
              placeholder="ادخل اسم العروسة"
              name="brideName"
            />
            <InputGroup
              label="اسم العريس"
              placeholder="ادخل اسم العريس"
              name="groomName"
            />
            <div style={{ gridColumn: 'span 2' }}>
              <InputGroup
                name="guestMessage"
                label="رسالة الضيوف"
                placeholder="ادخل رسالة الضيوف"
              />
            </div>

            <DatePicker
              label="تاريخ الحفل"
              placeholder="اختر موعد الدخول"
              name="entryDate"
            />
            <TimePicker
              label="وقت الحفل"
              placeholder="اختر وقت الحفل"
              name="entryTime"
            />

            <InputGroup
              label="العنوان"
              placeholder="ادخل عنوان القاعة"
              name="address"
            />
            <InputGroup
              label="رسالة ختامية"
              placeholder="ادخل رسالة ختامية"
              name="endMessage"
            />
            <InputSelect
              label="نوع الخط"
              placeholder="اختر نوع الخط"
              name="fontType"
              options={fontOptions}
            />
            <ColorPickerGroup label="اللون الأساسي" name="primaryColor" />
          </div>
          {!isLg && (
            <div className={styles.buttonContainer}>
              <Button
                variant="secondary"
                onClick={onClose}
                title={'الغاء'}
              ></Button>
              <Button
                variant="primary"
                title={'حفظ'}
                onClick={onClose}
              ></Button>
            </div>
          )}
        </form>
        {isLg && (
          <div className={styles.leftPreview}>
            <img
              src="/svg/events/template1.svg"
              alt="invitation preview"
              className={styles.invitationImage}
            />
            <div className={styles.buttonContainer}>
              <Button
                variant="secondary"
                onClick={onClose}
                title={'الغاء'}
              ></Button>
              <Button
                variant="primary"
                title={'حفظ'}
                onClick={onClose}
              ></Button>
            </div>
          </div>
        )}
      </CardLayout>
    </PopupLayout>
  );
}

export default TemplateForm;
