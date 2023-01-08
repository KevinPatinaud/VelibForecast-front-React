import { FC, useContext } from "react";
import styles from "./SignUp.module.css";
import { useIntl } from "react-intl";
import { TranslationKeys } from "../../locales/constants";
import FormSignUp from "./components/FormSignUp/FormSignUp";
import FaceBookLog from "./components/FaceBookLog/FaceBookLog";
import { useNavigate } from "react-router-dom";
import { AccountContext } from "../../provider/AccountProvider";

const SignUp: FC = () => {
  const intl = useIntl();
  const naviguate = useNavigate();
  const { account, setAccount } = useContext(AccountContext);

  return (
    <div className={styles.pageContent}>
      <div className={styles.pageTitle}>
        {intl.formatMessage({ id: TranslationKeys.CREATE_YOUR_ACCOUNT })}
      </div>
      <FormSignUp
        onSucceed={() => {
          setAccount({ ...account, isConnected: true });
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
          setAccount({ ...account, isConnected: true });
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
