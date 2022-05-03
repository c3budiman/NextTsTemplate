/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from "react";
import { render, screen } from "@testing-library/react";
import MatchMediaMock from "jest-matchmedia-mock";
import HeaderOur from "../../Components/Global/Header";

let matchMedia: MatchMediaMock;

describe("Home", () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
    // i disabled this because unrelated router error
    // if some test are failing u can comment this line :
    jest.spyOn(console, "warn").mockImplementation(() => {});
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    matchMedia.clear();
  });

  it("Renders a Header Without Session", () => {
    const HeaderComp = render(<HeaderOur session={{ code: "-1" }} />);
    const headerLoginCTA = HeaderComp.container.querySelector("#login-CTA")?.innerHTML;
    expect(headerLoginCTA).toBe("Sign In");
  });

  it("Renders a Header With Session", () => {
    const name = "Cecep Budiman";
    const HeaderComp = render(
      <HeaderOur session={{ code: 0, data: { name } }} />
    );
    const headerUser = HeaderComp.container.querySelector("#headerPeopleName")?.innerHTML;
    expect(headerUser).toBe(name);
  });
});
