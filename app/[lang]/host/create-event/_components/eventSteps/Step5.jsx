import React from "react";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import { StepTitle } from "@/ui/commen/title/SectionTitle";
import Card from "@/ui/commen/card/Card";
import InputSelect from "@/ui/commen/inputs/inputGroup/InputSelect";
import Button from "@/ui/commen/button/Button";
import DetailCard from "@/ui/host/events/DetailCard";

function Step5() {
  const { t } = useTranslation("createEvent");
  const { watch, setValue } = useFormContext();

  const formData = watch();
  const { eventDetails, guestList, supervisorsList, launchSettings } = formData;

  const scheduleOptions = [
    { value: "now", label: t("send_now") },
    { value: "later", label: t("schedule_later") },
  ];

  const formatDate = (date) => {
    if (!date) return "";
    if (typeof date === "string") return date;
    return new Date(date).toLocaleDateString();
  };

  const formatEventType = (type) => {
    const typeMap = {
      wedding: t("wedding"),
      birthday: t("birthday"),
      graduation: t("graduation"),
      meeting: t("meeting"),
      conference: t("conference"),
      other: t("other"),
    };
    return typeMap[type] || type;
  };

  const handleCopyInvitationLink = () => {
    // Generate invitation link based on event data
    const invitationLink = `https://example.com/invitation/${eventDetails?.title
      ?.replace(/\s+/g, "-")
      .toLowerCase()}`;
    navigator.clipboard.writeText(invitationLink);
    // You might want to show a toast notification here
  };

  const handleShareInvitation = () => {
    // Implement share functionality
    if (navigator.share) {
      navigator.share({
        title: eventDetails?.title || t("sample_event_title"),
        text: `${t("sample_event_invitation")} - ${eventDetails?.title}`,
        url: `https://example.com/invitation/${eventDetails?.title
          ?.replace(/\s+/g, "-")
          .toLowerCase()}`,
      });
    } else {
      // Fallback to copying to clipboard
      handleCopyInvitationLink();
    }
  };

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
          value={formatEventType(eventDetails?.type) || t("wedding")}
          sublabel={""}
        />
        <DetailCard
          icon={"/svg/events/calendar.svg"}
          label={t("event_date")}
          value={formatDate(eventDetails?.date) || "25/12/2025"}
          sublabel={""}
        />
        <DetailCard
          icon={"/svg/events/people.svg"}
          label={t("number_of_invitees")}
          value={guestList?.length?.toString() || "0"}
          sublabel={""}
        />
        <DetailCard
          icon={"/svg/events/people.svg"}
          label={t("number_of_supervisors")}
          value={supervisorsList?.length?.toString() || "0"}
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
            {eventDetails?.title || t("sample_event_title")}
          </div>
          <div
            style={{ color: "#656565", fontSize: "14px", marginBottom: "1rem" }}
          >
            {eventDetails?.description || t("sample_event_description")} <br />
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
              {guestList?.length || 0} {t("sample_guests_count").split(" ")[1]}
            </span>
            <span>
              <img
                src="/svg/events/calendar.svg"
                alt="date"
                style={{ width: 18, verticalAlign: "middle", marginLeft: 4 }}
              />{" "}
              {formatDate(eventDetails?.date)} -{" "}
              {eventDetails?.time || "7:00 PM"}
            </span>
            <span>
              <img
                src="/svg/events/location.svg"
                alt="location"
                style={{ width: 18, verticalAlign: "middle", marginLeft: 4 }}
              />{" "}
              {eventDetails?.location?.address || t("sample_event_location")}
            </span>
            {eventDetails?.location?.address && (
              <span>
                <a
                  href={`https://maps.google.com/?q=${eventDetails.location.latitude},${eventDetails.location.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#d38200", textDecoration: "underline" }}
                >
                  {t("view_on_map")}
                </a>
              </span>
            )}
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
            name="launchSettings.sendSchedule"
            options={scheduleOptions}
          />
          <Button
            variant="secondary"
            title={t("copy_invitation_link")}
            icon="/svg/events/copy.svg"
            onClick={handleCopyInvitationLink}
          />
          <Button
            variant="secondary"
            title={t("share_invitation")}
            icon="/svg/events/share.svg"
            onClick={handleShareInvitation}
          />
        </div>
        <Button
          variant="primary"
          title={t("confirm_and_launch")}
          style={{ width: "100%", fontWeight: 700, fontSize: "1.1rem" }}
          type="submit"
        />
      </div>
    </div>
  );
}

export default Step5;
