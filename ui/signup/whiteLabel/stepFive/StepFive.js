import React from 'react';
import styles from './stepFive.module.css';
import InputGroup from '@/ui/commen/inputs/inputGroup/InputGroup';
import { StepTitle } from '../title/SectionTitle';
import SectionTitle from '../title/SectionTitle';
import CheckBoxItems from '@/ui/commen/checkboxItems/CheckBoxItems';
import { useTranslation } from 'react-i18next';

const StepFive = ({ whiteLabelData, setWhiteLabelData }) => {
  const { t } = useTranslation('signup');

  const handleInputChange = (section, field, value) => {
    setWhiteLabelData({
      ...whiteLabelData,
      [section]: {
        ...whiteLabelData[section],
        [field]: { value, error: '' },
      },
    });
  };

  const handleCheckboxChange = (item, checked) => {
    const currentValues = whiteLabelData.paymentData.paymentMethod.value;
    let newValues;

    if (checked) {
      newValues = [...currentValues, item];
    } else {
      newValues = currentValues.filter((value) => value !== item);
    }

    setWhiteLabelData({
      ...whiteLabelData,
      paymentData: {
        ...whiteLabelData.paymentData,
        paymentMethod: { value: newValues, error: '' },
      },
    });
  };

  return (
    <div className={styles.container}>
      <StepTitle
        title={t('signupForm.whiteLabel.payment.title')}
        description={t('signupForm.whiteLabel.payment.description')}
      />

      <div className={styles.sections}>
        {/* Company Information Section */}
        <div className={styles.section}>
          <SectionTitle
            title={t('signupForm.whiteLabel.payment.company.title')}
            icon="/svg/auth/building.svg"
            height={24}
            width={24}
          />

          <div className={styles.inputs}>
            <InputGroup
              label={t(
                'signupForm.whiteLabel.payment.company.fields.name.label'
              )}
              type="text"
              placeholder={t(
                'signupForm.whiteLabel.payment.company.fields.name.placeholder'
              )}
              required
              name="companyName"
              value={whiteLabelData.paymentData.companyName.value}
              onChange={(e) =>
                handleInputChange('paymentData', 'companyName', e.target.value)
              }
              error={whiteLabelData.paymentData.companyName.error}
              iconPath="auth/building.svg"
            />

            <InputGroup
              label={t(
                'signupForm.whiteLabel.payment.company.fields.license.label'
              )}
              type="text"
              placeholder={t(
                'signupForm.whiteLabel.payment.company.fields.license.placeholder'
              )}
              required
              name="licenseNumber"
              value={whiteLabelData.paymentData.licenseNumber.value}
              onChange={(e) =>
                handleInputChange(
                  'paymentData',
                  'licenseNumber',
                  e.target.value
                )
              }
              error={whiteLabelData.paymentData.licenseNumber.error}
              iconPath="auth/document.svg"
            />
            <InputGroup
              label={t(
                'signupForm.whiteLabel.payment.company.fields.tax.label'
              )}
              type="text"
              placeholder={t(
                'signupForm.whiteLabel.payment.company.fields.tax.placeholder'
              )}
              name="TaxNumber"
              value={whiteLabelData.paymentData.TaxNumber.value}
              onChange={(e) =>
                handleInputChange('paymentData', 'TaxNumber', e.target.value)
              }
              error={whiteLabelData.paymentData.TaxNumber.error}
              iconPath="auth/document.svg"
            />
          </div>
        </div>

        {/* National Address Section */}
        <div className={styles.section}>
          <SectionTitle
            title={t('signupForm.whiteLabel.payment.address.title')}
            icon="/svg/auth/location.svg"
            height={24}
            width={24}
          />

          <div className={styles.inputs}>
            <div className={styles.row}>
              <InputGroup
                label={t(
                  'signupForm.whiteLabel.payment.address.fields.city.label'
                )}
                type="text"
                placeholder={t(
                  'signupForm.whiteLabel.payment.address.fields.city.placeholder'
                )}
                required
                name="city"
                value={whiteLabelData.paymentData.city.value}
                onChange={(e) =>
                  handleInputChange('paymentData', 'city', e.target.value)
                }
                error={whiteLabelData.paymentData.city.error}
                iconPath="auth/location.svg"
              />
              <InputGroup
                label={t(
                  'signupForm.whiteLabel.payment.address.fields.neighborhood.label'
                )}
                type="text"
                placeholder={t(
                  'signupForm.whiteLabel.payment.address.fields.neighborhood.placeholder'
                )}
                required
                name="neighborhood"
                value={whiteLabelData.paymentData.neighborhood.value}
                onChange={(e) =>
                  handleInputChange(
                    'paymentData',
                    'neighborhood',
                    e.target.value
                  )
                }
                error={whiteLabelData.paymentData.neighborhood.error}
                iconPath="auth/location.svg"
              />
            </div>

            <InputGroup
              label={t(
                'signupForm.whiteLabel.payment.address.fields.street.label'
              )}
              type="text"
              placeholder={t(
                'signupForm.whiteLabel.payment.address.fields.street.placeholder'
              )}
              required
              name="street"
              value={whiteLabelData.paymentData.street.value}
              onChange={(e) =>
                handleInputChange('paymentData', 'street', e.target.value)
              }
              error={whiteLabelData.paymentData.street.error}
              iconPath="auth/location.svg"
            />

            <div className={styles.row}>
              <InputGroup
                label={t(
                  'signupForm.whiteLabel.payment.address.fields.buildingNumber.label'
                )}
                type="text"
                placeholder={t(
                  'signupForm.whiteLabel.payment.address.fields.buildingNumber.placeholder'
                )}
                required
                name="buildingNumber"
                value={whiteLabelData.paymentData.buildingNumber.value}
                onChange={(e) =>
                  handleInputChange(
                    'paymentData',
                    'buildingNumber',
                    e.target.value
                  )
                }
                error={whiteLabelData.paymentData.buildingNumber.error}
                iconPath="auth/location.svg"
              />
              <InputGroup
                label={t(
                  'signupForm.whiteLabel.payment.address.fields.additionalNumber.label'
                )}
                type="text"
                placeholder={t(
                  'signupForm.whiteLabel.payment.address.fields.additionalNumber.placeholder'
                )}
                name="additionalNumber"
                value={whiteLabelData.paymentData.additionalNumber.value}
                onChange={(e) =>
                  handleInputChange(
                    'paymentData',
                    'additionalNumber',
                    e.target.value
                  )
                }
                error={whiteLabelData.paymentData.additionalNumber.error}
                iconPath="auth/location.svg"
              />
            </div>

            <div className={styles.row}>
              <InputGroup
                label={t(
                  'signupForm.whiteLabel.payment.address.fields.placeType.label'
                )}
                type="text"
                placeholder={t(
                  'signupForm.whiteLabel.payment.address.fields.placeType.placeholder'
                )}
                name="placeType"
                value={whiteLabelData.paymentData.placeType.value}
                onChange={(e) =>
                  handleInputChange('paymentData', 'placeType', e.target.value)
                }
                error={whiteLabelData.paymentData.placeType.error}
                iconPath="auth/location.svg"
              />
              <InputGroup
                label={t(
                  'signupForm.whiteLabel.payment.address.fields.placeNumber.label'
                )}
                type="text"
                placeholder={t(
                  'signupForm.whiteLabel.payment.address.fields.placeNumber.placeholder'
                )}
                name="placeNumber"
                value={whiteLabelData.paymentData.placeNumber.value}
                onChange={(e) =>
                  handleInputChange(
                    'paymentData',
                    'placeNumber',
                    e.target.value
                  )
                }
                error={whiteLabelData.paymentData.placeNumber.error}
                iconPath="auth/location.svg"
              />
            </div>
          </div>
        </div>

        {/* Payment Methods Section */}
        <div className={styles.section}>
          <SectionTitle
            title={t('signupForm.whiteLabel.payment.paymentMethods.title')}
            icon="/svg/auth/payment.svg"
            height={24}
            width={24}
          />

          <div className={styles.options}>
            <CheckBoxItems
              items={t('signupForm.whiteLabel.payment.paymentMethods.options', {
                returnObjects: true,
              })}
              checkedItems={whiteLabelData.paymentData.paymentMethod.value}
              onChange={handleCheckboxChange}
              columns={2}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepFive;
