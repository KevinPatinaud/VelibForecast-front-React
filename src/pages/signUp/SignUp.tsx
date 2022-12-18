import { FC, useState } from "react";
import styles from "./SignUp.module.css";
import Reaptcha from "reaptcha";
import { AccountService } from "../../services/Account/Account.service";
import { Account } from "../../model/Account";
import InformationModal from "../../components/InformationModal/InformationModal";

const accountService = new AccountService();

const SignUp: FC = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const formIsValide = () => {
    return displayName !== "" &&
      email !== "" &&
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
          displayName: displayName,
          email: email,
          password: password,
        } as Account,
        captchaToken
      );
    } else {
      setErrorMessage("Merci de completer correctement le formulaire");
    }
  };

  return (
    <div className={styles.pageContent}>
      <div className={styles.pageTitle}>Create your account</div>
      <div className={styles.information}>
        <label>Display name</label>
        <input
          data-testid="input_displayName"
          className={styles.inputText}
          value={displayName}
          onChange={(e) => {
            setDisplayName(e.target.value);
          }}
        ></input>
      </div>
      <div className={styles.information}>
        <label>Email</label>
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
        <label>Password (au moins 8 caractères)</label>
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
        <label>Confirm your password</label>
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
              setErrorMessage("Les deux mots de passe sont différents");
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
        Sign up
      </button>

      {errorMessage && (
        <InformationModal
          message={errorMessage}
          onClose={() => {
            setErrorMessage("");
          }}
        />
      )}
    </div>
  );
};

export default SignUp;
