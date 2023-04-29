import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
 
  .use(Backend)

  .use(LanguageDetector)
 
  .use(initReactI18next)

  .init({
    fallbackLng: {
      'en-US':['en'],
      'ru-RU':['ru'],
      'az-AZ':['cn'],
      default:['ru'],
    },
    debug: true,
    

    interpolation: {
      escapeValue: false, 
      formatSeparator: ',',
    },
    
    backend: {
      loadPath: 'locales/{{lng}}/translation.json',
    },

    
  });

export default i18n;
