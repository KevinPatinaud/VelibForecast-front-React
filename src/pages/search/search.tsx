import { FC, useEffect, useRef, useState } from "react";
import { Station } from "../../model/Station";
import { StationService } from "../../services/Station/Station.service";
import MapGoogle from "./components/mapgoogle/mapgoogle.component";
import SearchBar from "./components/searchbar/searchBar";
import StationDetails from "./components/stationdetails/stationDetails";
import styles from "./search.module.css";
import { useIntl } from "react-intl";
import { TranslationKeys } from "../../locales/constants";
import { StationState } from "../../model/StationState";

const Search: FC = () => {
  const [listStation, setListStation] = useState([] as Station[]);
  const [idStationSelected, setIdStationSelected] = useState(
    undefined as unknown as number
  );
  const statesLoaded = useRef(false);
  const [stationService] = useState(new StationService());

  const intl = useIntl();

  useEffect(() => {
    const loadStation = async () => {
      setListStation(await stationService.getStations());
    };

    loadStation();
  }, [stationService]);

  useEffect(() => {
    const loadStates = async () => {
      const stationsWithStates = [] as Station[];
      const states = await stationService.getStatus();

      listStation.forEach((station) => {
        states.forEach((state) => {
          if (state.idStation === station.id) {
            station.state = {} as StationState;
            station.state.nmbBikeAvailable = state.nmbBikeAvailable;
            station.state.nmbPlaceAvailable = state.nmbPlaceAvailable;
          }
        });
        stationsWithStates.push(station);
      });
      statesLoaded.current = true;
      setListStation(stationsWithStates);
    };
    if (listStation.length !== 0)
      setTimeout(loadStates, statesLoaded.current ? 60 * 1000 : 0); // refresh stations states every minute
  }, [stationService, listStation]);

  let stationSelected = undefined;
  for (let i = 0; i < listStation.length; i++)
    if (listStation[i].id === idStationSelected)
      stationSelected = listStation[i];

  return (
    <>
      <div className={styles.searchdiv}>
        <SearchBar
          placeHolder={intl.formatMessage({ id: TranslationKeys.SEARCH_BIKE })}
          stations={listStation}
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
            stations={listStation}
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
