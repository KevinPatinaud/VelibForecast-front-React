import { FC, useEffect, useState } from "react";
import { Station } from "../../../../model/Station";
import { StationState } from "../../../../model/StationState";
import StationService from "../../../../services/Station/Station.service";
import styles from "./stationDetails.module.css";

export interface LineTableprops {
  lineTitle: string;
  minutesInTheFutur: number;
  station: Station;
  highligth?: boolean;
}

const LineTable: FC<LineTableprops> = (props) => {
  const [statusInXMinutes, setStatusInXMinutes] = useState({} as StationState);

  useEffect(() => {
    (async () => {
      setStatusInXMinutes(
        await StationService.getStatusInFutur(
          props.station.id,
          props.minutesInTheFutur
        )
      );
    })();
  }, [props.station.id, props.minutesInTheFutur]);

  console.log("LineTable : " + props.minutesInTheFutur);

  return (
    <tr className={props.highligth ? styles.highlightLine : undefined}>
      <td className={styles.firstCol}>{props.lineTitle}</td>
      <td>{statusInXMinutes.nmbBikeAvailable}</td>
      <td>{statusInXMinutes.nmbPlaceAvailable}</td>
    </tr>
  );
};

export default LineTable;
