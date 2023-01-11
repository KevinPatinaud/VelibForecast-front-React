import { FC, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./GlobalMessage.module.css";

export interface GlobalMessageProps {
  duration?: number;
}

const GlobalMessage: FC<GlobalMessageProps> = (props) => {
  const [msg, setMsg] = useState("");
  const locationState = useLocation().state;

  useEffect(() => {
    if (msg !== "") {
      setTimeout(
        () => {
          setMsg("");
          window.history.replaceState({}, document.title);
        },
        props.duration ? props.duration : 10 * 1000
      );
    }
  }, [msg, props.duration]);

  useEffect(() => {
    if (locationState !== null) {
      const { message } = locationState;
      if (message !== null && message !== "") setMsg(message);
    }
  }, [locationState]);

  if (locationState !== null && msg !== "")
    return <div className={styles.GlobalMessage}>{msg}</div>;

  return <></>;
};

export default GlobalMessage;
