import { FC, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./GlobalMessage.module.css";

const GlobalMessage: FC = () => {
  const { state } = useLocation();
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (msg !== "") {
      setTimeout(() => {
        setMsg("");
        window.history.replaceState({}, document.title);
      }, 10 * 1000);
    }
  }, [msg]);

  useEffect(() => {
    if (state !== null) {
      const { message } = state;
      if (message !== null && message !== "") setMsg(message);
    }
  }, [state]);

  if (state !== null && msg !== "")
    return <div className={styles.GlobalMessage}>{msg}</div>;

  return <></>;
};

export default GlobalMessage;
