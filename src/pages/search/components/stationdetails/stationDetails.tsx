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
import { Account } from "../../../../model/Account";
import LineTable from "./lineTable";
import React from "react";

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
                favoriteStations: favStations ? [...favStations] : [],
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
          <MemoLineTable
            lineTitle={intl.formatMessage({ id: TranslationKeys.CURRENTLY })}
            minutesInTheFutur={0}
            station={props.station}
          />
          <MemoLineTable
            lineTitle={intl.formatMessage({ id: TranslationKeys.IN_1_HOUR })}
            minutesInTheFutur={60}
            station={props.station}
            highligth={true}
          />
          <MemoLineTable
            lineTitle={intl
              .formatMessage({ id: TranslationKeys.IN_X_HOURS })
              .replace("{X}", "2")}
            minutesInTheFutur={120}
            station={props.station}
          />
          <MemoLineTable
            lineTitle={intl
              .formatMessage({ id: TranslationKeys.IN_X_HOURS })
              .replace("{X}", "3")}
            minutesInTheFutur={180}
            station={props.station}
            highligth={true}
          />
        </tbody>
      </table>
    </div>
  );
};

const MemoLineTable = React.memo(LineTable);
export default StationDetails;
