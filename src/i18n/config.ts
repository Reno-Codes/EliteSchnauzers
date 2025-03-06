import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslations from "./locales/en.json";
import hrTranslations from "./locales/hr.json";

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: enTranslations,
        },
        hr: {
            translation: hrTranslations,
        },
    },
    lng: "hr",
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
