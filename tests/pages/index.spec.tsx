/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from "react";
import { render, screen } from "@testing-library/react";
import MatchMediaMock from "jest-matchmedia-mock";
import HeaderOur from "../../Components/Global/Header";
import MarketListing from "../../Components/Home/Table/MarketListing";
import { TestingData } from "../../Configs/TestingData";

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

  it("Renders the market table", async () => {
    const marketComp = render(
      <MarketListing
        errorState={false}
        loadingState={false}
        readyState
        data={TestingData}
        setData={() => {}}
      />
    );
    // marketComp.debug(undefined, 300000);
    const test = await marketComp.getAllByTestId("assetName");
    // test data has 2 data, one is btc, and one is ftm.
    // so if it was rendered correctly, it shall output 2 cell column.
    expect(test?.length > 0).toBe(true);
    expect(test[0].innerHTML).toBe("BTC");
    expect(test[1].innerHTML).toBe("Fantom");
  });
});
