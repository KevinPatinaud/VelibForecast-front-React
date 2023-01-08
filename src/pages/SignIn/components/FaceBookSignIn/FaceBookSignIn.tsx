import FacebookLogin, {
  ReactFacebookFailureResponse,
  ReactFacebookLoginInfo,
} from "react-facebook-login";
import { AccountService } from "../../../../services/Account/Account.service";

export interface FaceBookLogProps {
  onSucceed: () => void;
}

const FaceBookSignIn = (props: FaceBookLogProps) => {
  const accountService = new AccountService();

  const callback = async (userInfo: ReactFacebookLoginInfo) => {
    await accountService.connectFacebookAccount(userInfo.accessToken);

    if (accountService.isAuthTokenSetted()) {
      props.onSucceed();
    }
  };

  const onFailure = (response: ReactFacebookFailureResponse) => {
    console.log("fail");
  };

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
