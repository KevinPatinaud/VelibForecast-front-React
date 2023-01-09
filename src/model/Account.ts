import { Station } from "./Station";

export interface Account {
  isConnected: boolean;
  id?: string;
  favoriteStations?: Station[];
  email?: string;
  password?: string;
  facebookId?: string;
}
