import { z } from 'zod';

// Helper schemas
const phoneSchema = z
  .string()
  .optional()
  .refine((val) => !val || val.length >= 10, {
    message: 'Phone number must be at least 10 digits',
  });

const requiredPhoneSchema = z
  .string()
  .min(1, 'Phone number is required')
  .min(10, 'Phone number must be at least 10 digits');

const emailSchema = z
  .string()
  .optional()
  .refine((val) => !val || z.string().email().safeParse(val).success, {
    message: 'Please enter a valid email address',
  });

const requiredStringSchema = z.string().min(1, 'This field is required');

// Guest schema - name required, either email or phone required
const guestSchema = z
  .object({
    id: z.number().optional(),
    name: requiredStringSchema,
    phone: phoneSchema,
    email: emailSchema,
  })
  .refine(
    (data) =>
      (data.phone && data.phone.trim()) || (data.email && data.email.trim()),
    {
      message: 'Either phone number or email address is required',
      path: ['contact'], // This will be the error path
    }
  );

// Supervisor schema - name and phone required
const supervisorSchema = z.object({
  id: z.number().optional(),
  name: requiredStringSchema,
  phone: requiredPhoneSchema,
});

// Location schema
const locationSchema = z.object({
  address: requiredStringSchema,
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  city: z.string().optional(),
  country: z.string().optional(),
});

// Template schema
const templateSchema = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string(),
  colors: z
    .object({
      primary: z.string(),
      secondary: z.string(),
      accent: z.string(),
    })
    .optional(),
});

// Main create event schema
export const createEventSchema = (t) =>
  z.object({
    // Step 1: Event Details
    eventDetails: z.object({
      title: requiredStringSchema,
      type: z.enum([
        'wedding',
        'birthday',
        'graduation',
        'meeting',
        'conference',
        'other',
      ]),
      date: z.date({
        required_error: t ? t('date_required') : 'Date is required',
      }),
      time: z.string().min(1, t ? t('time_required') : 'Time is required'),
      location: locationSchema,
      description: z.string().optional(),
    }),

    // Step 2: Guest List
    guestList: z
      .array(guestSchema)
      .min(1, t ? t('guest_list_required') : 'At least one guest is required'),

    // Step 3: Supervisors List
    supervisorsList: z.array(supervisorSchema).optional(),

    // Step 4: Invitation Settings
    invitationSettings: z.object({
      selectedTemplate: templateSchema.optional(),
      invitationMessage: z.string().optional(),
      attendanceAutoReply: z.string().optional(),
      absenceAutoReply: z.string().optional(),
      expectedAttendanceAutoReply: z.string().optional(),
      templateImage: z.instanceof(File).optional(),
      note: z.string().optional(),
    }),

    // Step 5: Launch Settings
    launchSettings: z.object({
      sendSchedule: z.enum(['now', 'later']).default('now'),
      scheduledDate: z.date().optional(),
      scheduledTime: z.string().optional(),
    }),
  });

// Step validation schemas
export const stepValidationSchemas = (t) => ({
  1: z.object({
    eventDetails: createEventSchema(t).shape.eventDetails,
  }),
  2: z.object({
    guestList: createEventSchema(t).shape.guestList,
  }),
  3: z.object({
    supervisorsList: createEventSchema(t).shape.supervisorsList,
  }),
  4: z.object({
    invitationSettings: createEventSchema(t).shape.invitationSettings,
  }),
  5: z.object({
    launchSettings: createEventSchema(t).shape.launchSettings,
  }),
});

// Helper function to validate individual steps
export const validateStep = (stepNumber, data, t) => {
  const schemas = stepValidationSchemas(t);
  const schema = schemas[stepNumber];

  if (!schema) {
    return { success: false, error: 'Invalid step number' };
  }

  try {
    schema.parse(data);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.errors };
  }
};

// Helper function to check if step has required data
export const hasRequiredStepData = (stepNumber, data) => {
  switch (stepNumber) {
    case 1:
      return (
        data.eventDetails?.title &&
        data.eventDetails?.type &&
        data.eventDetails?.date &&
        data.eventDetails?.time &&
        data.eventDetails?.location?.address
      );
    case 2:
      return data.guestList && data.guestList.length > 0;
    case 3:
      return true; // Supervisors are optional
    case 4:
      return true; // Invitation settings are optional
    case 5:
      return data.launchSettings?.sendSchedule;
    default:
      return false;
  }
};

// Template form schema for invitation template customization
export const templateFormSchema = (t) =>
  z.object({
    messageText: z.string().optional(),
    brideName: z
      .string()
      .min(1, t ? t('bride_name_required') : 'Bride name is required'),
    groomName: z
      .string()
      .min(1, t ? t('groom_name_required') : 'Groom name is required'),
    guestMessage: z.string().optional(),
    entryDate: z.date({
      required_error: t ? t('entry_date_required') : 'Event date is required',
    }),
    entryTime: z
      .string()
      .min(1, t ? t('entry_time_required') : 'Event time is required')
      .regex(
        /^(0[1-9]|1[0-2]):[0-5][0-9]:(AM|PM)$/,
        t ? t('invalid_time_format') : 'Invalid time format (HH:MM:AM/PM)'
      ),
    address: z
      .string()
      .min(1, t ? t('address_required') : 'Address is required'),
    endMessage: z.string().optional(),
    fontType: z
      .enum(['inter', 'cairo', 'lato'], {
        required_error: t ? t('font_type_required') : 'Font type is required',
      })
      .default('cairo'),
    primaryColor: z
      .string()
      .min(1, t ? t('primary_color_required') : 'Primary color is required')
      .regex(
        /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
        t
          ? t('invalid_color_format')
          : 'Invalid color format (hex color required)'
      )
      .default('#5a4a42'),
  });

export default createEventSchema;
