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
  const [account, setAccount] = useState({ isConnected: false } as Account);
  const value = useMemo(() => ({ account, setAccount }), [account]);

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
};

export default AccountProvider;
