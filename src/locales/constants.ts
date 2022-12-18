export type Translation = Record<TranslationKeys, string>;

export enum TranslationKeys {
  HELLO = "test.hello",
  SEARCH_BIKE = "search.bike",
  BIKE_AVAILABLE = "station.detail.bike.available",
  SPACE_AVAILABLE = "station.detail.space.available",
  CURRENTLY = "station.detail.currently",
}
