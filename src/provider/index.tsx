import { FC } from "react";
import ErrorBoundary from "./ErrorBoundary";
import IntlProvider from "./IntlProvider";
import RouterProvider from "./Router";

const AppProviders: FC<{ children: JSX.Element }> = ({ children }) => {
  return (
    <ErrorBoundary fallback={<></>}>
      <RouterProvider>
        <IntlProvider>{children}</IntlProvider>
      </RouterProvider>
    </ErrorBoundary>
  );
};

export default AppProviders;
