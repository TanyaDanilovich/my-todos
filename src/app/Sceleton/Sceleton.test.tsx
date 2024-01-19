import { render } from "@testing-library/react";
import { Sceleton } from "./Sceleton";

describe("Sceleton component", () => {
  it("render without error", () => {
    render(<Sceleton />);
    //expect().toBeInTheDocument();
  });
});
