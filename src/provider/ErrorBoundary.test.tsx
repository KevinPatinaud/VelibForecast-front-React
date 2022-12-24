import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FC } from "react";
import ErrorBoundary from "./ErrorBoundary";

describe("Error Boundary", () => {
  const original = window.location;

  beforeAll(() => {
    Object.defineProperty(window, "location", {
      configurable: true,
      value: { reload: jest.fn() },
    });
  });

  afterAll(() => {
    Object.defineProperty(window, "location", {
      configurable: true,
      value: original,
    });
  });

  it("mocks reload function", () => {
    expect(jest.isMockFunction(window.location.reload)).toBe(true);
  });

  test("Error Boundary", () => {
    jest.spyOn(console, "error").mockImplementation();

    const ThrowError = () => {
      throw new Error("Test");
    };

    const scr = render(
      <ErrorBoundary
        fallback={<ErrorBoundary children={undefined} fallback={undefined} />}
      >
        <ThrowError />
      </ErrorBoundary>
    );

    expect(scr.getByText("Something went wrong.")).toBeInTheDocument();
    expect(window.location.reload).toHaveBeenCalled();
  });
});
