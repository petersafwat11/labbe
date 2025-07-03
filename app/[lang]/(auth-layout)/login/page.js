import React from "react";
import Form from "@/ui/auth/login/form/Form";
import initTranslations from "@/localization/i18n";
async function Page(params) {
  const { lang } = await params;

  const { t } = await initTranslations(lang, "login");

  return <Form />;
}

export default Page;
