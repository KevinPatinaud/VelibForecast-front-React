import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useState } from "react";
import { Station } from "../../../../model/Station";
import styles from "./searchBar.module.css";

export interface SearchBarProps {
  placeHolder: string;
  stations: Station[];
  onSelect: (station: Station) => void;
}

const SearchBar: FC<SearchBarProps> = (props) => {
  const [displayList, setDisplayList] = useState(false);
  const [inputVal, setInputVal] = useState("");

  return (
    <div
      data-testid="searchBar_container"
      className={styles.container}
      onFocus={() => {
        setDisplayList(true);
      }}
      onMouseLeave={(e) => {
        setDisplayList(false);
      }}
    >
      <input
        data-testid="searchbar_input"
        className={styles.searchBar}
        onChange={(e) => {
          setInputVal(e.target.value);
        }}
        value={inputVal}
        placeholder={props.placeHolder}
      />
      <FontAwesomeIcon
        style={{ marginLeft: "-30px", marginTop: "7px" }}
        icon={faMagnifyingGlass}
      />

      {displayList && props.stations.length !== 0 && (
        <div className={styles.choicesList}>
          {props.stations
            .filter(
              (s) =>
                s.name
                  .toLowerCase()
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .indexOf(
                    inputVal
                      .toLowerCase()
                      .normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, "")
                  ) >= 0
            )
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((station) => (
              <div
                key={station.id}
                className={styles.choice}
                onClick={() => {
                  props.onSelect(station);
                  setInputVal(station.name);
                }}
              >
                {station.name}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
