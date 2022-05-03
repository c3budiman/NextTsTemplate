export type USDValueDataType = {
  id: string;
  name: string;
  symbol: string;
  logoUrl: string;
  hasUsdValue: boolean;
  priceInUSD: string;
  change24hPercentageInUSD: string;
  blinking: "red" | "green" | "none";
  volume24Hour: string;
  tags: string[];
  otherTradingPair: string[];
  ticker: any[] | undefined;
};

export type AllCrytoTabDataType = USDValueDataType[];
