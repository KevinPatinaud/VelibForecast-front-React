import { fr } from "./fr";
import { en } from "./en";

export const supportedLocales = { English: "en", French: "fr" };

export const defaultLanguage = supportedLocales.English;

export const localMessages = new Map()
  .set(supportedLocales.French, fr)
  .set(supportedLocales.English, en);
