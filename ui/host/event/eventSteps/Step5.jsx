import React from "react";
import { useTranslation } from "react-i18next";
import { StepTitle } from "@/ui/commen/title/SectionTitle";
import Card from "@/ui/commen/card/Card";
import InputSelect from "@/ui/commen/inputs/inputGroup/InputSelect";
import Button from "@/ui/commen/button/Button";
import DetailCard from "@/ui/host/events/DetailCard";

function Step5() {
  const { t } = useTranslation("createEvent");

  const scheduleOptions = [
    { value: "now", label: t("send_now") },
    { value: "later", label: t("schedule_later") },
  ];

  return (
    <div style={{ padding: "2.5rem 0" }}>
      <StepTitle
        title={t("review_and_launch")}
        description={t("review_and_launch_description")}
      />
      {/* Stats Row */}
      <div style={{ display: "flex", gap: "1.5rem", margin: "2rem 0" }}>
        <DetailCard
          icon={"/svg/events/dashboard-icon.svg"}
          label={t("event_type")}
          value={t("wedding")}
          sublabel={""}
        />
        <DetailCard
          icon={"/svg/events/calendar.svg"}
          label={t("event_date")}
          value={"25/12/2025"}
          sublabel={""}
        />
        <DetailCard
          icon={"/svg/events/people.svg"}
          label={t("number_of_invitees")}
          value={"250"}
          sublabel={""}
        />
        <DetailCard
          icon={"/svg/events/people.svg"}
          label={t("number_of_supervisors")}
          value={"2"}
          sublabel={""}
        />
      </div>
      {/* Event Details Card */}
      <Card
        style={{
          marginBottom: "2rem",
          background: "#faf8f6",
          border: "1px solid #e9ecef",
        }}
      >
        <div style={{ padding: "1.5rem" }}>
          <div
            style={{
              fontWeight: 700,
              fontSize: "16px",
              marginBottom: "0.5rem",
            }}
          >
            {t("sample_event_title")}
          </div>
          <div
            style={{ color: "#656565", fontSize: "14px", marginBottom: "1rem" }}
          >
            {t("sample_event_description")} <br />
            {t("sample_event_invitation")}
          </div>
          <div
            style={{
              display: "flex",
              gap: "2rem",
              alignItems: "center",
              fontSize: "14px",
              color: "#2c2c2c",
            }}
          >
            <span>
              <img
                src="/svg/events/people.svg"
                alt="guests"
                style={{ width: 18, verticalAlign: "middle", marginLeft: 4 }}
              />{" "}
              {t("sample_guests_count")}
            </span>
            <span>
              <img
                src="/svg/events/calendar.svg"
                alt="date"
                style={{ width: 18, verticalAlign: "middle", marginLeft: 4 }}
              />{" "}
              {t("sample_event_datetime")}
            </span>
            <span>
              <img
                src="/svg/events/location.svg"
                alt="location"
                style={{ width: 18, verticalAlign: "middle", marginLeft: 4 }}
              />{" "}
              {t("sample_event_location")}
            </span>
            <span>
              <a
                href="https://www.goglemap.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#d38200", textDecoration: "underline" }}
              >
                www.goglemap.com
              </a>
            </span>
          </div>
        </div>
      </Card>
      {/* Ready to Launch Section */}
      <div
        style={{
          background: "#eaf7ef",
          border: "1px solid #b6e2c6",
          borderRadius: 8,
          padding: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            color: "#1a7f3c",
            fontWeight: 700,
            fontSize: "18px",
            marginBottom: "0.5rem",
          }}
        >
          {t("ready_to_launch")}
        </div>
        <div
          style={{ color: "#1a7f3c", fontSize: "15px", marginBottom: "1.2rem" }}
        >
          {t("ready_to_launch_description")}
        </div>
        <div
          style={{
            display: "flex",
            gap: "1.5rem",
            alignItems: "center",
            marginBottom: "1.2rem",
          }}
        >
          <InputSelect
            label={t("schedule_sending")}
            placeholder={t("schedule_sending_placeholder")}
            name={"sendSchedule"}
            options={scheduleOptions}
          />
          <Button
            variant="secondary"
            title={t("copy_invitation_link")}
            icon="/svg/events/copy.svg"
            onClick={() => {}}
          />
          <Button
            variant="secondary"
            title={t("share_invitation")}
            icon="/svg/events/share.svg"
            onClick={() => {}}
          />
        </div>
        <Button
          variant="primary"
          title={t("confirm_and_launch")}
          style={{ width: "100%", fontWeight: 700, fontSize: "1.1rem" }}
          onClick={() => {}}
        />
      </div>
    </div>
  );
}

export default Step5;
