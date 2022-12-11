import { FC, useEffect, useState } from "react";
import styles from "./InformationModal.module.css";

interface Props {
  message: string;
  onClose?: () => void;
  timeToDisplay?: number;
}

const InformationModal: FC<Props> = (props) => {
  const [openned, setOpenned] = useState(true);
  const [onCloseFnc] = useState(() => {
    return props.onClose !== undefined ? props.onClose : () => {};
  });
  const [timeToDisplay] = useState(
    props.timeToDisplay ? props.timeToDisplay : 60 * 1000
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      onCloseFnc();
      setOpenned(false);
    }, timeToDisplay);

    return () => clearTimeout(timeout);
  }, [onCloseFnc, timeToDisplay]);

  return !openned ? (
    <></>
  ) : (
    <div className={styles.divInfo}>
      <button
        data-testid="button_close"
        className={styles.closeButton}
        onClick={() => {
          setOpenned(false);
          props.onClose && props.onClose();
        }}
      >
        X
      </button>
      <div className={styles.divInfoContent}>{props.message}</div>
    </div>
  );
};

export default InformationModal;
