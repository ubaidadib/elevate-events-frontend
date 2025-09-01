import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "de"],
    fallbackLng: "en",
ns: ["common", "header", "footer", "booking", "hero", "contact", "events", "gallery", "membership"],
    defaultNS: "common",
    detection: {
      order: ["querystring","localStorage","cookie","navigator","htmlTag"],
      caches: ["localStorage","cookie"]
    },
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json"
    },
    interpolation: { escapeValue: false }
  });

export default i18n;
