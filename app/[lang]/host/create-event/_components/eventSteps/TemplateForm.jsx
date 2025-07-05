'use client';
import React, { useRef } from 'react';
import CardLayout from '@/ui/commen/card/CardLayout';
import styles from './templateForm.module.css';
import InputGroup from '@/ui/commen/inputs/inputGroup/InputGroup';
import InputSelect from '@/ui/commen/inputs/inputGroup/InputSelect';
import DatePicker from '@/ui/commen/inputs/datePicker';
import ColorPickerGroup from '@/ui/commen/inputs/inputGroup/ColorPickerGroup';
import PopupLayout from '@/ui/commen/popup/PopupLayout';
import TextArea from '@/ui/commen/inputs/inputGroup/TextArea';
import TimePicker from '@/ui/commen/inputs/TimePicker';
import Button from '@/ui/commen/button/Button';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useTranslation } from 'react-i18next';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { templateFormSchema } from '@/utils/schemas/createEventSchema';
import {
  formatDateForDisplay,
  formatDateWithSpans,
  formatTimeWithSpans,
  htmlToImageConvert,
  dataUrlToBlob,
  dataUrlToFile,
  previewImage,
  uploadImage,
} from '@/utils/index';

const fontOptions = [
  { value: 'inter', label: 'Inter' },
  { value: 'cairo', label: 'Cairo' },
  { value: 'lato', label: 'Lato' },
];

function TemplateForm({ isOpen, onClose, locale, setEventValues }) {
  const ImageOfTemplate = useRef(null);
  const { t } = useTranslation('createEvent');
  const isLg = useMediaQuery('(min-width: 1024px)');

  // Initialize React Hook Form
  const methods = useForm({
    resolver: zodResolver(templateFormSchema(t)),
    defaultValues: {
      messageText: '',
      brideName: '',
      groomName: '',
      guestMessage: '',
      entryDate: null,
      entryTime: '12:00:AM',
      address: '',
      endMessage: '',
      fontType: 'cairo',
      primaryColor: '#5a4a42',
    },
  });

  const {
    watch,
    handleSubmit,
    formState: { errors },
  } = methods;

  // console.log('formvalues, ', watch(), 'errors...', errors);

  // Watch all form values for real-time updates
  const formData = watch();

  // Handle image conversion
  const handleImageConvert = async () => {
    try {
      // OPTION 1: Basic usage - auto-download (default)
      const dataUrl = await htmlToImageConvert(
        ImageOfTemplate,
        'template-image'
      );
      console.log('Generated image dataUrl:', dataUrl);

      // OPTION 2: Get image without auto-download
      // const dataUrl = await htmlToImageConvert(ImageOfTemplate, 'template-image', { autoDownload: false });
      // console.log('Image dataUrl without download:', dataUrl);

      // OPTION 3: Get image as blob/file for upload or other operations
      const imageData = await htmlToImageConvert(
        ImageOfTemplate,
        'template-image',
        {
          autoDownload: true,
          returnBlob: true,
        }
      ).then((data) => {
        // console.log('data...', data);
        setEventValues('invitationSettings.templateImage', data.file);
      });

      // console.log('imageData...', imageData);

      // console.log('Image data:', imageData);
      // // imageData contains: { dataUrl, blob, file }

      // OPTION 4: Manual conversion using helper functions
      // const dataUrl = await htmlToImageConvert(ImageOfTemplate, 'template-image', { autoDownload: false });
      // const blob = await dataUrlToBlob(dataUrl);
      // const file = await dataUrlToFile(dataUrl, 'template-image.png');

      // OPTION 5: Preview image in new tab
      // previewImage(dataUrl);

      // OPTION 6: Upload to server
      // const imageFile = await dataUrlToFile(dataUrl, 'template-image.png');
      // const uploadResult = await uploadImage(imageFile, '/api/upload-template');
      // console.log('Upload result:', uploadResult);

      // OPTION 7: Save to state or local storage
      // localStorage.setItem('template-image', dataUrl);
      // or
      // setImageData(dataUrl); // if you have state for it
    } catch (error) {
      console.error('Error converting template to image:', error);
    }
  };
  // Handle form submission
  const onSubmit = (data) => {
    // console.log('Template data:', data);
    handleImageConvert();
    // onClose();
  };

  return (
    <PopupLayout isOpen={isOpen} onClose={onClose}>
      <div className={styles.header}>
        <h2>{t('edit_design_template')}</h2>
        <button style={{ cursor: 'pointer' }} onClick={onClose}>
          <img src="/svg/events/close-circle.svg" alt="close" />
        </button>
      </div>
      <CardLayout className={styles.container}>
        <FormProvider {...methods}>
          <form className={styles.rightForm} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formGrid}>
              <div style={{ gridColumn: 'span 2' }}>
                <TextArea
                  label={t('message_text')}
                  placeholder={t('message_text_placeholder')}
                  name="messageText"
                />
              </div>
              <InputGroup
                label={t('bride_name')}
                placeholder={t('bride_name_placeholder')}
                name="brideName"
              />
              <InputGroup
                label={t('groom_name')}
                placeholder={t('groom_name_placeholder')}
                name="groomName"
              />
              <div style={{ gridColumn: 'span 2' }}>
                <InputGroup
                  name="guestMessage"
                  label={t('guest_message')}
                  placeholder={t('guest_message_placeholder')}
                />
              </div>

              <DatePicker
                label={t('event_date')}
                placeholder={t('event_date_placeholder')}
                name="entryDate"
              />
              <TimePicker label={t('event_time')} name="entryTime" />

              <InputGroup
                label={t('address')}
                placeholder={t('address_placeholder')}
                name="address"
              />
              <InputGroup
                label={t('end_message')}
                placeholder={t('end_message_placeholder')}
                name="endMessage"
              />
              <InputSelect
                label={t('font_type')}
                placeholder={t('font_type_placeholder')}
                name="fontType"
                options={fontOptions}
              />
              <ColorPickerGroup
                label={t('primary_color')}
                name="primaryColor"
              />
            </div>
            {!isLg && (
              <div className={styles.buttonContainer}>
                <Button
                  variant="secondary"
                  onClick={onClose}
                  title={t('cancel')}
                  type="button"
                />
                <Button variant="primary" title={t('save')} type="submit" />
              </div>
            )}
          </form>
          {isLg && (
            <div className={styles.leftPreview}>
              <div className={styles.templatePreview} ref={ImageOfTemplate}>
                <img
                  src="/svg/events/template1.svg"
                  alt="invitation preview"
                  className={styles.invitationBackground}
                />
                <div className={styles.templateContent}>
                  <div
                    className={styles.messageText}
                    style={{
                      color: formData.primaryColor || '#5a4a42',
                      fontFamily: formData.fontType || 'cairo',
                    }}
                  >
                    {formData.messageText || t('message_text_placeholder')}
                  </div>
                  <div className={styles.brideAndGroomName}>
                    <p
                      className={styles.brideName}
                      style={{
                        color: formData.primaryColor || '#5a4a42',
                        fontFamily: formData.fontType || 'cairo',
                      }}
                    >
                      {formData.brideName || t('bride_name_placeholder')}
                    </p>
                    <span className={styles.and}> & </span>
                    <p
                      className={styles.groomName}
                      style={{
                        color: formData.primaryColor || '#5a4a42',
                        fontFamily: formData.fontType || 'cairo',
                      }}
                    >
                      {formData.groomName || t('groom_name_placeholder')}
                    </p>
                  </div>
                  <div
                    className={styles.guestMessage}
                    style={{
                      color: formData.primaryColor || '#5a4a42',
                      fontFamily: formData.fontType || 'cairo',
                    }}
                  >
                    {formData.guestMessage || t('guest_message_placeholder')}
                  </div>
                  <div
                    className={styles.entryDate}
                    style={{
                      color: formData.primaryColor || '#5a4a42',
                      fontFamily: formData.fontType || 'cairo',
                    }}
                  >
                    {formatDateWithSpans(formData.entryDate, t, styles)}
                  </div>
                  <div
                    className={styles.entryTime}
                    style={{
                      color: formData.primaryColor || '#5a4a42',
                      fontFamily: formData.fontType || 'cairo',
                    }}
                  >
                    {formatTimeWithSpans(formData.entryTime, locale, t)}
                  </div>
                  <div
                    className={styles.address}
                    style={{
                      color: formData.primaryColor || '#5a4a42',
                      fontFamily: formData.fontType || 'cairo',
                    }}
                  >
                    {formData.address || t('address_placeholder')}
                  </div>
                  <div
                    className={styles.endMessage}
                    style={{
                      color: formData.primaryColor || '#5a4a42',
                      fontFamily: formData.fontType || 'cairo',
                    }}
                  >
                    {formData.endMessage || t('end_message_placeholder')}
                  </div>
                </div>
              </div>
              <div className={styles.buttonContainer}>
                <Button
                  variant="secondary"
                  onClick={onClose}
                  title={t('cancel')}
                  type="button"
                />
                <Button
                  variant="primary"
                  title={t('save')}
                  // onClick={handleImageConvert}
                  onClick={handleSubmit(onSubmit)}
                  type="button"
                />
              </div>
            </div>
          )}
        </FormProvider>
      </CardLayout>
    </PopupLayout>
  );
}

export default TemplateForm;
