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

  console.log("______________________________");
  console.log(process.env.NODE_ENV);
  console.log(process.env.REACT_APP_FB_ID);
  console.log("______________________________");

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

export default FaceBookLog;
