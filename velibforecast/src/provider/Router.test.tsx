import { render } from "@testing-library/react";
import RouterProvider from "./Router";

describe("<RouterProvider>", () => {
  describe("when is rendered", () => {
    it("should be displayed", () => {
      const scr = render(
        <RouterProvider>
          <>Hello</>
        </RouterProvider>
      );

      expect(scr.getByText("Hello")).toBeInTheDocument();
    });
  });
});
