import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBicycle } from "@fortawesome/free-solid-svg-icons";
import { FC } from "react";
import styles from "./Header.module.css";
import LanguageButtons from "../LanguageButtons";
import MyAccountMenu from "../MyAccountMenu/MyAccountMenu";
import { Link } from "react-router-dom";

const Header: FC = () => {
  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <Link to="/">
          Velib forecast <FontAwesomeIcon icon={faBicycle} />
        </Link>
      </div>
      <div className={styles.rightMenu}>
        <MyAccountMenu />
        <LanguageButtons />
      </div>
    </div>
  );
};

export default Header;
