import { FC } from "react";
import AccountProvider from "./AccountProvider";
import ErrorBoundary from "./ErrorBoundary";
import IntlProvider from "./IntlProvider";

const AppProviders: FC<{ children: JSX.Element }> = ({ children }) => {
  return (
    <ErrorBoundary fallback={<></>}>
      <AccountProvider>
        <IntlProvider>{children}</IntlProvider>
      </AccountProvider>
    </ErrorBoundary>
  );
};

export default AppProviders;
