"use client";
import React, { useEffect, useState } from "react";
import styles from "@/ui/auth/login/form/form.module.css";
import { useTranslation } from "react-i18next";
import FormHeader from "../../../commen/formHeader/FormHeader";
import ConfirmBtn from "@/ui/commen/confirmButton/ConfirmBtn";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { hostSignupSchema } from "@/utils/schemas/hostSchema";
import Link from "next/link";
import useLanguageChange from "@/hooks/UseLanguageChange";
import { useRouter } from "next/navigation";
import { authAPI, cookieUtils } from "@/lib/auth";
import MobileInputGroup from "@/ui/commen/inputs/mobileInputGroup/MobileInputGroup";
import { toastUtils } from "@/utils/toastUtils";

const Form = () => {
  const { t } = useTranslation("signup");
  const { currentLocale } = useLanguageChange();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const methods = useForm({
    resolver: zodResolver(hostSignupSchema(t)),
    mode: "onChange",
    defaultValues: {
      phoneNumber: "",
    },
  });

  const { handleSubmit, watch } = methods;
  const formValues = watch();
  useEffect(() => {
    console.log(formValues);
  }, [formValues]);
  const onSubmit = async (formData) => {
    setIsLoading(true);
    setError("");

    try {
      console.log("Submitting host signup:", formData.phoneNumber);
      const response = await authAPI.signupHost(formData.phoneNumber);

      if (response.status === "success") {
        const { token, user } = response;
        // Save token to cookie
        token && cookieUtils.setCookie("token", token, 7);
        user && cookieUtils.setCookie("user", JSON.stringify(user), 7);

        console.log("Host signup successful:", response);
        toastUtils.success(
          "Account created successfully! Please complete your profile."
        );

        // Redirect to continue signup page
        router.push(`/${currentLocale}/signup/continue-signup`);
      }
    } catch (err) {
      console.error("Host signup error:", err);
      const errorMessage =
        err.message || "Failed to create account. Please try again.";
      setError(errorMessage);
      toastUtils.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form_header}>
        <FormHeader />
      </div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.form}>
            <MobileInputGroup
              label={t("signupForm.hostSignup.phoneNumber")}
              type="text"
              name="phoneNumber"
            />

            {error && <div className={styles.error_message}>{error}</div>}

            <ConfirmBtn
              text={t("signupForm.hostSignup.buttons.createAccount")}
              active={formValues.phoneNumber.length > 6 && !isLoading}
              clickHandler={handleSubmit(onSubmit)}
              disabled={isLoading}
            />

            <button type="button" className={styles.sign_up_button}>
              {t("signupForm.hostSignup.formBottom.haveAccount")}{" "}
              <Link
                href={`/${currentLocale}/login`}
                className={styles.make_acc}
              >
                {t("signupForm.hostSignup.formBottom.login")}
              </Link>
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default Form;
