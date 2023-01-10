import { FC, useEffect, useRef, useState } from "react";
import { Station } from "../../model/Station";
import StationService from "../../services/Station/Station.service";
import MapGoogle from "./components/mapgoogle/mapgoogle.component";
import SearchBar from "./components/searchbar/searchBar";
import StationDetails from "./components/stationdetails/stationDetails";
import styles from "./search.module.css";
import { useIntl } from "react-intl";
import { TranslationKeys } from "../../locales/constants";
import { StationState } from "../../model/StationState";

const Search: FC = () => {
  const [stations, setStations] = useState([] as Station[]);
  const [stationsStatus, setStationsStatus] = useState([] as StationState[]);
  const needUpdate = useRef(false);

  const [idStationSelected, setIdStationSelected] = useState(
    undefined as unknown as number
  );

  const intl = useIntl();

  useEffect(() => {
    const loadStation = async () => {
      setStations(await StationService.getStations());
    };
    loadStation();
  }, []);

  useEffect(() => {
    const loadStates = async () => {
      setStationsStatus(await StationService.getStatus());
      needUpdate.current = true;
    };
    loadStates();
    const interval = setInterval(loadStates, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (needUpdate.current) {
      const stationsWithStates = [] as Station[];

      stations.forEach((station) => {
        stationsStatus.forEach((state: StationState) => {
          if (state.idStation === station.id) {
            station.state = {} as StationState;
            station.state.nmbBikeAvailable = state.nmbBikeAvailable;
            station.state.nmbPlaceAvailable = state.nmbPlaceAvailable;
          }
        });
        stationsWithStates.push(station);
      });
      setStations(stationsWithStates);
    }
    needUpdate.current = false;
  }, [stationsStatus, stations]);

  let stationSelected = undefined;
  for (let i = 0; i < stations.length; i++)
    if (stations[i].id === idStationSelected) stationSelected = stations[i];

  return (
    <>
      <div className={styles.searchdiv}>
        <SearchBar
          placeHolder={intl.formatMessage({ id: TranslationKeys.SEARCH_BIKE })}
          stations={stations}
          onSelect={(station) => {
            setIdStationSelected(station.id);
          }}
        />
      </div>
      <div className={styles.pageContent}>
        <div
          className={
            stationSelected
              ? styles.divContentHalfWidthLeft
              : styles.divContentAllWidth
          }
        >
          <MapGoogle
            style={{ width: "100%", height: "100%" }}
            stations={stations}
            idStationSelected={idStationSelected}
            onStationClick={(station: Station) => {
              setIdStationSelected(station.id);
            }}
            initZoom={idStationSelected ? 15 : 12}
            initCenter={{
              lat: stationSelected ? stationSelected.lat : 48.866669,
              lng: stationSelected ? stationSelected.lng : 2.3333,
            }}
          />
        </div>
        {stationSelected && (
          <div className={styles.divContentHalfWidthRight}>
            <StationDetails station={stationSelected} />
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
