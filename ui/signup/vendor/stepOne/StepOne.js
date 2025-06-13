import React, { useState } from 'react';
import styles from './stepOne.module.css';
import Image from 'next/image';
import InputGroup from '@/ui/commen/inputs/inputGroup/InputGroup';
import { StepTitle } from '../title/SectionTitle';
import SectionTitle from '../title/SectionTitle';
import { useTranslation } from 'react-i18next';

const StepOne = ({ whiteLabelData, setWhiteLabelData }) => {
  const { t } = useTranslation('signup');
  const [logoFile, setLogoFile] = useState(null);

  // Predefined color options
  const colorOptions = [
    '#c28e5c',
    '#d6b392',
    '#8b6f47',
    '#a0845c',
    '#e74c3c',
    '#3498db',
    '#2ecc71',
    '#f39c12',
    '#9b59b6',
    '#1abc9c',
    '#34495e',
    '#95a5a6',
  ];

  const handleInputChange = (section, field, value) => {
    setWhiteLabelData({
      ...whiteLabelData,
      [section]: {
        ...whiteLabelData[section],
        [field]: { value, error: '' },
      },
    });
  };

  const handleColorSelect = (color, colorType) => {
    handleInputChange('identity', colorType, color);
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setLogoFile(file);
      handleInputChange('identity', 'logo', file.name);
    }
  };

  return (
    <div className={styles.container}>
      <StepTitle
        title={t('signupForm.whiteLabel.identity.title')}
        description={t('signupForm.whiteLabel.identity.description')}
      />
      <div className={styles.sections}>
        <div className={styles.section}>
          <SectionTitle
            title={t('signupForm.personalInfo.title')}
            icon="/svg/auth/personal-info.svg"
            height={24}
            width={24}
          />
          <div className={styles.inputs}>
            <InputGroup
              label={t('signupForm.whiteLabel.identity.arabicName.label')}
              type="text"
              placeholder={t(
                'signupForm.whiteLabel.identity.arabicName.placeholder'
              )}
              required
              name="arabic_name"
              value={whiteLabelData.identity.arabic_name.value}
              onChange={(e) =>
                handleInputChange('identity', 'arabic_name', e.target.value)
              }
              error={whiteLabelData.identity.arabic_name.error}
              iconPath="auth/building.svg"
            />
            <InputGroup
              label={t('signupForm.whiteLabel.identity.englishName.label')}
              type="text"
              placeholder={t(
                'signupForm.whiteLabel.identity.englishName.placeholder'
              )}
              required
              name="english_name"
              value={whiteLabelData.identity.english_name.value}
              onChange={(e) =>
                handleInputChange('identity', 'english_name', e.target.value)
              }
              error={whiteLabelData.identity.english_name.error}
              iconPath="auth/building.svg"
            />
          </div>
        </div>

        <div className={styles.section}>
          <SectionTitle
            title={t('signupForm.whiteLabel.identity.logo.title')}
            icon="/svg/auth/logo.svg"
            height={24}
            width={24}
          />
          <div className={styles.logo_upload}>
            <Image
              src="/svg/auth/logo.svg"
              alt="logo"
              width={24}
              height={24}
            />
            <p className={styles.section_description}>
              {t('signupForm.whiteLabel.identity.logo.description')}
            </p>
            <label className={styles.upload_button}>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                style={{ display: 'none' }}
              />
              {t('signupForm.whiteLabel.identity.logo.button')}
            </label>
            {logoFile && (
              <p className={styles.file_selected}>
                {t('selected')}: {logoFile.name}
              </p>
            )}
          </div>
        </div>

        <div className={styles.section}>
          <SectionTitle
            title={t('signupForm.whiteLabel.identity.colors.title')}
            icon="/svg/auth/color.svg"
            height={24}
            width={24}
          />

          <div className={styles.color_section}>
            {/* Primary Color Selection */}
            <div className={styles.colors}>
              <h4 className={styles.color_label}>
                {t('signupForm.whiteLabel.identity.primaryColor.label')}
              </h4>
              <div className={styles.custom_color}>
                <div className={styles.color_inputs}>
                  <input
                    type="color"
                    value={whiteLabelData.identity.primaryColor.value}
                    onChange={(e) =>
                      handleColorSelect(e.target.value, 'primaryColor')
                    }
                    className={styles.color_picker}
                  />
                  <input
                    placeholder={t(
                      'signupForm.whiteLabel.identity.colors.customColor'
                    )}
                    value={whiteLabelData.identity.primaryColor.value}
                    onChange={(e) =>
                      handleColorSelect(e.target.value, 'primaryColor')
                    }
                    className={styles.color_picker_input}
                  />
                </div>
              </div>
            </div>

            {/* Secondary Color Selection */}
            <div className={styles.color_section}>
              <h4 className={styles.color_label}>
                {t('signupForm.whiteLabel.identity.secondaryColor.label')}
              </h4>
              <div className={styles.custom_color}>
                <input
                  type="color"
                  value={whiteLabelData.identity.secondaryColor.value}
                  onChange={(e) =>
                    handleColorSelect(e.target.value, 'secondaryColor')
                  }
                  className={styles.color_picker}
                />
                <input
                  placeholder={t(
                    'signupForm.whiteLabel.identity.colors.customColor'
                  )}
                  value={whiteLabelData.identity.secondaryColor.value}
                  onChange={(e) =>
                    handleColorSelect(e.target.value, 'secondaryColor')
                  }
                  className={styles.color_picker_input}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <SectionTitle
            title={t('signupForm.whiteLabel.identity.fontFamily.label')}
            icon="/svg/auth/text.svg"
            height={24}
            width={24}
          />
          <InputGroup
            label={t('signupForm.whiteLabel.identity.fontFamily.label')}
            type="text"
            placeholder={t(
              'signupForm.whiteLabel.identity.fontFamily.placeholder'
            )}
            name="fontFamily"
            value={whiteLabelData.identity.fontFamily.value}
            onChange={(e) =>
              handleInputChange('identity', 'fontFamily', e.target.value)
            }
            error={whiteLabelData.identity.fontFamily.error}
            iconPath="auth/smallcaps.svg"
          />
        </div>
      </div>
    </div>
  );
};

export default StepOne;
