import { USDValueDataType } from "../Types/MarketTabs/AllCryptoType";

// eslint-disable-next-line import/prefer-default-export
export const TestingData:USDValueDataType[] = [
  {
    id: "1",
    name: "BTC",
    symbol: "BTC",
    logoUrl: "https://c4budiman.com/cryptoLogo/download/BTC.png",
    hasUsdValue: true,
    priceInUSD: "44000",
    change24hPercentageInUSD: "-1.23",
    blinking: "none",
    volume24Hour: "10000000",
    tags: ["pow", "mining-zone"],
    otherTradingPair: [],
    ticker: [],
  },
  {
    id: "2",
    name: "Fantom",
    symbol: "FTM",
    logoUrl: "https://c4budiman.com/cryptoLogo/download/FTM.png",
    hasUsdValue: true,
    priceInUSD: "300",
    change24hPercentageInUSD: "1.23",
    blinking: "green",
    volume24Hour: "1000000",
    tags: ["pow", "mining-zone"],
    otherTradingPair: [],
    ticker: [],
  },
];
