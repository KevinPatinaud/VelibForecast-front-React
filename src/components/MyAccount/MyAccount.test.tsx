import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import wrapper from "../../helper/test-context-builder";
import MyAccount from "./MyAccount";

describe("<MyAccount/>", () => {
  describe("when is rendered and mouse hover and exit", () => {
    it("should display icon", async () => {
      const scr = render(<MyAccount />, { wrapper });
      expect(screen.getByTestId("div_MyAccount")).toBeInTheDocument();

      userEvent.hover(screen.getByTestId("div_MyAccount"));

      expect(scr.queryByText("Créer un compte")).toBeInTheDocument();

      userEvent.unhover(screen.getByTestId("div_MyAccount"));

      expect(scr.queryByText("Créer un compte")).not.toBeInTheDocument();
    });
  });
});
