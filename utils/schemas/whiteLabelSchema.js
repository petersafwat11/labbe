import { z } from 'zod';

// The schema is now a function that takes a translation function `t` for error messages
export const whiteLabelSchema = (t) =>
  z.object({
    identity: z.object({
      arabic_name: z
        .string({
          required_error: t(
            'signupForm.whiteLabel.identity.errors.arabicNameRequired'
          ),
          invalid_type_error: t(
            'signupForm.whiteLabel.identity.errors.arabicNameFormat'
          ),
        })
        .min(2, t('signupForm.whiteLabel.identity.errors.arabicNameMinLength'))
        .max(
          50,
          t('signupForm.whiteLabel.identity.errors.arabicNameMaxLength')
        ),
      english_name: z
        .string({
          required_error: t(
            'signupForm.whiteLabel.identity.errors.englishNameRequired'
          ),
          invalid_type_error: t(
            'signupForm.whiteLabel.identity.errors.englishNameFormat'
          ),
        })
        .min(2, t('signupForm.whiteLabel.identity.errors.englishNameMinLength'))
        .max(
          50,
          t('signupForm.whiteLabel.identity.errors.englishNameMaxLength')
        ),
      logo: z
        .any()
        .refine(
          (file) => file && typeof file === 'object' && file.name,
          t('signupForm.whiteLabel.identity.errors.logoRequired')
        ),
      primaryColor: z.string({
        required_error: t(
          'signupForm.whiteLabel.identity.errors.primaryColorRequired'
        ),
        invalid_type_error: t(
          'signupForm.whiteLabel.identity.errors.invalidColorFormat'
        ),
      }),
      secondaryColor: z.string({
        required_error: t(
          'signupForm.whiteLabel.identity.errors.secondaryColorRequired'
        ),
        invalid_type_error: t(
          'signupForm.whiteLabel.identity.errors.invalidColorFormat'
        ),
      }),
      fontFamily: z
        .string({
          invalid_type_error: t(
            'signupForm.whiteLabel.identity.errors.invalidFontFamily'
          ),
        })
        .optional(),
    }),

    loginData: z.object({
      email: z
        .string({
          required_error: t(
            'signupForm.whiteLabel.login.fields.email.required'
          ),
          invalid_type_error: t(
            'signupForm.whiteLabel.login.fields.email.invalid'
          ),
        })
        .email(t('signupForm.whiteLabel.login.fields.email.invalid')),
      domain: z.string({
        required_error: t('signupForm.whiteLabel.login.fields.domain.required'),
        invalid_type_error: t(
          'signupForm.whiteLabel.login.fields.domain.invalid'
        ),
      }),
    }),
    systemRequirements: z.object({
      numberOfEvents: z
        .string()
        .min(
          1,
          t('signupForm.whiteLabel.requirements.errors.numberOfEventsRequired')
        )
        .refine(
          (val) => /^\d+$/.test(val),
          t('signupForm.whiteLabel.requirements.errors.numberOfEventsInvalid')
        ),
      numberOfGuestsPerEvent: z
        .string()
        .min(
          1,
          t('signupForm.whiteLabel.requirements.errors.numberOfGuestsRequired')
        )
        .refine(
          (val) => /^\d+$/.test(val),
          t('signupForm.whiteLabel.requirements.errors.numberOfGuestsInvalid')
        ),
      eventsTypes: z
        .array(z.any())
        .min(
          1,
          t('signupForm.whiteLabel.requirements.errors.eventsTypesRequired')
        ),
      services: z
        .array(z.any())
        .min(
          1,
          t('signupForm.whiteLabel.requirements.errors.servicesRequired')
        ),
    }),
    additionalServices: z.array(z.any()),
    paymentData: z.object({
      companyName: z
        .string()
        .min(1, t('signupForm.whiteLabel.payment.errors.companyNameRequired')),
      licenseNumber: z
        .string()
        .min(
          1,
          t('signupForm.whiteLabel.payment.errors.licenseNumberRequired')
        ),
      TaxNumber: z.string().optional(),
      city: z
        .string()
        .min(1, t('signupForm.whiteLabel.payment.errors.cityRequired')),
      neighborhood: z
        .string()
        .min(1, t('signupForm.whiteLabel.payment.errors.neighborhoodRequired')),
      street: z
        .string()
        .min(1, t('signupForm.whiteLabel.payment.errors.streetRequired')),
      buildingNumber: z
        .string()
        .min(
          1,
          t('signupForm.whiteLabel.payment.errors.buildingNumberRequired')
        ),
      additionalNumber: z
        .string()
        .min(
          1,
          t('signupForm.whiteLabel.payment.errors.additionalNumberRequired')
        ),
      placeType: z.string().optional(),
      placeNumber: z.string().optional(),
      paymentMethod: z
        .array(z.any())
        .min(
          1,
          t('signupForm.whiteLabel.payment.errors.paymentMethodRequired')
        ),
    }),
  });
