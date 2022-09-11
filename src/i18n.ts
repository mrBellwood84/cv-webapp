import i18n from "i18next"
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { ILangOption } from "./Core/Data/ILangOption";


export const supportedLanguages: ILangOption[] = [
    {
        name: "Norsk",
        code: "no"
    },
    {
        name: "English",
        code: "en"
    },
]

i18n.use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "no",
        supportedLngs: supportedLanguages.map(x => x.code),
        debug: true,
        interpolation: {
            escapeValue: false,
        }
    })

export default i18n;