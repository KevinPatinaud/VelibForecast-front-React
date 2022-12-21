import { faBicycle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { Station } from "../../../../model/Station";
import styles from "./stationDetails.module.css";
import { useIntl } from "react-intl";
import { TranslationKeys } from "../../../../locales/constants";

export interface StationDetailsProps {
  station: Station;
}

const StationDetails: FC<StationDetailsProps> = (props) => {
  const intl = useIntl();

  return (
    <div>
      <div className={styles.stationName}>{props.station.name}</div>
      <table className={styles.detailTable}>
        <thead>
          <tr>
            <th></th>
            <th>
              <FontAwesomeIcon icon={faBicycle} />{" "}
              {intl.formatMessage({ id: TranslationKeys.BIKE_AVAILABLE })}
            </th>
            <th>
              <b>P</b>{" "}
              {intl.formatMessage({ id: TranslationKeys.SPACE_AVAILABLE })}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className={styles.highlightLine}>
            <td className={styles.firstCol}>
              {intl.formatMessage({ id: TranslationKeys.CURRENTLY })}
            </td>
            <td>{props.station.state?.nmbBikeAvailable}</td>
            <td>{props.station.state?.nmbPlaceAvailable}</td>
          </tr>
          <tr>
            <td className={styles.firstCol}>
              {intl.formatMessage({ id: TranslationKeys.IN_1_HOUR })}
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr className={styles.highlightLine}>
            <td className={styles.firstCol}>
              {intl
                .formatMessage({ id: TranslationKeys.IN_X_HOURS })
                .replace("${X}", "2")}
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td className={styles.firstCol}>
              {intl
                .formatMessage({ id: TranslationKeys.IN_X_HOURS })
                .replace("${X}", "3")}
            </td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StationDetails;
