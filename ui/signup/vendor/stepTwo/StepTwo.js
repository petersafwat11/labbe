import React from 'react';
import styles from './stepTwo.module.css';
import InputGroup from '@/ui/commen/inputs/inputGroup/InputGroup';
import CheckBoxItems from '@/ui/commen/inputs/checkboxItems/CheckBoxItems';
import { StepTitle } from '../../../commen/title/SectionTitle';
import SectionTitle from '../../../commen/title/SectionTitle';
import { useTranslation } from 'react-i18next';

const StepTwo = ({ goToPreviousStep }) => {
  const { t } = useTranslation('signup');

  return (
    <div className={styles.container}>
      <StepTitle
        title={t('signupForm.vendor.serviceData.title')}
        description={t('signupForm.vendor.serviceData.description')}
        onArrowClick={goToPreviousStep}
      />
      <div className={styles.sections}>
        {/* Commercial Registration Section */}
        <div className={styles.section}>
          <SectionTitle
            title={t(
              'signupForm.vendor.serviceData.commercialRegistration.title'
            )}
            icon="/svg/auth/document.svg"
            height={24}
            width={24}
          />
          <div className={styles.inputs}>
            <InputGroup
              label={t(
                'signupForm.vendor.serviceData.commercialRegister.label'
              )}
              type="text"
              placeholder={t(
                'signupForm.vendor.serviceData.commercialRegister.placeholder'
              )}
              name="serviceData.commercialRegister"
              iconPath="auth/document-text.svg"
            />
            <InputGroup
              label={t('signupForm.vendor.serviceData.idNumber.label')}
              type="text"
              placeholder={t(
                'signupForm.vendor.serviceData.idNumber.placeholder'
              )}
              name="serviceData.idNumber"
              iconPath="auth/user-tag.svg"
            />
          </div>
        </div>

        {/* Service Description Section */}
        <div className={styles.section}>
          <SectionTitle
            title={t('signupForm.vendor.serviceData.serviceDescription.title')}
            icon="/svg/auth/setting.svg"
            height={24}
            width={24}
          />
          <div className={styles.inputs}>
            <InputGroup
              label={t(
                'signupForm.vendor.serviceData.serviceDescription.label'
              )}
              type="text"
              placeholder={t(
                'signupForm.vendor.serviceData.serviceDescription.placeholder'
              )}
              required
              name="serviceData.serviceDescription"
              iconPath="auth/quote-circle.svg"
            />
          </div>
        </div>

        {/* Event Planning Services */}
        <div className={styles.section}>
          <SectionTitle
            title={t('signupForm.vendor.serviceData.eventPlanning.title')}
            icon="/svg/auth/calendar.svg"
            height={24}
            width={24}
          />
          <div className={styles.options}>
            <CheckBoxItems
              items={t('signupForm.vendor.serviceData.eventPlanning.options', {
                returnObjects: true,
              })}
              name="serviceData.eventPlanning"
              columns={2}
            />
          </div>
        </div>

        {/* Media Production Services */}
        <div className={styles.section}>
          <SectionTitle
            title={t('signupForm.vendor.serviceData.mediaProduction.title')}
            icon="/svg/auth/video.svg"
            height={24}
            width={24}
          />
          <div className={styles.options}>
            <CheckBoxItems
              items={t(
                'signupForm.vendor.serviceData.mediaProduction.options',
                { returnObjects: true }
              )}
              name="serviceData.mediaProduction"
              columns={2}
            />
          </div>
        </div>

        {/* Gifts and Giveaways Services */}
        <div className={styles.section}>
          <SectionTitle
            title={t('signupForm.vendor.serviceData.giftsAndGiveaways.title')}
            icon="/svg/auth/gift.svg"
            height={24}
            width={24}
          />
          <div className={styles.options}>
            <CheckBoxItems
              items={t(
                'signupForm.vendor.serviceData.giftsAndGiveaways.options',
                { returnObjects: true }
              )}
              name="serviceData.giftsAndGiveaways"
              columns={2}
            />
          </div>
        </div>

        {/* Food and Beverages Services */}
        <div className={styles.section}>
          <SectionTitle
            title={t('signupForm.vendor.serviceData.foodAndBeverages.title')}
            icon="/svg/auth/coffee.svg"
            height={24}
            width={24}
          />
          <div className={styles.options}>
            <CheckBoxItems
              items={t(
                'signupForm.vendor.serviceData.foodAndBeverages.options',
                { returnObjects: true }
              )}
              name="serviceData.foodAndBeverages"
              columns={2}
            />
          </div>
        </div>

        {/* Beauty and Fashion Services */}
        <div className={styles.section}>
          <SectionTitle
            title={t('signupForm.vendor.serviceData.beautyAndFashion.title')}
            icon="/svg/auth/star.svg"
            height={24}
            width={24}
          />
          <div className={styles.options}>
            <CheckBoxItems
              items={t(
                'signupForm.vendor.serviceData.beautyAndFashion.options',
                { returnObjects: true }
              )}
              name="serviceData.beautyAndFashion"
              columns={2}
            />
          </div>
        </div>

        {/* Logistics and Delivery Services */}
        <div className={styles.section}>
          <SectionTitle
            title={t(
              'signupForm.vendor.serviceData.logisticsAndDelivery.title'
            )}
            icon="/svg/auth/truck.svg"
            height={24}
            width={24}
          />
          <div className={styles.options}>
            <CheckBoxItems
              items={t(
                'signupForm.vendor.serviceData.logisticsAndDelivery.options',
                { returnObjects: true }
              )}
              name="serviceData.logisticsAndDelivery"
              columns={2}
            />
          </div>
        </div>

        {/* Corporate Services */}
        <div className={styles.section}>
          <SectionTitle
            title={t('signupForm.vendor.serviceData.corporateServices.title')}
            icon="/svg/auth/briefcase.svg"
            height={24}
            width={24}
          />
          <div className={styles.options}>
            <CheckBoxItems
              items={t(
                'signupForm.vendor.serviceData.corporateServices.options',
                { returnObjects: true }
              )}
              name="serviceData.corporateServices"
              columns={2}
            />
          </div>
        </div>

        {/* Location Information */}
        <div className={styles.section}>
          <SectionTitle
            title={t('signupForm.vendor.serviceData.location.title')}
            icon="/svg/auth/location.svg"
            height={24}
            width={24}
          />
          <div className={styles.inputs}>
            <InputGroup
              label={t('signupForm.vendor.serviceData.city.label')}
              type="text"
              placeholder={t('signupForm.vendor.serviceData.city.placeholder')}
              required
              name="serviceData.city"
              iconPath="auth/location.svg"
            />

            <div className={styles.options}>
              <CheckBoxItems
                items={t('signupForm.vendor.serviceData.coverageArea.options', {
                  returnObjects: true,
                })}
                name="serviceData.coverageArea"
                columns={2}
              />
            </div>
          </div>
        </div>

        {/* Other Information */}
        <div className={styles.section}>
          <SectionTitle
            title={t('signupForm.vendor.serviceData.otherInfo.title')}
            icon="/svg/auth/note-text.svg"
            height={24}
            width={24}
          />
          <div className={styles.inputs}>
            <InputGroup
              label={t('signupForm.vendor.serviceData.otherData.label')}
              type="text"
              placeholder={t(
                'signupForm.vendor.serviceData.otherData.placeholder'
              )}
              name="serviceData.otherData"
              iconPath="auth/note-text.svg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepTwo;
