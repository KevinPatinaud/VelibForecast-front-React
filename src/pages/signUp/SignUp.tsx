import { FC } from "react";
import styles from "./SignUp.module.css";
import { useIntl } from "react-intl";
import { TranslationKeys } from "../../locales/constants";
import FormSignUp from "./components/FormSignUp/FormSignUp";
import FaceBookLog from "./components/FaceBookLog/FaceBookLog";

const SignUp: FC = () => {
  const intl = useIntl();

  return (
    <div className={styles.pageContent}>
      <div className={styles.pageTitle}>
        {intl.formatMessage({ id: TranslationKeys.CREATE_YOUR_ACCOUNT })}
      </div>
      <FormSignUp
        onSucced={() => {
          console.log("User well created in the database");
        }}
      />
      <FaceBookLog />
    </div>
  );
};

export default SignUp;
