import {
  faBicycle,
  faHeartCircleMinus,
  faHeartCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useContext } from "react";
import { Station } from "../../../../model/Station";
import styles from "./stationDetails.module.css";
import { useIntl } from "react-intl";
import { TranslationKeys } from "../../../../locales/constants";
import { AccountContext } from "../../../../provider/AccountProvider";
import AccountService from "../../../../services/Account/Account.service";

export interface StationDetailsProps {
  station: Station;
}

const StationDetails: FC<StationDetailsProps> = (props) => {
  const intl = useIntl();
  const { account, setAccount } = useContext(AccountContext);

  let isUserFavoriteStation = false;

  if (account.isConnected && account.favoriteStations) {
    for (let i = 0; i < account.favoriteStations.length; i++) {
      if (props.station.id === account.favoriteStations.at(i)?.id) {
        isUserFavoriteStation = true;
      }
    }
  }

  return (
    <div>
      <div className={styles.titleStation}>
        <div className={styles.stationName}>{props.station.name}</div>
        {account.isConnected && !isUserFavoriteStation && (
          <div
            className={styles.addFavoriteStation}
            onClick={() => {
              AccountService.addFavoriteStation(props.station);
              const favStations = account.favoriteStations as Station[];
              favStations?.push(props.station);
              setAccount({
                ...account,
                favoriteStations: [...favStations],
              });
            }}
          >
            <FontAwesomeIcon icon={faHeartCirclePlus} />
          </div>
        )}
        {account.isConnected && isUserFavoriteStation && (
          <div
            className={styles.removeFavoriteStation}
            onClick={() => {
              AccountService.removeFavoriteStation(props.station);
              const favStations = [] as Station[];

              (account.favoriteStations as Station[]).forEach((station) => {
                if (station.id !== props.station.id) {
                  favStations.push(station);
                }
              });

              setAccount({
                ...account,
                favoriteStations: [...favStations],
              });
            }}
          >
            <FontAwesomeIcon icon={faHeartCircleMinus} />
          </div>
        )}
      </div>
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
                .replace("{X}", "2")}
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td className={styles.firstCol}>
              {intl
                .formatMessage({ id: TranslationKeys.IN_X_HOURS })
                .replace("{X}", "3")}
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
