import React from 'react';
import styles from './stepSix.module.css';
import InputGroup from '@/ui/commen/inputs/inputGroup/InputGroup';
import { StepTitle } from '../../../commen/title/SectionTitle';
import SectionTitle from '../../../commen/title/SectionTitle';

const StepSix = ({ vendorData, setVendorData }) => {
  return (
    <div className={styles.container}>
      <StepTitle
        title="روابط إضافية (اختياري)"
        description="أضف روابط انترنت إضافية للتعريف على عملكم."
      />
      <div className={styles.sections}>
        {/* Social Media and Links Section */}
        <div className={styles.section}>
          <div className={styles.inputs}>
            <InputGroup
              label="رابط انستقرام"
              type="url"
              placeholder="أدخل رابط انستقرام"
              name="otherLinksAndData.instagramLink"
              iconPath="auth/instagram.svg"
            />

            <InputGroup
              label="رابط موقع إلكتروني"
              type="url"
              placeholder="أدخل رابط الموقع الإلكتروني"
              name="otherLinksAndData.websiteLink"
              iconPath="auth/link.svg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepSix;
