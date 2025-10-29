import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'react-native-localize';
import { LanguageDetectorAsyncModule } from 'i18next';

import fr from './locales/fr';
import en from './locales/en';

// Définition des ressources de traduction
const resources = {
  en,
  fr,
};


// Détecteur de langue typé avec LanguageDetectorAsyncModule
const languageDetector: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,
  detect: (callback: (lang: string) => void) => {
    const locales = Localization.getLocales();
    const languageCode = locales.length > 0 ? locales[0].languageCode : 'en';
    callback(languageCode);
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

// Initialisation de i18n
i18n
  .use(languageDetector) // Détecteur de langue
  .use(initReactI18next) // Intégration avec React
  .init({
    fallbackLng: 'en', // Langue par défaut en cas d'échec
    resources, // Ressources de traduction
    interpolation: {
      escapeValue: false, // Désactive l'échappement pour React
    },
    load: 'languageOnly',
  });

export default i18n;
