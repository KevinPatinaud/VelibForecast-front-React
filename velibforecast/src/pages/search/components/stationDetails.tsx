import { faBicycle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { Station } from "../../../model/Station";
import styles from "./stationDetails.module.css";

export interface StationDetailsProps {
  station: Station;
}

const StationDetails: FC<StationDetailsProps> = (props) => {
  return (
    <div>
      <div className={styles.stationName}>{props.station.name}</div>
      <table className={styles.detailTable}>
        <thead>
          <tr>
            <th></th>
            <th>
              <FontAwesomeIcon icon={faBicycle} /> vélo(s) disponnible(s)
            </th>
            <th>
              <b>P</b> place(s) disponnible(s)
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className={styles.highlightLine}>
            <td className={styles.firstCol}>Actuellement</td>
            <td>{props.station.state?.nmbBikeAvailable}</td>
            <td>{props.station.state?.nmbPlaceAvailable}</td>
          </tr>
          <tr>
            <td className={styles.firstCol}>Dans 1 heure</td>
            <td></td>
            <td></td>
          </tr>
          <tr className={styles.highlightLine}>
            <td className={styles.firstCol}>Dans 2 heures</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td className={styles.firstCol}>Dans 3 heures</td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StationDetails;
