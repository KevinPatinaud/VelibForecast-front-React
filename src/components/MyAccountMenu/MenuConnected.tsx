import { FC, useContext } from "react";
import { useIntl } from "react-intl";
import { TranslationKeys } from "../../locales/constants";
import { Account } from "../../model/Account";
import { AccountContext } from "../../provider/AccountProvider";
import AccountService from "../../services/Account/Account.service";
import styles from "./MyAccountMenu.module.css";

const MenuConnected: FC<{ onMouseLeave: () => void }> = ({ onMouseLeave }) => {
  const { setAccount } = useContext(AccountContext);
  const intl = useIntl();

  return (
    <div
      data-testid="div_user_menu_connected"
      className={styles.accountMenu}
      onMouseLeave={(e) => {
        onMouseLeave();
      }}
    >
      <ul>
        <li
          onClick={() => {
            AccountService.disconnect();
            setAccount({ isConnected: false } as Account);
            onMouseLeave();
          }}
        >
          {intl.formatMessage({ id: TranslationKeys.DISCONNECT })}
        </li>
      </ul>
    </div>
  );
};

export default MenuConnected;
