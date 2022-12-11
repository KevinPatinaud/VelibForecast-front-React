import { render, screen, waitFor } from "@testing-library/react";
import InformationModal from "./InformationModal";

describe("<InformationModal/>", () => {
  describe("when the timer expire", () => {
    it("should close the modal", async () => {
      render(<InformationModal message={"Hello"} timeToDisplay={1} />);
      expect(screen.queryByText("Hello")).toBeInTheDocument();

      await waitFor(() =>
        expect(screen.queryByText("Hello")).not.toBeInTheDocument()
      );
    });

    it("should close the modal and execute the onClose function if exist", async () => {
      const onClose = jest.fn();

      render(
        <InformationModal
          message={"Hello"}
          onClose={onClose}
          timeToDisplay={1}
        />
      );
      expect(screen.queryByText("Hello")).toBeInTheDocument();

      await waitFor(() => expect(onClose).toHaveBeenCalled);
      await waitFor(() =>
        expect(screen.queryByText("Hello")).not.toBeInTheDocument()
      );
    });
  });
});
