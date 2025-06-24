import { z } from "zod";

export const vendorSchema = (t) =>
  z.object({
    identity: z
      .object({
        brandName: z
          .string({
            required_error: t(
              "signupForm.vendor.identity.errors.brandNameRequired"
            ),
          })
          .min(2, t("signupForm.vendor.identity.errors.brandNameMinLength"))
          .max(50, t("signupForm.vendor.identity.errors.brandNameMaxLength")),
        ownerFullName: z
          .string({
            required_error: t(
              "signupForm.vendor.identity.errors.ownerFullNameRequired"
            ),
          })
          .min(2, t("signupForm.vendor.identity.errors.ownerFullNameMinLength"))
          .max(
            100,
            t("signupForm.vendor.identity.errors.ownerFullNameMaxLength")
          ),
        serviceType: z
          .array(z.string(), {
            required_error: t(
              "signupForm.vendor.identity.errors.serviceTypeRequired"
            ),
          })
          .min(1, t("signupForm.vendor.identity.errors.serviceTypeRequired")),
        phoneNumber: z
          .string({
            required_error: t(
              "signupForm.vendor.identity.errors.phoneNumberRequired"
            ),
          })
          .min(10, t("signupForm.vendor.identity.errors.phoneNumberInvalid")),
        email: z
          .string({
            required_error: t(
              "signupForm.vendor.identity.errors.emailRequired"
            ),
          })
          .email(t("signupForm.vendor.identity.errors.emailInvalid")),
        password: z
          .string()
          .min(8, t("signupForm.vendor.identity.errors.passwordRequired")),
        passwordConfirm: z
          .string()
          .min(
            1,
            t("signupForm.vendor.identity.errors.passwordConfirmRequired")
          ),
      })
      .refine((data) => data.password === data.passwordConfirm, {
        message: t("signupForm.vendor.identity.errors.passwordsDoNotMatch"),
        path: ["passwordConfirm"],
      }),

    serviceData: z.object({
      serviceDescription: z
        .string({
          required_error: t(
            "signupForm.vendor.serviceData.errors.serviceDescriptionRequired"
          ),
        })
        .min(
          10,
          t("signupForm.vendor.serviceData.errors.serviceDescriptionMinLength")
        )
        .max(
          500,
          t("signupForm.vendor.serviceData.errors.serviceDescriptionMaxLength")
        ),
      eventPlanning: z.array(z.string()).optional(),
      mediaProduction: z.array(z.string()).optional(),
      giftsAndGiveaways: z.array(z.string()).optional(),
      foodAndBeverages: z.array(z.string()).optional(),
      beautyAndFashion: z.array(z.string()).optional(),
      logisticsAndDelivery: z.array(z.string()).optional(),
      corporateServices: z.array(z.string()).optional(),
      city: z
        .string({
          required_error: t(
            "signupForm.vendor.serviceData.errors.cityRequired"
          ),
        })
        .min(2, t("signupForm.vendor.serviceData.errors.cityMinLength")),
      coverageArea: z.string({
        required_error: t(
          "signupForm.vendor.serviceData.errors.coverageAreaRequired"
        ),
      }),
      otherData: z.string().optional(),
    }),

    samplesAndPackages: z.object({
      portfolioImages: z
        .array(z.any())
        .min(
          1,
          t(
            "signupForm.vendor.samplesAndPackages.errors.portfolioImagesRequired"
          )
        ),
      businessLogo: z.any().optional(),
      pricePackages: z
        .array(z.any())
        .min(
          1,
          t("signupForm.vendor.samplesAndPackages.errors.pricePackagesRequired")
        ),
    }),

    commercialVerification: z.object({
      // company: z.object({
      //   name: z
      //     .string()
      //     .min(
      //       1,
      //       t('signupForm.vendor.paymentData.errors.companyNameRequired')
      //     ),
      //   license: z
      //     .string()
      //     .min(
      //       1,
      //       t('signupForm.vendor.paymentData.errors.licenseNumberRequired')
      //     ),
      //   tax: z.string().optional(),
      // }),
      // address: z.object({
      //   city: z
      //     .string()
      //     .min(1, t('signupForm.vendor.paymentData.errors.cityRequired')),
      //   neighborhood: z
      //     .string()
      //     .min(
      //       1,
      //       t('signupForm.vendor.paymentData.errors.neighborhoodRequired')
      //     ),
      //   street: z
      //     .string()
      //     .min(1, t('signupForm.vendor.paymentData.errors.streetRequired')),
      //   buildingNumber: z
      //     .string()
      //     .min(
      //       1,
      //       t('signupForm.vendor.paymentData.errors.buildingNumberRequired')
      //     ),
      //   additionalNumber: z
      //     .string()
      //     .min(
      //       1,
      //       t('signupForm.vendor.paymentData.errors.additionalNumberRequired')
      //     ),
      //   postalCode: z
      //     .string()
      //     .min(1, t('signupForm.vendor.paymentData.errors.postalCodeRequired')),
      //   unitType: z.string().optional(),
      //   unitNumber: z.string().optional(),
      // }),
      // paymentMethods: z
      //   .array(z.string())
      //   .min(
      //     1,
      //     t('signupForm.vendor.paymentData.errors.paymentMethodRequired')
      //   ),
      commercialRecord: z.any().optional(),
      nationalId: z.string({
        required_error: t(
          "signupForm.vendor.commercialVerification.errors.nationalIdRequired"
        ),
      }),
    }),

    paymentData: z.object({
      // payment_type: z.string(),
      termsForRefund: z.string().optional(),
      paymentOptions: z.array(z.string()),
    }),

    otherLinksAndData: z.object({
      instagramLink: z.string().optional(),
      linkedinLink: z.string().optional(),
      websiteLink: z.string().optional(),
      additionalServices: z.string().optional(),
      cv: z.any().optional(),
      profileFile: z.any().optional(),
    }),
  });
