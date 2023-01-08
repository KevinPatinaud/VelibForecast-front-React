import { FC, useState } from "react";
import { useIntl } from "react-intl";
import Reaptcha from "reaptcha";
import styles from "./FormSignIn.module.css";
import { TranslationKeys } from "../../../../locales/constants";
import { Account } from "../../../../model/Account";
import { AccountService } from "../../../../services/Account/Account.service";
import InformationModal from "../../../../components/InformationModal/InformationModal";

export interface FormSignInProps {
  onSucceed: () => void;
}

const accountService = new AccountService();

const FormSignIn: FC<FormSignInProps> = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const intl = useIntl();

  const formIsValide = () => {
    return email !== "" &&
      email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ) &&
      password !== "" &&
      captchaToken !== ""
      ? true
      : false;
  };

  const submitForm = async () => {
    if (formIsValide()) {
      const result = await accountService.connectMailAccount(
        {
          email: email,
          password: password,
        } as Account,
        captchaToken
      );

      if ((result as Number) === 401) {
        setErrorMessage("Please check again your password");
      }

      if ((result as Number) === 404) {
        setErrorMessage("This user doesn't exist");
      }

      if (accountService.isAuthTokenSetted()) {
        props.onSucceed();
      }
    }
  };

  return (
    <>
      <div className={styles.information}>
        <label>{intl.formatMessage({ id: TranslationKeys.E_MAIL })}</label>

        <input
          data-testid="input_email"
          type="email"
          className={styles.inputText}
          value={email}
          onChange={async (e) => {
            setEmail(e.target.value);
          }}
        ></input>
      </div>
      <div className={styles.information}>
        <label>
          {intl.formatMessage({ id: TranslationKeys.PASSWORD_LogIn })}
        </label>
        <input
          data-testid="input_password"
          type="password"
          className={styles.inputText}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
      </div>

      <div className={styles.captcha}>
        <Reaptcha
          sitekey={process.env.REACT_APP_SITE_KEY}
          onVerify={(token) => {
            setCaptchaToken(token);
          }}
          onExpire={() => {
            setCaptchaToken("");
          }}
        />
      </div>

      <button className={styles.signUpBtn} onClick={submitForm}>
        {intl.formatMessage({ id: TranslationKeys.VALIDATE })}
      </button>
      {errorMessage && (
        <InformationModal
          message={errorMessage}
          onClose={() => {
            setErrorMessage("");
          }}
        />
      )}
    </>
  );
};

export default FormSignIn;
