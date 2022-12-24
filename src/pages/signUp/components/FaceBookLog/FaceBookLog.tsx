import FacebookLogin, {
  ReactFacebookFailureResponse,
  ReactFacebookLoginInfo,
} from "react-facebook-login";
import { AccountService } from "../../../../services/Account/Account.service";

const FaceBookLog = () => {
  const accountService = new AccountService();

  const callback = (userInfo: ReactFacebookLoginInfo) => {
    console.log(userInfo);
    accountService.createFacebookAccount(userInfo.accessToken);
  };

  const onFailure = (response: ReactFacebookFailureResponse) => {
    console.log("fail");
  };

  return (
    <FacebookLogin
      appId="684735199895720"
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

export default FaceBookLog;
