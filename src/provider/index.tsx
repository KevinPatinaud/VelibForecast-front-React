import { FC } from "react";
import IntlProvider from "./IntlProvider";
import RouterProvider from "./Router";

const AppProviders: FC<{ children: JSX.Element }> = ({ children }) => {
  return (
    <IntlProvider>
      <RouterProvider>{children}</RouterProvider>
    </IntlProvider>
  );
};

export default AppProviders;
