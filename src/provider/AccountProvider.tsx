import React, { useMemo, useState } from "react";
import { FC } from "react";
import { Account } from "../model/Account";

export const AccountContext = React.createContext({
  account: {
    isConnected: false,
  } as Account,
  setAccount: (account: Account) => {},
});

const AccountProvider: FC<{ children: JSX.Element }> = ({ children }) => {
  const [account, setAccount] = useState(() => {
    const accountSession = sessionStorage.getItem("ACCOUNT");
    if (accountSession === null || accountSession === "")
      return {
        isConnected: false,
      } as Account;
    else return JSON.parse(accountSession) as Account;
  });

  const setSessionAccount = (account: Account) => {
    sessionStorage.setItem("ACCOUNT", JSON.stringify(account));
    setAccount(account);
  };

  const value = useMemo(
    () => ({ account: account, setAccount: setSessionAccount }),
    [account]
  );

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
};

export default AccountProvider;
