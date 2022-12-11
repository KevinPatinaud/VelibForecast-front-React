import { FC, useEffect, useState } from "react";
import styles from "./InformationModal.module.css";

interface Props {
  message: string;
  onClose?: () => void;
  timeToDisplay?: number;
}

const InformationModal: FC<Props> = (props) => {
  const [openned, setOpenned] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        setOpenned(false);
        if (props.onClose !== undefined) props.onClose();
      },
      props.timeToDisplay ? props.timeToDisplay : 60 * 1000
    );

    return () => clearTimeout(timeout);
  }, []);

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
