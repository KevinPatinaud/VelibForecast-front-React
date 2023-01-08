import React from "react";
import Header from "./components/Header/Header";
import Search from "./pages/search";
import Body from "./components/Body/Body";
import AppProviders from "./provider";
import { Route, Routes } from "react-router-dom";
import GlobalMessage from "./components/GlobalMessage/GlobalMessage";

const SignUp = React.lazy(() => import("./pages/signUp/SignUp"));
const SignIn = React.lazy(() => import("./pages/SignIn/SignIn"));
const NotFound = React.lazy(() => import("./pages/notFound/NotFound"));

function App() {
  return (
    <AppProviders>
      <>
        <Header />
        <GlobalMessage />
        <Body>
          <Routes>
            <Route path="/" element={<Search />} />
            <Route path="signUp" element={<SignUp />} />
            <Route path="signIn" element={<SignIn />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Body>
      </>
    </AppProviders>
  );
}

export default App;
