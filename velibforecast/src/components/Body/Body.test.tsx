import { render } from "@testing-library/react";
import Body from "./Body";

describe("<Body/>", () => {
  describe("When the body is rendered", () => {
    it("should display title", () => {
      const rendered = render(
        <Body>
          <div>my content</div>
        </Body>
      );
      expect(rendered.getAllByText("my content")).toBeInTheDocument;
    });
  });
});
