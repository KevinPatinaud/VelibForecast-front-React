import {
  faBicycle,
  faHeartCircleMinus,
  faHeartCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useContext, useEffect, useState } from "react";
import { Station } from "../../../../model/Station";
import styles from "./stationDetails.module.css";
import { useIntl } from "react-intl";
import { TranslationKeys } from "../../../../locales/constants";
import { AccountContext } from "../../../../provider/AccountProvider";
import AccountService from "../../../../services/Account/Account.service";
import StationService from "../../../../services/Station/Station.service";
import { StationState } from "../../../../model/StationState";
import { Account } from "../../../../model/Account";

export interface StationDetailsProps {
  station: Station;
}

const isFavStation = (account: Account, station: Station) => {
  let res = false;
  if (account.isConnected && account.favoriteStations) {
    for (let i = 0; i < account.favoriteStations.length; i++) {
      if (station.id === account.favoriteStations.at(i)?.id) {
        res = true;
      }
    }
  }
  return res;
};

const StationDetails: FC<StationDetailsProps> = (props) => {
  const intl = useIntl();
  const { account, setAccount } = useContext(AccountContext);
  const [isUserFavoriteStation, setIsUserFavoriteStation] = useState(() => {
    return isFavStation(account, props.station);
  });

  useEffect(() => {
    setIsUserFavoriteStation(isFavStation(account, props.station));
  }, [account, props.station]);

  const [statusNow, setStatusNow] = useState({} as StationState);
  const [statusIn1Hour, setStatusIn1Hour] = useState({} as StationState);
  const [statusIn2Hour, setStatusIn2Hour] = useState({} as StationState);
  const [statusIn3Hour, setStatusIn3Hour] = useState({} as StationState);

  useEffect(() => {
    (async () => {
      setStatusNow(await StationService.getStatusInFutur(props.station.id, 0));
    })();
  }, [props.station.id]);

  useEffect(() => {
    (async () => {
      setStatusIn1Hour(
        await StationService.getStatusInFutur(props.station.id, 60)
      );
    })();
  }, [props.station.id]);

  useEffect(() => {
    (async () => {
      setStatusIn2Hour(
        await StationService.getStatusInFutur(props.station.id, 120)
      );
    })();
  }, [props.station.id]);

  useEffect(() => {
    (async () => {
      setStatusIn3Hour(
        await StationService.getStatusInFutur(props.station.id, 180)
      );
    })();
  }, [props.station.id]);

  return (
    <div>
      <div className={styles.titleStation}>
        <div className={styles.stationName}>{props.station.name}</div>
        {account.isConnected && !isUserFavoriteStation && (
          <div
            data-testid="add_fav_station"
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
            data-testid="remove_fav_station"
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
            <td>{statusNow.nmbBikeAvailable}</td>
            <td>{statusNow.nmbPlaceAvailable}</td>
          </tr>
          <tr>
            <td className={styles.firstCol}>
              {intl.formatMessage({ id: TranslationKeys.IN_1_HOUR })}
            </td>
            <td>{statusIn1Hour.nmbBikeAvailable}</td>
            <td>{statusIn1Hour.nmbPlaceAvailable}</td>
          </tr>
          <tr className={styles.highlightLine}>
            <td className={styles.firstCol}>
              {intl
                .formatMessage({ id: TranslationKeys.IN_X_HOURS })
                .replace("{X}", "2")}
            </td>
            <td>{statusIn2Hour.nmbBikeAvailable}</td>
            <td>{statusIn2Hour.nmbPlaceAvailable}</td>
          </tr>
          <tr>
            <td className={styles.firstCol}>
              {intl
                .formatMessage({ id: TranslationKeys.IN_X_HOURS })
                .replace("{X}", "3")}
            </td>
            <td>{statusIn3Hour.nmbBikeAvailable}</td>
            <td>{statusIn3Hour.nmbPlaceAvailable}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StationDetails;
