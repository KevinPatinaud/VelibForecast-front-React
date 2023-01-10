import { useContext, useState } from "react";
import FacebookLogin, {
  ReactFacebookFailureResponse,
  ReactFacebookLoginInfo,
} from "react-facebook-login";
import { useIntl } from "react-intl";
import { TranslationKeys } from "../../../../locales/constants";
import { Account } from "../../../../model/Account";
import { AccountContext } from "../../../../provider/AccountProvider";
import AccountService from "../../../../services/Account/Account.service";
import styles from "./FaceBookLog.module.css";

export interface FaceBookLogProps {
  onSucceed: () => void;
}

const FaceBookLog = (props: FaceBookLogProps) => {
  const [errorMessage, setErrorMessage] = useState(false);
  const intl = useIntl();

  const { setAccount } = useContext(AccountContext);

  const callback = async (userInfo: ReactFacebookLoginInfo) => {
    const result = await AccountService.createFacebookAccount(
      userInfo.accessToken
    );

    if ((result as Number) === 304) {
      setErrorMessage(true);
    }

    if (AccountService.isAuthTokenSetted() && !(result instanceof Number)) {
      setAccount({ ...(result as Account), isConnected: true });
      props.onSucceed();
    }
  };

  const onFailure = (response: ReactFacebookFailureResponse) => {
    console.log("fail");
  };

  return (
    <>
      {errorMessage && (
        <p className={styles.errorP}>
          {intl.formatMessage({
            id: TranslationKeys.USER_ALREADY_EXIST,
          })}
        </p>
      )}
      <FacebookLogin
        appId={process.env.REACT_APP_FB_ID as string}
        fields="name,email"
        callback={callback}
        onFailure={onFailure}
        textButton={"Facebook"}
        buttonStyle={
          {
            background:
              "linear-gradient(rgba(1, 0, 53, 1) 0%, rgba(52, 168, 224, 1) 100%)",
            borderRadius: "25px",
            border: "2px solid black",
          } as React.CSSProperties
        }
      />
    </>
  );
};

export default FaceBookLog;
