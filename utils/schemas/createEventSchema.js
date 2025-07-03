import { z } from 'zod';

export const createEventSchema = (t) =>
  z.object({
    // step 1
    eventDetails: z.object({
      title: z
        .string({ required_error: t('title_required') })
        .min(1, t('title_required')),
      type: z
        .string({ required_error: t('type_required') })
        .min(1, t('type_required')),
      date: z.date(),
      time: z
        .string({ required_error: t('time_required') })
        .min(1, t('time_required')),
      location: z
        .object({
          lat: z.number(),
          lng: z.number(),
        })
        .refine((data) => data.lat !== 0 && data.lng !== 0, {
          message: t('location_required'),
        }),
    }),
    guestList: z
      .array(
        z.object({
          name: z.string().min(1, t('guest_name_required')),
          email: z
            .string()
            // .email(t('guest_email_invalid'))
            .min(1, t('guest_email_required')),
          phone: z.string().min(1, t('guest_phone_required')),
          invitedBy: z.string().min(1, t('guest_invited_by_required')),
        })
      )
      .optional()
      .default([]),
    supervisorsList: z
      .array(
        z.object({
          name: z.string().min(1, t('supervisor_name_required')),
          email: z
            .string()
            // .email(t('supervisor_email_invalid'))
            .min(1, t('supervisor_email_required')),
          phone: z.string().min(1, t('supervisor_phone_required')),
          role: z.string().min(1, t('supervisor_role_required')),
        })
      )
      .optional()
      .default([]),
  });
