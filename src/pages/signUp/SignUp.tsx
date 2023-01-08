import { FC } from "react";
import styles from "./SignUp.module.css";
import { useIntl } from "react-intl";
import { TranslationKeys } from "../../locales/constants";
import FormSignUp from "./components/FormSignUp/FormSignUp";
import FaceBookLog from "./components/FaceBookLog/FaceBookLog";
import { useNavigate } from "react-router-dom";

const SignUp: FC = () => {
  const intl = useIntl();
  const naviguate = useNavigate();

  return (
    <div className={styles.pageContent}>
      <div className={styles.pageTitle}>
        {intl.formatMessage({ id: TranslationKeys.CREATE_YOUR_ACCOUNT })}
      </div>
      <FormSignUp
        onSucceed={() => {
          naviguate("/", {
            state: {
              message: intl.formatMessage({
                id: TranslationKeys.WELCOME_NEW_USER,
              }),
            },
          });
        }}
      />
      <div className={styles.boxOrSocial}>
        <div>
          <hr className={styles.hrSocial} />
        </div>
        <p className={styles.textOrSocial}>
          {intl.formatMessage({
            id: TranslationKeys.OR_SIGN_WITH,
          })}
        </p>
        <div>
          <hr className={styles.hrSocial} />
        </div>
      </div>
      <FaceBookLog
        onSucceed={() => {
          naviguate("/", {
            state: {
              message: intl.formatMessage({
                id: TranslationKeys.WELCOME_NEW_USER,
              }),
            },
          });
        }}
      />
    </div>
  );
};

export default SignUp;
