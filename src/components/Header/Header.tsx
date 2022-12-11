import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBicycle } from "@fortawesome/free-solid-svg-icons";
import { FC } from "react";
import styles from "./Header.module.css";
import LanguageButtons from "../LanguageButtons";
import MyAccount from "../MyAccount/MyAccount";

const Header: FC = () => {
  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <a href="/">
          Velib forecast <FontAwesomeIcon icon={faBicycle} />
        </a>
      </div>
      <div className={styles.rightMenu}>
        <MyAccount />
        <LanguageButtons />
      </div>
    </div>
  );
};

export default Header;
