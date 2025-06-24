"use client";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import ForgetPassword from "@/ui/forget-password/ForgetPassword";
import { forgetPasswordSchema } from "@/utils/schemas/authSchemas";

const ForgetPasswordPage = () => {
  const { t } = useTranslation("forgetPassword");

  const methods = useForm({
    resolver: zodResolver(forgetPasswordSchema(t)),
    defaultValues: {
      email: "",
    },
  });

  return (
    <FormProvider {...methods}>
      <ForgetPassword />
    </FormProvider>
  );
};

export default ForgetPasswordPage;
