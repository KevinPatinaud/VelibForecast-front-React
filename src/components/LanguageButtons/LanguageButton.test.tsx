import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { SwitchLanguageContext } from "../../provider/IntlProvider";
import LanguageBtn from "./LanguageButtons";

describe("<LanguageBtn/>", () => {
  describe("When the button is rendered", () => {
    it("should display the button", () => {
      const scr = render(
        <LanguageBtn
          countryCode={"fr"}
          languageBtn={"fr"}
          currentLanguage={"fr"}
        />
      );

      expect(scr.getByTestId("LanguageButton_fr")).toBeInTheDocument();
    });
  });

  describe("When the button correspond to the active language", () => {
    it("should set specific class for the button", () => {
      const scr = render(
        <LanguageBtn
          countryCode={"fr"}
          languageBtn={"fr"}
          currentLanguage={"fr"}
        />
      );

      expect(scr.getByTestId("LanguageButton_fr")).toBeInTheDocument();
      expect(scr.getByTestId("LanguageButton_fr")).toHaveClass("btnActif");
    });
  });

  describe("When the button didn't correspond to the active language", () => {
    it("shouldn't set specific class for the button", () => {
      const scr = render(
        <LanguageBtn
          countryCode={"fr"}
          languageBtn={"fr"}
          currentLanguage={"gb"}
        />
      );

      expect(scr.getByTestId("LanguageButton_fr")).toBeInTheDocument();
      expect(scr.getByTestId("LanguageButton_fr")).not.toHaveClass("btnActif");
    });
  });

  describe("When the button didn't correspond to the active language", () => {
    it("shouldn't set specific class for the button", async () => {
      const switchLanguage = jest.fn();

      const scr = render(
        <SwitchLanguageContext.Provider value={switchLanguage}>
          <LanguageBtn
            countryCode={"fr"}
            languageBtn={"fr"}
            currentLanguage={"en"}
          />
        </SwitchLanguageContext.Provider>
      );

      expect(scr.getByTestId("LanguageButton_fr")).toBeInTheDocument();

      userEvent.click(scr.getByTestId("LanguageButton_fr"));

      expect(switchLanguage).toHaveBeenCalled();
    });
  });
});
