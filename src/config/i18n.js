import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
i18n
  .use(initReactI18next)
  .use(LanguageDetector)

  .init({
    debug: true,
    fallbackLng: "en",
    lng: "en", // Set the default language
    interpolation: {
      escapeValue: false, // React already handles escaping
    },
    resources: {
      en: {
        translation: {
          welcome: "Welcome to React",
        },
      },
      bn: {
        translation: {
          welcome: "রিয়্যাক্টে আপনাকে স্বাগতম",
        },
      },
    },
  });

export default i18n;
