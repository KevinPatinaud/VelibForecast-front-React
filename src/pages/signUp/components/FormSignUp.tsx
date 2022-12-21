import { FC, useState } from "react";
import { useIntl } from "react-intl";
import Reaptcha from "reaptcha";
import styles from "./FormSignUp.module.css";
import { TranslationKeys } from "../../../locales/constants";
import { Account } from "../../../model/Account";
import { AccountService } from "../../../services/Account/Account.service";
import InformationModal from "../../../components/InformationModal/InformationModal";

const FormSignUp: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const intl = useIntl();

  const accountService = new AccountService();

  const formIsValide = () => {
    return email !== "" &&
      email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ) &&
      password !== "" &&
      password.length >= 8 &&
      password2 !== "" &&
      password === password2 &&
      captchaToken !== ""
      ? true
      : false;
  };

  const submitForm = () => {
    if (formIsValide()) {
      accountService.createAccount(
        {
          email: email,
          password: password,
        } as Account,
        captchaToken
      );
    } else {
      setErrorMessage(
        intl.formatMessage({ id: TranslationKeys.PLEASE_WELL_COMPLETE_FORM })
      );
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
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
      </div>
      <div className={styles.information}>
        <label>{intl.formatMessage({ id: TranslationKeys.PASSWORD })}</label>
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
      <div className={styles.information}>
        <label>
          {intl.formatMessage({ id: TranslationKeys.PASSWORD_CONFIRM })}
        </label>
        <input
          data-testid="input_password2"
          type="password"
          className={styles.inputText}
          value={password2}
          onChange={(e) => {
            setPassword2(e.target.value);
          }}
          onBlur={(e) => {
            if (password !== password2)
              setErrorMessage(
                intl.formatMessage({
                  id: TranslationKeys.PASSWORD_ARE_DIFFERENT,
                })
              );
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

export default FormSignUp;
