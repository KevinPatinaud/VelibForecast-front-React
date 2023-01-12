import { FC } from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { TranslationKeys } from "../../locales/constants";
import styles from "./MyAccountMenu.module.css";

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

export default MenuNotConnected;
