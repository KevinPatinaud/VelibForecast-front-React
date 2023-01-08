import { FC } from "react";
import AccountProvider from "./AccountProvider";
import ErrorBoundary from "./ErrorBoundary";
import IntlProvider from "./IntlProvider";
import RouterProvider from "./Router";

const AppProviders: FC<{ children: JSX.Element }> = ({ children }) => {
  return (
    <ErrorBoundary fallback={<></>}>
      <AccountProvider>
        <RouterProvider>
          <IntlProvider>{children}</IntlProvider>
        </RouterProvider>
      </AccountProvider>
    </ErrorBoundary>
  );
};

export default AppProviders;
