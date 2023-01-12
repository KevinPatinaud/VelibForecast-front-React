import { faUser, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useContext, useState } from "react";
import { AccountContext } from "../../provider/AccountProvider";
import MenuConnected from "./MenuConnected";
import MenuNotConnected from "./MenuNotConnected";
import styles from "./MyAccountMenu.module.css";

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

export default MyAccountMenu;
