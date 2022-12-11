import React from "react";
import { FC, useState } from "react";
import { IntlProvider as ReactIntlProvider } from "react-intl";
import { defaultLanguage, localMessages, supportedLocales } from "../locales";

export const SwitchLanguageContext = React.createContext<
  (language: string) => void
>(() => {});

const languageToUse = (language: string): string => {
  return !Object.values(supportedLocales).includes(language)
    ? defaultLanguage
    : language;
};

const IntlProvider: FC<{ children: JSX.Element }> = ({ children }) => {
  const [locale, setLocale] = useState(() => {
    return languageToUse(navigator.language.split(/[-_]/)[0]);
  });

  const switchLanguage = (language: string): void => {
    setLocale(languageToUse(language));
  };

  return (
    <ReactIntlProvider locale={locale} messages={localMessages.get(locale)}>
      <SwitchLanguageContext.Provider value={switchLanguage}>
        {children}
      </SwitchLanguageContext.Provider>
    </ReactIntlProvider>
  );
};

export default IntlProvider;
