import { FC } from "react";
import { BrowserRouter } from "react-router-dom";

const RouterProvider: FC<{ children: JSX.Element }> = ({ children }) => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>{children}</BrowserRouter>
  );
};

export default RouterProvider;
