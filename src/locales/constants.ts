export type Translation = Record<TranslationKeys, string>;

export enum TranslationKeys {
  HELLO = "test.hello",
  SEARCH_BIKE = "search.bike",
  BIKE_AVAILABLE = "station.detail.bike.available",
  SPACE_AVAILABLE = "station.detail.space.available",
  CURRENTLY = "station.detail.currently",
  IN_1_HOUR = "station.detail.in.1.hour",
  IN_X_HOURS = "station.detail.in.X.hours",
  SIGN_UP = "sign.up",
  SIGN_IN = "sign.in",

  CREATE_YOUR_ACCOUNT = "form.create.your.account",
  E_MAIL = "form.e.mail",
  PASSWORD = "form.paswword1",
  PASSWORD_CONFIRM = "form.paswword2",
  VALIDATE = "form.validate",
  PLEASE_WELL_COMPLETE_FORM = "form.please.well.complete",
  PASSWORD_ARE_DIFFERENT = "form.password.different",
}
