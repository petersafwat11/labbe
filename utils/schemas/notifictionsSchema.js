import { z } from "zod";

export const notificationsSchema = (t) =>
  z.object({
    // App Notifications
    appNotifications: z.object({
      eventUpdates: z.boolean().default(true),
      eventDates: z.boolean().default(true),
      packageRenewal: z.boolean().default(true),
      systemInteractions: z.boolean().default(true),
    }),

    // Email Notifications
    emailNotifications: z.object({
      eventUpdates: z.boolean().default(false),
      eventDates: z.boolean().default(false),
      packageRenewal: z.boolean().default(false),
      beforeSendingInvitations: z.boolean().default(false),
      afterSendingInvitations: z.boolean().default(false),
    }),
  });

export default notificationsSchema;
