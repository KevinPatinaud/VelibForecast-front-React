import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FC, useContext } from "react";
import { useIntl } from "react-intl";
import { TranslationKeys } from "../locales/constants";
import IntlProvider, { SwitchLanguageContext } from "./IntlProvider";

const Message: FC = () => {
  const intl = useIntl();
  const switchLanguage = useContext(SwitchLanguageContext);

  return (
    <>
      {intl.formatMessage({ id: TranslationKeys.HELLO })}
      <div
        data-testid="switchToFR"
        onClick={() => {
          switchLanguage("fr");
        }}
      />
      <div
        data-testid="switchToEN"
        onClick={() => {
          switchLanguage("en");
        }}
      />
      <div
        data-testid="switchToUNDECLARED"
        onClick={() => {
          switchLanguage("undeclared");
        }}
      />
    </>
  );
};

describe("<IntlProvider/>", () => {
  describe("when switch language", () => {
    it("should change wording", () => {
      const scr = render(
        <IntlProvider>
          <Message />
        </IntlProvider>
      );

      userEvent.click(scr.getByTestId("switchToEN"));
      expect(scr.queryByText("Hello")).toBeInTheDocument();

      userEvent.click(scr.getByTestId("switchToFR"));
      expect(scr.queryByText("Bonjour")).toBeInTheDocument();

      userEvent.click(scr.getByTestId("switchToUNDECLARED"));
      expect(scr.queryByText("Hello")).toBeInTheDocument();
    });
  });

  describe("calling the default SwitchLanguage function", () => {
    it("shouldn't throw an exeption", () => {
      const Test: FC = () => {
        return <>{useContext(SwitchLanguageContext)("")}</>;
      };

      render(<Test />);
    });
  });
});
