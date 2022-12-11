import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useState } from "react";
import styles from "./MyAccount.module.css";

const MyAccount: FC = () => {
  const [displayMenu, setDisplayMenu] = useState(false);
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
              <a href="/signUp">Créer un compte</a>
            </li>
            <li>
              <a href="/signIn">Connexion</a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default MyAccount;
