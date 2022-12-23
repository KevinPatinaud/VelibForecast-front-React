import FacebookLogin, {
  ReactFacebookFailureResponse,
  ReactFacebookLoginInfo,
} from "react-facebook-login";

const FaceBookLog = () => {
  const callback = (
    userInfo: ReactFacebookLoginInfo | ReactFacebookFailureResponse
  ) => {
    console.log(userInfo);
  };

  const onFailure = (response: ReactFacebookFailureResponse) => {};

  return (
    <FacebookLogin
      appId="684735199895720"
      fields="name,email,picture"
      callback={callback}
      onFailure={onFailure}
      buttonStyle={{ background: "purple" } as React.CSSProperties}
    />
  );
};

export default FaceBookLog;
