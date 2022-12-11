import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MyAccount from "./MyAccount";

describe("<MyAccount/>", () => {
  describe("when is rendered and mouse hover and exit", () => {
    it("should display icon", async () => {
      const scr = render(<MyAccount />);
      expect(screen.getByTestId("div_MyAccount")).toBeInTheDocument();

      userEvent.hover(screen.getByTestId("div_MyAccount"));

      expect(scr.queryByText("Créer un compte")).toBeInTheDocument();

      userEvent.unhover(screen.getByTestId("div_MyAccount"));

      expect(scr.queryByText("Créer un compte")).not.toBeInTheDocument();
    });
  });
});
