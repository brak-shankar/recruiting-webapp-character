import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

describe("App", () => {
    it("renders RPG Character Sheet in header", () => {
        const { getByRole, getByText } = render(<App />);
        const header = getByRole("banner");
        expect(getByText("RPG Character Sheet")).toBeInTheDocument();
        expect(header).toContainHTML("RPG Character Sheet");
    });

    it("renders CharacterSheet component", () => {
        const { getByText } = render(<App />);
        expect(getByText("Character Sheet")).toBeInTheDocument();
    });
});