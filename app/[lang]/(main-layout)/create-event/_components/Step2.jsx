'use client';
import { StepTitle } from '@/ui/commen/title/SectionTitle';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import CardLayout from '@/ui/commen/card/CardLayout';
import styles from '../createEvent.module.css';
import InputGroup from '@/ui/commen/inputs/inputGroup/InputGroup';
import { useFormContext } from 'react-hook-form';
import Button from '@/ui/commen/button/Button';
import PhoneSection from '@/ui/commen/inputs/PhoneForm';
import MobileInputGroup from '@/ui/commen/inputs/mobileInputGroup/MobileInputGroup';
import GuestTable from '../../events/[id]/_components/GuestTable';

function Step2() {
  const { t } = useTranslation('createEvent');
  const { setValue, watch } = useFormContext();
  const [currentGuest, setCurrentGuest] = useState({
    name: '',
    email: '',
    phone: '',
    invitedBy: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    invitedBy: '',
  });

  function resetCurrentGuest() {
    setCurrentGuest({ name: '', email: '', phone: '', invitedBy: '' });
    setErrors({ name: '', email: '', phone: '', invitedBy: '' });
  }
  // Watch the guestList to get current values
  const guestList = watch('guestList') || [];

  const handleInputChange = (field, value) => {
    setCurrentGuest((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const validateGuest = () => {
    const newErrors = { name: '', email: '' };

    // Validate name
    if (!currentGuest.name.trim()) {
      newErrors.name = t('guest_name_required');
    }

    // Validate phone
    if (!currentGuest.phone.trim()) {
      newErrors.phone = t('guest_phone_required');
    }

    // Validate invitedBy
    // if (!currentGuest.invitedBy.trim()) {
    //   newErrors.invitedBy = t('guest_invited_by_required');
    // }

    // Validate email
    if (!currentGuest.email.trim()) {
      newErrors.email = t('guest_email_required');
    } else {
      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(currentGuest.email)) {
        newErrors.email = t('guest_email_invalid');
      }
    }

    setErrors(newErrors);
    return !newErrors.name && !newErrors.email;
  };

  const handleAddGuest = () => {
    // Validate the current guest
    if (!validateGuest()) {
      return; // Don't add if validation fails
    }

    // Add the current guest to the list
    const updatedGuestList = [
      ...guestList,
      { ...currentGuest, id: guestList.length },
    ];

    // Update the form with the new guest list
    setValue('guestList', updatedGuestList);
    resetCurrentGuest();
  };

  const handleEditGuest = (id) => {
    console.log('id', id);
    if (!validateGuest()) {
      return; // Don't add if validation fails
    }
    const updatedGuest = {
      ...currentGuest,
      id: id,
    };

    const updatedGuestList = guestList.map((guest) =>
      guest.id === id ? updatedGuest : guest
    );
    console.log('updatedGuestList', updatedGuestList);
    setValue('guestList', updatedGuestList);
  };

  const handleRemoveGuest = (index) => {
    const updatedGuestList = guestList.filter((_, i) => i !== index);
    console.log('updatedGuestList', updatedGuestList);
    setValue('guestList', updatedGuestList);
    if (currentGuest.id === id) {
      resetCurrentGuest();
    }
  };

  function focusGuest(id) {
    const guest = guestList.find((guest) => guest.id === id);
    setCurrentGuest(guest);
  }
  //   console.log('errors', errors);
  //   console.log('currentGuest ....', currentGuest);
  return (
    <div>
      <StepTitle
        title={t('prepare_invitation')}
        description={t('prepare_invitation_description')}
      />
      <CardLayout
        style={{ marginTop: '2.4rem', padding: '1.6rem', display: 'block' }}
      >
        <div className={styles.add_manually}>{t('add_manually')}</div>

        {/* {guestList.length > 0 && (
          <div className={styles.existingGuests}>
            <h4>{t('added_guests')}</h4>
            {guestList.map((guest, index) => (
              <div key={index} className={styles.guestItem}>
                <span>
                  {guest.name} - {guest.email}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveGuest(index)}
                  className={styles.removeGuest}
                >
                  {t('remove')}
                </button>
              </div>
            ))}
          </div>
        )} */}

        {/* Add new guest form */}
        <div className={styles.formFields}>
          <div className={styles.row}>
            <div className={styles.col}>
              <InputGroup
                label={t('guest_name')}
                placeholder={t('guest_name_placeholder')}
                required
                value={currentGuest.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                error={errors.name}
              />
            </div>

            <div className={styles.col}>
              <MobileInputGroup
                label={t('guest_phone')}
                placeholder={t('guest_phone_placeholder')}
                type="tel"
                name=" phone"
                value={currentGuest.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                error={errors.phone}
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col}>
              <InputGroup
                label={t('guest_email')}
                placeholder={t('guest_email_placeholder')}
                type="email"
                required
                value={currentGuest.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                error={errors.email}
              />
            </div>
            <div className={styles.col}>
              <InputGroup
                name="invitedBy"
                label={t('invited_by')}
                placeholder={t('invited_by_placeholder')}
                type="text"
                required
                value={currentGuest.invitedBy}
                onChange={(e) => handleInputChange('invitedBy', e.target.value)}
                error={errors.invitedBy}
              />
            </div>
          </div>

          <div className={styles.addGuestButton}>
            <Button
              variant="secondary"
              title={
                currentGuest.id || currentGuest.id === 0
                  ? t('edit_guest')
                  : t('add_guest')
              }
              type="button"
              onClick={
                currentGuest.id || currentGuest.id === 0
                  ? () => handleEditGuest(currentGuest.id)
                  : handleAddGuest
              }
            />
          </div>
        </div>
      </CardLayout>

      <GuestTable
        data={guestList.map((guest) => ({
          id: guest.id,
          name: guest.name,
          phone: guest.phone,
          email: guest.email,
          invitedBy: guest.invitedBy,
        }))}
        onDelete={handleRemoveGuest}
        focusGuest={focusGuest}
      />
    </div>
  );
}

export default Step2;
