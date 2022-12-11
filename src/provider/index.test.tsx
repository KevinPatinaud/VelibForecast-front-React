import { render } from "@testing-library/react";
import AppProviders from ".";

describe("<RouterProvider>", () => {
  describe("when is rendered", () => {
    it("should be displayed", () => {
      const scr = render(
        <AppProviders>
          <>Hello</>
        </AppProviders>
      );

      expect(scr.getByText("Hello")).toBeInTheDocument();
    });
  });
});
