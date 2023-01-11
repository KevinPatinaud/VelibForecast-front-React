import { FC, useContext } from "react";
import { Station } from "../../../../model/Station";
import { AccountContext } from "../../../../provider/AccountProvider";
import styles from "./FavoriteStations.module.css";

export interface FavoriteStationsProps {
  idStationSelected?: number;
  onSelect: (station: Station) => void;
}

const FavoriteStations: FC<FavoriteStationsProps> = (props) => {
  const { account } = useContext(AccountContext);

  return (
    <div className={styles.favStatList}>
      {account.favoriteStations &&
        account.favoriteStations
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((station: Station) => (
            <div
              key={station.id}
              className={
                station.id === props.idStationSelected
                  ? styles.stationLinkSelected
                  : styles.stationLink
              }
              onClick={() => {
                props.onSelect(station);
              }}
            >
              {station.name}
            </div>
          ))}
    </div>
  );
};

export default FavoriteStations;
