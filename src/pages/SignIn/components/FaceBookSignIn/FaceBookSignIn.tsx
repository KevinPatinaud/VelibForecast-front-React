import { FC, useContext } from "react";
import FacebookLogin, {
  ReactFacebookFailureResponse,
  ReactFacebookLoginInfo,
} from "react-facebook-login";
import { AccountContext } from "../../../../provider/AccountProvider";
import AccountService from "../../../../services/Account/Account.service";
import { Account } from "../../../../model/Account";

export interface FaceBookLogProps {
  onSucceed: () => void;
}

const FaceBookSignIn: FC<FaceBookLogProps> = (props: FaceBookLogProps) => {
  const { setAccount } = useContext(AccountContext);

  const callback = async (userInfo: ReactFacebookLoginInfo) => {
    const res = await AccountService.connectFacebookAccount(
      userInfo.accessToken
    );

    if (AccountService.isAuthTokenSetted() && !(res instanceof Number)) {
      setAccount({ ...(res as Account), isConnected: true });
      props.onSucceed();
    }
  };

  const onFailure = (response: ReactFacebookFailureResponse) => {};

  return (
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
  );
};

export default FaceBookSignIn;
