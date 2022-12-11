import { FC } from "react";
import IntlProvider from "./IntlProvider";
import RouterProvider from "./Router";

const AppProviders: FC<{ children: JSX.Element }> = ({ children }) => {
  return (
    <RouterProvider>
      <IntlProvider>{children}</IntlProvider>
    </RouterProvider>
  );
};

export default AppProviders;
