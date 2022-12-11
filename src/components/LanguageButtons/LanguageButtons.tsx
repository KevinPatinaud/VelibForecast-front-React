import { FC, useContext } from "react";
import styles from "./LanguageButton.module.css";
import { CircleFlag } from "react-circle-flags";
import { SwitchLanguageContext } from "../../provider/IntlProvider";

export interface Props {
  countryCode: string;
  languageBtn: string;
  currentLanguage: string;
}

const LanguageBtn: FC<Props> = (props) => {
  const switchLanguage = useContext(SwitchLanguageContext);
  return (
    <CircleFlag
      data-testid={"LanguageButton_" + props.countryCode}
      countryCode={props.countryCode}
      height={props.currentLanguage === props.languageBtn ? "35" : "30"}
      className={
        styles.btnLanguage +
        (props.currentLanguage === props.languageBtn
          ? " " + styles.btnActif
          : "")
      }
      onClick={() => {
        switchLanguage(props.languageBtn);
      }}
    />
  );
};

export default LanguageBtn;
