import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useState } from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { TranslationKeys } from "../../locales/constants";
import styles from "./MyAccount.module.css";

const MyAccount: FC = () => {
  const [displayMenu, setDisplayMenu] = useState(false);

  const intl = useIntl();

  return (
    <div
      data-testid="div_MyAccount"
      className={styles.MyAccount}
      onMouseEnter={(e) => {
        setDisplayMenu(true);
      }}
      onMouseLeave={(e) => {
        setDisplayMenu(false);
      }}
    >
      <FontAwesomeIcon icon={faUser} />
      {displayMenu && (
        <div className={styles.accountMenu}>
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
      )}
    </div>
  );
};

export default MyAccount;
