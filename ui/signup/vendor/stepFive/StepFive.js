import React from "react";
import styles from "./stepFive.module.css";
import CheckBoxItems from "@/ui/commen/checkboxItems/CheckBoxItems";
import { StepTitle } from "../../whiteLabel/title/SectionTitle";
import SectionTitle from "../../whiteLabel/title/SectionTitle";

const StepFive = ({ vendorData, setVendorData }) => {
  const handlePaymentMethodChange = (item, checked) => {
    const currentValues = Array.isArray(
      vendorData.paymentData.paymentMethod?.value
    )
      ? vendorData.paymentData.paymentMethod.value
      : [];
    let newValues;

    if (checked) {
      newValues = [...currentValues, item];
    } else {
      newValues = currentValues.filter((value) => value !== item);
    }

    setVendorData({
      ...vendorData,
      paymentData: {
        ...vendorData.paymentData,
        paymentMethod: { value: newValues, error: "" },
      },
    });
  };

  const handleRefundTermsChange = (e) => {
    setVendorData({
      ...vendorData,
      paymentData: {
        ...vendorData.paymentData,
        termsForRefund: { value: e.target.checked, error: "" },
      },
    });
  };

  return (
    <div className={styles.container}>
      <StepTitle
        title="سياسة التعامل والدفع"
        description="حدد طرق الدفع المقبولة وسياسة الاسترداد."
      />
      <div className={styles.sections}>
        {/* Payment Methods Section */}
        <div className={styles.section}>
          <SectionTitle
            title="طرق الدفع المقبولة"
            icon="/svg/auth/card.svg"
            height={24}
            width={24}
          />
          <div className={styles.options}>
            <CheckBoxItems
              items={[
                "نقدي",
                "تحويل بنكي",
                "مدى",
                "فيزا / ماستر كارد",
                "أبل باي",
                "ستكى باي",
              ]}
              checkedItems={vendorData.paymentData.paymentMethod?.value || []}
              onChange={handlePaymentMethodChange}
              columns={2}
            />
          </div>
        </div>

        {/* Refund Policy Section */}
        <div className={styles.section}>
          <SectionTitle
            title="سياسة الاسترداد"
            icon="/svg/auth/refresh.svg"
            height={24}
            width={24}
          />
          <div className={styles.refund_policy}>
            <div className={styles.policy_text}>
              <p>
                في حالة الإلغاء أو عدم إمكانية تقديم الخدمة، سيتم استرداد المبلغ
                كاملاً خلال 3-5 أيام عمل. يحق للعميل إلغاء الطلب قبل 48 ساعة من
                موعد الفعالية مع استرداد 70% من قيمة المبلغ.
              </p>
            </div>
            <div className={styles.terms_checkbox}>
              <input
                type="checkbox"
                id="refundTerms"
                checked={vendorData.paymentData.termsForRefund.value}
                onChange={handleRefundTermsChange}
                className={styles.checkbox}
              />
              <label htmlFor="refundTerms" className={styles.checkbox_label}>
                أوافق على سياسة الاسترداد والشروط والأحكام
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepFive;
