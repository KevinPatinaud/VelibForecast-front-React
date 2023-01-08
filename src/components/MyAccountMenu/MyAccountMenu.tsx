import { faUser, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useContext, useState } from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { TranslationKeys } from "../../locales/constants";
import { AccountContext } from "../../provider/AccountProvider";
import { AccountService } from "../../services/Account/Account.service";
import styles from "./MyAccountMenu.module.css";

const accountService = new AccountService();

const MyAccountMenu: FC = () => {
  const [displayMenu, setDisplayMenu] = useState(false);
  const { account } = useContext(AccountContext);

  const onMouseLeave = () => setDisplayMenu(false);

  return (
    <div
      data-testid="div_MyAccount"
      className={styles.MyAccount}
      onMouseEnter={(e) => {
        setDisplayMenu(true);
      }}
      onMouseLeave={(e) => {
        onMouseLeave();
      }}
    >
      <FontAwesomeIcon icon={!account.isConnected ? faUser : faUserCircle} />
      {displayMenu && !account.isConnected && (
        <MenuNotConnected onMouseLeave={onMouseLeave} />
      )}
      {displayMenu && account.isConnected && (
        <MenuConnected onMouseLeave={onMouseLeave} />
      )}
    </div>
  );
};

const MenuNotConnected: FC<{ onMouseLeave: () => void }> = ({
  onMouseLeave,
}) => {
  const intl = useIntl();

  return (
    <div
      data-testid="div_user_menu_not_connected"
      className={styles.accountMenu}
      onMouseLeave={(e) => {
        onMouseLeave();
      }}
    >
      <ul>
        <li>
          <Link to="/signUp">
            {intl.formatMessage({ id: TranslationKeys.SIGN_UP })}
          </Link>
        </li>
        <li>
          <Link to="/signIn">
            {intl.formatMessage({ id: TranslationKeys.SIGN_IN })}
          </Link>
        </li>
      </ul>
    </div>
  );
};

const MenuConnected: FC<{ onMouseLeave: () => void }> = ({ onMouseLeave }) => {
  const { account, setAccount } = useContext(AccountContext);
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
            accountService.disconnect();
            setAccount({ ...account, isConnected: false });
            onMouseLeave();
          }}
        >
          {intl.formatMessage({ id: TranslationKeys.DISCONNECT })}
        </li>
      </ul>
    </div>
  );
};

export default MyAccountMenu;
