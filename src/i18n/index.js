import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Platform, NativeModules } from 'react-native';

const resources = {
  en: {
    translation: require('./langs/en.json'),
  },
  zh: {
    translation: require('./langs/zh.json'),
  },
};

export const langs = [
  {
    label: 'English',
    value: 'en',
  },
  {
    label: '中文(繁體)',
    value: 'zh',
  },
];

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: (cb) => {
    const data =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLanguages[0]
        : NativeModules.I18nManager.localeIdentifier;
    const [locale] = data.split('_');
    cb(locale);
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18next
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources,
    interpolation: {
      escapeValue: false,
    },
  });
