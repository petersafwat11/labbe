import { z } from "zod";

export const accountSettingsSchema = (t) =>
  z
    .object({
      name: z
        .string()
        .min(2, t ? t("name_min_length") : "Name must be at least 2 characters")
        .max(
          50,
          t ? t("name_max_length") : "Name must be less than 50 characters"
        ),

      email: z
        .string()
        .email(t ? t("email_invalid") : "Please enter a valid email address"),

      password: z
        .string()
        .min(
          8,
          t
            ? t("password_min_length")
            : "Password must be at least 8 characters"
        )
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
          t
            ? t("password_requirements")
            : "Password must contain at least one uppercase letter, one lowercase letter, and one number"
        )
        .optional()
        .or(z.literal("")), // Allow empty string for password (user may not want to change it)

      confirmPassword: z.string().optional().or(z.literal("")),
    })
    .refine(
      (data) => {
        // If password is provided, confirmPassword must match
        if (data.password && data.password !== "") {
          return data.password === data.confirmPassword;
        }
        return true;
      },
      {
        message: t ? t("password_mismatch") : "Passwords do not match",
        path: ["confirmPassword"],
      }
    );

export default accountSettingsSchema;
