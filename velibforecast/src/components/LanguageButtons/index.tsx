import { FC } from "react";
import { useIntl } from "react-intl";
import { supportedLocales } from "../../locales";
import styles from "./LanguageButton.module.css";
import LanguageBtn from "./LanguageButtons";

const LanguageButtons: FC = () => {
  const intl = useIntl();

  return (
    <div className={styles.divLanguage}>
      <LanguageBtn
        countryCode="gb"
        languageBtn={supportedLocales.English}
        currentLanguage={intl.locale}
      />
      <LanguageBtn
        countryCode="fr"
        languageBtn={supportedLocales.French}
        currentLanguage={intl.locale}
      />
    </div>
  );
};

export default LanguageButtons;
