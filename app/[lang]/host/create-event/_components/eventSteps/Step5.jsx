import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';
import { StepTitle } from '@/ui/commen/title/SectionTitle';
import Card from '@/ui/commen/card/Card';
import InputSelect from '@/ui/commen/inputs/inputGroup/InputSelect';
import Button from '@/ui/commen/button/Button';
import DetailCard from '@/ui/host/events/DetailCard';
import styles from './createEvent.module.css';

function Step5() {
  const { t } = useTranslation('createEvent');
  const { watch, setValue } = useFormContext();

  const formData = watch();
  const { eventDetails, guestList, supervisorsList, launchSettings } = formData;

  const scheduleOptions = [
    { value: 'now', label: t('send_now') },
    { value: 'later', label: t('schedule_later') },
  ];

  const formatDate = (date) => {
    if (!date) return '';
    if (typeof date === 'string') return date;
    return new Date(date).toLocaleDateString();
  };

  const formatEventType = (type) => {
    const typeMap = {
      wedding: t('wedding'),
      birthday: t('birthday'),
      graduation: t('graduation'),
      meeting: t('meeting'),
      conference: t('conference'),
      other: t('other'),
    };
    return typeMap[type] || type;
  };

  // Stats data array for mapping
  const statsData = [
    {
      id: 'event_type',
      icon: '/svg/events/dashboard-icon.svg',
      label: t('event_type'),
      value: formatEventType(eventDetails?.type) || t('wedding'),
      sublabel: '',
    },
    {
      id: 'event_date',
      icon: '/svg/events/calendar.svg',
      label: t('event_date'),
      value: formatDate(eventDetails?.date) || '25/12/2025',
      sublabel: '',
    },
    {
      id: 'invitees_count',
      icon: '/svg/events/people.svg',
      label: t('number_of_invitees'),
      value: guestList?.length?.toString() || '0',
      sublabel: '',
    },
    {
      id: 'supervisors_count',
      icon: '/svg/events/people.svg',
      label: t('number_of_supervisors'),
      value: supervisorsList?.length?.toString() || '0',
      sublabel: '',
    },
  ];

  // Event info data array for mapping
  const eventInfoData = [
    {
      id: 'guests',
      icon: '/svg/events/people.svg',
      text: `${guestList?.length || 0} ${
        t('sample_guests_count').split(' ')[1]
      }`,
    },
    {
      id: 'date_time',
      icon: '/svg/events/calendar.svg',
      text: `${formatDate(eventDetails?.date)} - ${
        eventDetails?.time || '7:00 PM'
      }`,
    },
    {
      id: 'location',
      icon: '/svg/events/location.svg',
      text: eventDetails?.location?.address || t('sample_event_location'),
    },
  ];

  // Action buttons data array
  const actionButtons = [
    {
      id: 'copy_link',
      variant: 'secondary',
      title: t('copy_invitation_link'),
      icon: '/svg/events/copy.svg',
      onClick: handleCopyInvitationLink,
    },
    {
      id: 'share',
      variant: 'secondary',
      title: t('share_invitation'),
      icon: '/svg/events/share.svg',
      onClick: handleShareInvitation,
    },
  ];

  function handleCopyInvitationLink() {
    // Generate invitation link based on event data
    const invitationLink = `https://example.com/invitation/${eventDetails?.title
      ?.replace(/\s+/g, '-')
      .toLowerCase()}`;
    navigator.clipboard.writeText(invitationLink);
    // You might want to show a toast notification here
  }

  function handleShareInvitation() {
    // Implement share functionality
    if (navigator.share) {
      navigator.share({
        title: eventDetails?.title || t('sample_event_title'),
        text: `${t('sample_event_invitation')} - ${eventDetails?.title}`,
        url: `https://example.com/invitation/${eventDetails?.title
          ?.replace(/\s+/g, '-')
          .toLowerCase()}`,
      });
    } else {
      // Fallback to copying to clipboard
      handleCopyInvitationLink();
    }
  }

  return (
    <div className={styles.formContainer}>
      <StepTitle
        title={t('review_and_launch')}
        description={t('review_and_launch_description')}
      />

      {/* Stats Row */}
      <div className={styles.statsContainer}>
        {statsData.map((stat) => (
          <DetailCard
            key={stat.id}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            sublabel={stat.sublabel}
          />
        ))}
      </div>

      {/* Event Details Card */}
      <Card className={styles.eventDetailsCard}>
        <div className={styles.eventDetailsContent}>
          <div className={styles.eventTitle}>
            {eventDetails?.title || t('sample_event_title')}
          </div>
          <div className={styles.eventDescription}>
            {eventDetails?.description || t('sample_event_description')}
            <br />
            {t('sample_event_invitation')}
          </div>
          <div className={styles.eventInfoContainer}>
            {eventInfoData.map((info) => (
              <span key={info.id} className={styles.eventInfoItem}>
                <img
                  src={info.icon}
                  alt={info.id}
                  className={styles.eventInfoIcon}
                />
                {info.text}
              </span>
            ))}
            {eventDetails?.location?.address && (
              <span className={styles.eventInfoItem}>
                <a
                  href={`https://maps.google.com/?q=${eventDetails.location.latitude},${eventDetails.location.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mapLink}
                >
                  {t('view_on_map')}
                </a>
              </span>
            )}
          </div>
        </div>
      </Card>

      {/* Ready to Launch Section */}
      <div className={styles.launchSection}>
        <div className={styles.launchTitle}>{t('ready_to_launch')}</div>
        <div className={styles.launchDescription}>
          {t('ready_to_launch_description')}
        </div>
        <div className={styles.launchActions}>
          <InputSelect
            label={t('schedule_sending')}
            placeholder={t('schedule_sending_placeholder')}
            name="launchSettings.sendSchedule"
            options={scheduleOptions}
          />
          {actionButtons.map((button) => (
            <Button
              key={button.id}
              variant={button.variant}
              title={button.title}
              icon={button.icon}
              onClick={button.onClick}
            />
          ))}
        </div>
        <Button
          variant="primary"
          title={t('confirm_and_launch')}
          className={styles.launchButton}
          type="submit"
        />
      </div>
    </div>
  );
}

export default Step5;
