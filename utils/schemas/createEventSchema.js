import { z } from "zod";

// Helper schemas
const phoneSchema = z
  .string()
  .min(10, "Phone number must be at least 10 digits");
const requiredStringSchema = z.string().min(1, "This field is required");

// Guest schema - only name and phone
const guestSchema = z.object({
  id: z.number().optional(),
  name: requiredStringSchema,
  phone: phoneSchema,
});

// Supervisor schema - only name and phone
const supervisorSchema = z.object({
  id: z.number().optional(),
  name: requiredStringSchema,
  phone: phoneSchema,
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
        "wedding",
        "birthday",
        "graduation",
        "meeting",
        "conference",
        "other",
      ]),
      date: z.date({
        required_error: t ? t("date_required") : "Date is required",
      }),
      time: z.string().min(1, t ? t("time_required") : "Time is required"),
      location: locationSchema,
      description: z.string().optional(),
    }),

    // Step 2: Guest List
    guestList: z
      .array(guestSchema)
      .min(1, t ? t("guest_list_required") : "At least one guest is required"),

    // Step 3: Supervisors List
    supervisorsList: z.array(supervisorSchema).optional(),

    // Step 4: Invitation Settings
    invitationSettings: z.object({
      selectedTemplate: templateSchema.optional(),
      invitationMessage: z.string().optional(),
      attendanceAutoReply: z.string().optional(),
      absenceAutoReply: z.string().optional(),
      expectedAttendanceAutoReply: z.string().optional(),
      note: z.string().optional(),
    }),

    // Step 5: Launch Settings
    launchSettings: z.object({
      sendSchedule: z.enum(["now", "later"]).default("now"),
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
    return { success: false, error: "Invalid step number" };
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

export default createEventSchema;
