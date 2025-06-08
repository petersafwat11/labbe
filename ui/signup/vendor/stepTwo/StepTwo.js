import React from "react";
import styles from "./stepTwo.module.css";
import InputGroup from "@/ui/commen/inputs/inputGroup/InputGroup";
import CheckBoxItems from "@/ui/commen/checkboxItems/CheckBoxItems";
import { StepTitle } from "../../whiteLabel/title/SectionTitle";
import SectionTitle from "../../whiteLabel/title/SectionTitle";

const StepTwo = ({ vendorData, setVendorData }) => {
  const handleInputChange = (section, field, value) => {
    setVendorData({
      ...vendorData,
      [section]: {
        ...vendorData[section],
        [field]: { value, error: "" },
      },
    });
  };

  const handleCheckboxChange = (field, item, checked) => {
    const currentValues = vendorData.serviceData[field].value;
    let newValues;

    if (checked) {
      // Add item if checked
      newValues = [...currentValues, item];
    } else {
      // Remove item if unchecked
      newValues = currentValues.filter((value) => value !== item);
    }

    setVendorData({
      ...vendorData,
      serviceData: {
        ...vendorData.serviceData,
        [field]: { value: newValues, error: "" },
      },
    });
  };

  return (
    <div className={styles.container}>
      <StepTitle
        title="تفاصيل الخدمة أو المتجر"
        description="عرّف الزوار بخدماتك والمجالات التي تغطيها."
      />
      <div className={styles.sections}>
        {/* Commercial Registration Section */}
        <div className={styles.section}>
          <SectionTitle
            title="نسخة من السجل التجارى (اختياري)"
            icon="/svg/auth/document.svg"
            height={24}
            width={24}
          />
          <div className={styles.inputs}>
            <InputGroup
              label="رقم السجل التجاري"
              type="text"
              placeholder="أدخل رقم السجل التجاري"
              name="commercialRegister"
              value={vendorData.serviceData.commercialRegister.value}
              onChange={(e) =>
                handleInputChange(
                  "serviceData",
                  "commercialRegister",
                  e.target.value
                )
              }
              error={vendorData.serviceData.commercialRegister.error}
              iconPath="auth/document-text.svg"
            />
            <InputGroup
              label="رقم الهوية الوطنية أو رقم الإقامة"
              type="text"
              placeholder="رقم الهوية الوطنية أو السجل المدني"
              name="idNumber"
              value={vendorData.serviceData.idNumber.value}
              onChange={(e) =>
                handleInputChange("serviceData", "idNumber", e.target.value)
              }
              error={vendorData.serviceData.idNumber.error}
              iconPath="auth/user-tag.svg"
            />
          </div>
        </div>

        {/* Service Description Section */}
        <div className={styles.section}>
          <SectionTitle
            title="نبذة عن الخدمة"
            icon="/svg/auth/setting.svg"
            height={24}
            width={24}
          />
          <div className={styles.inputs}>
            <InputGroup
              label="وصف موجز للخدمة"
              type="text"
              placeholder="أدخل وصف موجز"
              name="serviceDescription"
              value={vendorData.serviceData.serviceDescription.value}
              onChange={(e) =>
                handleInputChange(
                  "serviceData",
                  "serviceDescription",
                  e.target.value
                )
              }
              error={vendorData.serviceData.serviceDescription.error}
              iconPath="auth/quote-circle.svg"
            />
          </div>
        </div>

        {/* Event Planning Services */}
        <h2>أنشطة التجار المختلفة عبر منصة</h2>
        <div className={styles.section}>
          <SectionTitle
            title="خدمات تنظيم الفعاليات والمناسبات"
            // icon="/svg/auth/calendar.svg"
            // height={24}
            // width={24}
          />
          <div className={styles.options}>
            <CheckBoxItems
              items={[
                "تأجير قاعات واستراحات",
                "تنظيم طاولات وترتيب الجلوس",
                "تنسيق الورود والديكور",
                "تنسيق حفلات وزفاف",
                "تصميم الدعوات الرقمية والمطبوعة",
                "خدمات الضيافة  (قهوة، شاي، مشروبات)",
              ]}
              checkedItems={vendorData.serviceData.eventPlanning.value}
              onChange={(item, checked) =>
                handleCheckboxChange("eventPlanning", item, checked)
              }
              columns={2}
            />
          </div>
        </div>

        {/* Media Production Services */}
        <div className={styles.section}>
          <SectionTitle
            title=" التصوير والإنتاج"
            // icon="/svg/auth/video.svg"
            // height={24}
            // width={24}
          />
          <div className={styles.options}>
            <CheckBoxItems
              items={[
                "تصوير فوتوغرافي وفيديو للمناسبات",
                "مونتاج فيديوهات للمناسبات",
                "تصوير جوي درون",
                "مونتاج فيديوهات للمناسبات",
              ]}
              checkedItems={vendorData.serviceData.mediaProduction.value}
              onChange={(item, checked) =>
                handleCheckboxChange("mediaProduction", item, checked)
              }
              columns={2}
            />
          </div>
        </div>

        {/* Gifts and Giveaways Services */}
        <div className={styles.section}>
          <SectionTitle
            title="الهدايا والتوزيعات"
            // icon="/svg/auth/gift.svg"
            // height={24}
            // width={24}
          />
          <div className={styles.options}>
            <CheckBoxItems
              items={[
                "تجهيز توزيعات وهدايا الضيوف",
                "صناديق الشوكولاتة والبخور",
                "تغليف الهدايا وتصاميم مخصصة",
                "كروت التهنئة والإهداء",
              ]}
              checkedItems={vendorData.serviceData.giftsAndGiveaways.value}
              onChange={(item, checked) =>
                handleCheckboxChange("giftsAndGiveaways", item, checked)
              }
              columns={2}
            />
          </div>
        </div>

        {/* Food and Beverages Services */}
        <div className={styles.section}>
          <SectionTitle
            title="الأغذية والمشروبات"
            // icon="/svg/auth/coffee.svg"
            // height={24}
            // width={24}
          />
          <div className={styles.options}>
            <CheckBoxItems
              items={[
                "كيك المناسبات  (زفاف، مواليد، نجاح، ...)",
                "مأكولات شعبية أو عالمية",
                "ذبائح وأرز",
                "عربات طعام متنقلة (كوفي بار، فشار)",
                "بوفيه ضيافة متكامل",
              ]}
              checkedItems={vendorData.serviceData.foodAndBeverages.value}
              onChange={(item, checked) =>
                handleCheckboxChange("foodAndBeverages", item, checked)
              }
              columns={2}
            />
          </div>
        </div>

        {/* Beauty and Fashion Services */}
        <div className={styles.section}>
          <SectionTitle
            title="التجميل والأزياء"
            // icon="/svg/auth/star.svg"
            // height={24}
            // width={24}
          />
          <div className={styles.options}>
            <CheckBoxItems
              items={[
                "خدمات التجميل المنزلي  (مكياج، شعر)",
                "تأجير فساتين الزفاف والمناسبات",
                "تصميم عبايات  وخياطة نسائية",
                "صالونات  حلاقة وتزيين",
                "تفصيل ثياب رجالي",
              ]}
              checkedItems={vendorData.serviceData.beautyAndFashion.value}
              onChange={(item, checked) =>
                handleCheckboxChange("beautyAndFashion", item, checked)
              }
              columns={2}
            />
          </div>
        </div>

        {/* Logistics and Delivery Services */}
        <div className={styles.section}>
          <SectionTitle
            title="اللوجستيات والتوصيل"
            // icon="/svg/auth/truck.svg"
            // height={24}
            // width={24}
          />
          <div className={styles.options}>
            <CheckBoxItems
              items={[
                "خدمات سائقين وضيافة  VIP",
                "توصيل التوزيعات والطلبات",
                "تنسيق نقل الضيوف بالباصات",
                "تأجير سيارات المناسبات (كاديلاك، GMC...)",
              ]}
              checkedItems={vendorData.serviceData.logisticsAndDelivery.value}
              onChange={(item, checked) =>
                handleCheckboxChange("logisticsAndDelivery", item, checked)
              }
              columns={2}
            />
          </div>
        </div>

        {/* Corporate Services */}
        <div className={styles.section}>
          <SectionTitle
            title="خدمات للشركات والجهات"
            // icon="/svg/auth/briefcase.svg"
            // height={24}
            // width={24}
          />
          <div className={styles.options}>
            <CheckBoxItems
              items={[
                "تنظيم مؤتمرات ومعارض",
                "تجهيز هدايا دعائية للشركات",
                "حلول طباعة وتصميم رسمي",
                "خدمة استقبال وتسجيل الضيوف",
              ]}
              checkedItems={vendorData.serviceData.corporateServices.value}
              onChange={(item, checked) =>
                handleCheckboxChange("corporateServices", item, checked)
              }
              columns={2}
            />
          </div>
        </div>

        {/* Location Information */}
        <div className={styles.section}>
          <SectionTitle
            title="المقر الرئيسي للمنشأة"
            icon="/svg/auth/location.svg"
            height={24}
            width={24}
          />
          <div className={styles.inputs}>
            <InputGroup
              label="المدينة"
              type="text"
              placeholder="أدخل المدينة"
              name="city"
              value={vendorData.serviceData.city.value}
              onChange={(e) =>
                handleInputChange("serviceData", "city", e.target.value)
              }
              error={vendorData.serviceData.city.error}
              iconPath="auth/location.svg"
            />
            <SectionTitle
              title="نطاق التغطية"
              // icon="/svg/auth/briefcase.svg"
              // height={24}
              // width={24}
            />

            <div className={styles.options}>
              <CheckBoxItems
                items={["محلى", "إقليمى", "مناطق محدده", ""]}
                checkedItems={vendorData.serviceData.coverageArea.value}
                onChange={(item, checked) =>
                  handleCheckboxChange("coverageArea", item, checked)
                }
                columns={2}
              />
            </div>

            <InputGroup
              label="نطاق التغطية"
              type="text"
              placeholder="حدد نطاق الخدمة الجغرافي"
              name="coverageArea"
              value={vendorData.serviceData.coverageArea.value}
              onChange={(e) =>
                handleInputChange("serviceData", "coverageArea", e.target.value)
              }
              error={vendorData.serviceData.coverageArea.error}
              iconPath="auth/map.svg"
            />
          </div>
        </div>

        {/* Other Information */}
        <div className={styles.section}>
          <SectionTitle
            title="معلومات إضافية"
            icon="/svg/auth/note-text.svg"
            height={24}
            width={24}
          />
          <div className={styles.inputs}>
            <InputGroup
              label="معلومات أخرى (اختياري)"
              type="text"
              placeholder="أضف أي معلومات إضافية ترغب في مشاركتها..."
              name="otherData"
              value={vendorData.serviceData.otherData.value}
              onChange={(e) =>
                handleInputChange("serviceData", "otherData", e.target.value)
              }
              error={vendorData.serviceData.otherData.error}
              iconPath="auth/note-text.svg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepTwo;
