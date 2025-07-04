import initTranslations from "@/localization/i18n";
import ClientComponentsTranslationsProvider from "./ClientCompTrans";

const i18nNamespaces = [
  "common",
  "login",
  "forgetPassword",
  "changePassword",
  "signup",
  "continueSignup",
  "createEvent",
  "home-events",
];

export default async function GlobalProvider({ children, lang }) {
  const { t, resources } = await initTranslations(lang, i18nNamespaces);

  /* if (!session?.user?.email) {
    redirect("/auth/login");
  } */

  return (
    <ClientComponentsTranslationsProvider
      namespaces={i18nNamespaces}
      locale={lang}
      resources={resources}
    >
      {children}
    </ClientComponentsTranslationsProvider>
  );
}
