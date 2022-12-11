import React from "react";
import Header from "./components/Header/Header";
import Search from "./pages/search";
import Body from "./components/Body/Body";
import AppProviders from "./provider";
import { Route, Routes } from "react-router-dom";

const SignUp = React.lazy(() => import("./pages/signUp/SignUp"));
const SignIn = React.lazy(() => import("./pages/SignIn/SignIn"));

function App() {
  return (
    <AppProviders>
      <>
        <Header />
        <Body>
          <Routes>
            <Route path="/" element={<Search />} />
            <Route path="signUp" element={<SignUp />} />
            <Route path="signIn" element={<SignIn />} />
          </Routes>
        </Body>
      </>
    </AppProviders>
  );
}

export default App;
