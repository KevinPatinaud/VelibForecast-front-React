import { FC } from "react";
import styles from "./SignUp.module.css";
import { useIntl } from "react-intl";
import { TranslationKeys } from "../../locales/constants";
import FormSignUp from "./components/FormSignUp";

const SignUp: FC = () => {
  const intl = useIntl();

  return (
    <div className={styles.pageContent}>
      <div className={styles.pageTitle}>
        {intl.formatMessage({ id: TranslationKeys.CREATE_YOUR_ACCOUNT })}
      </div>
      <FormSignUp />
    </div>
  );
};

export default SignUp;
