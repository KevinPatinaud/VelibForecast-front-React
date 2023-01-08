import { FC, useContext } from "react";
import styles from "./SignIn.module.css";
import { useIntl } from "react-intl";
import { TranslationKeys } from "../../locales/constants";
import { useNavigate } from "react-router-dom";
import FormSignIn from "./components/FormSignIn/FormSignIn";
import FaceBookSignIn from "./components/FaceBookSignIn/FaceBookSignIn";
import { AccountContext } from "../../provider/AccountProvider";

const SignIn: FC = () => {
  const intl = useIntl();
  const naviguate = useNavigate();
  const { account, setAccount } = useContext(AccountContext);

  return (
    <div className={styles.pageContent}>
      <div className={styles.pageTitle}>
        {intl.formatMessage({ id: TranslationKeys.CONNECTION })}
      </div>
      <FormSignIn
        onSucceed={() => {
          setAccount({ ...account, isConnected: true });
          naviguate("/");
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
      <FaceBookSignIn
        onSucceed={() => {
          setAccount({ ...account, isConnected: true });
          naviguate("/");
        }}
      />
    </div>
  );
};

export default SignIn;
