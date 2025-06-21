import React, { useEffect } from "react";
import styles from "./stepThree.module.css";
import InputGroup from "@/ui/commen/inputs/inputGroup/InputGroup";
import { StepTitle } from "../../../commen/title/SectionTitle";
import SectionTitle from "../../../commen/title/SectionTitle";
import CheckBoxItems from "@/ui/commen/checkboxItems/CheckBoxItems";
import { useTranslation } from "react-i18next";

const StepThree = ({
  whiteLabelData,
  setWhiteLabelData,
  onStepValidationChange,
  goToPreviousStep,
}) => {
  const { t } = useTranslation("signup");

  const validateStepThree = (data) => {
    const { numberOfEvents, numberOfGuestsPerEvent, eventsTypes, services } =
      data.systemRequirements;

    const isNumberOfEventsValid =
      numberOfEvents.value !== "" && !isNaN(Number(numberOfEvents.value));
    const isNumberOfGuestsValid =
      numberOfGuestsPerEvent.value !== "" &&
      !isNaN(Number(numberOfGuestsPerEvent.value));
    const areEventTypesSelected = eventsTypes.value.length > 0;
    const areServicesSelected = services.value.length > 0;

    return (
      isNumberOfEventsValid &&
      isNumberOfGuestsValid &&
      areEventTypesSelected &&
      areServicesSelected
    );
  };

  const handleInputChange = (section, field, value) => {
    setWhiteLabelData((prevData) => {
      const newData = {
        ...prevData,
        [section]: {
          ...prevData[section],
          [field]: { value, error: "" },
        },
      };
      onStepValidationChange(validateStepThree(newData));
      return newData;
    });
  };

  const handleCheckboxChange = (section, field, item, checked) => {
    setWhiteLabelData((prevData) => {
      const currentValues = prevData[section][field].value;
      let newValues;

      if (checked) {
        newValues = [...currentValues, item];
      } else {
        newValues = currentValues.filter((value) => value !== item);
      }

      const newData = {
        ...prevData,
        [section]: {
          ...prevData[section],
          [field]: { value: newValues, error: "" },
        },
      };
      onStepValidationChange(validateStepThree(newData));
      return newData;
    });
  };

  useEffect(() => {
    onStepValidationChange(validateStepThree(whiteLabelData));
  }, [whiteLabelData, onStepValidationChange]);

  return (
    <div className={styles.container}>
      <StepTitle
        title={t("signupForm.whiteLabel.requirements.title")}
        description={t("signupForm.whiteLabel.requirements.description")}
        onArrowClick={() => {
          console.log("StepThree previous arrow clicked!");
          goToPreviousStep();
        }}
      />

      <div className={styles.sections}>
        <div className={styles.section}>
          <SectionTitle
            title={t("signupForm.whiteLabel.requirements.usage.title")}
            icon="/svg/auth/usage.svg"
            height={24}
            width={24}
          />

          <div className={styles.row}>
            <InputGroup
              label={t(
                "signupForm.whiteLabel.requirements.fields.numberOfEvents.label"
              )}
              type="number"
              placeholder={t(
                "signupForm.whiteLabel.requirements.fields.events.placeholder"
              )}
              required
              name="numberOfEvents"
              value={whiteLabelData.systemRequirements.numberOfEvents.value}
              onChange={(e) =>
                handleInputChange(
                  "systemRequirements",
                  "numberOfEvents",
                  e.target.value
                )
              }
              error={whiteLabelData.systemRequirements.numberOfEvents.error}
              iconPath="auth/calendar.svg"
            />
            <InputGroup
              label={t(
                "signupForm.whiteLabel.requirements.fields.numberOfGuestsPerEvent.label"
              )}
              type="number"
              placeholder={t(
                "signupForm.whiteLabel.requirements.fields.guests.placeholder"
              )}
              required
              name="numberOfGuestsPerEvent"
              value={
                whiteLabelData.systemRequirements.numberOfGuestsPerEvent.value
              }
              onChange={(e) =>
                handleInputChange(
                  "systemRequirements",
                  "numberOfGuestsPerEvent",
                  e.target.value
                )
              }
              error={
                whiteLabelData.systemRequirements.numberOfGuestsPerEvent.error
              }
              iconPath="auth/people.svg"
            />
          </div>
        </div>

        <div className={styles.section}>
          <SectionTitle
            title={t("signupForm.whiteLabel.requirements.eventTypes.title")}
            icon="/svg/auth/calendar.svg"
            height={24}
            width={24}
          />

          <div className={styles.options}>
            <CheckBoxItems
              items={t(
                "signupForm.whiteLabel.requirements.eventTypes.options",
                { returnObjects: true }
              )}
              checkedItems={whiteLabelData.systemRequirements.eventsTypes.value}
              onChange={(item, checked) =>
                handleCheckboxChange(
                  "systemRequirements",
                  "eventsTypes",
                  item,
                  checked
                )
              }
            />
          </div>
        </div>

        <div className={styles.section}>
          <SectionTitle
            title={t(
              "signupForm.whiteLabel.requirements.systemIntegration.title"
            )}
            icon="/svg/auth/calendar.svg"
            height={24}
            width={24}
          />

          <div className={styles.options}>
            <CheckBoxItems
              items={t(
                "signupForm.whiteLabel.requirements.systemIntegration.options",
                { returnObjects: true }
              )}
              checkedItems={whiteLabelData.systemRequirements.services.value}
              onChange={(item, checked) =>
                handleCheckboxChange(
                  "systemRequirements",
                  "services",
                  item,
                  checked
                )
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepThree;
