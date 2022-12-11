import { FC } from "react";
import styles from "./Body.module.css";

const Body: FC<{ children: JSX.Element }> = (props) => {
  return <div className={styles.bodyApp}>{props.children}</div>;
};

export default Body;
