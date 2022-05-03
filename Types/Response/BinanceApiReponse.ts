export type BinanceAssetType = {
  id: string;
  assetCode: string;
  assetName: string;
  unit: string;
  commissionRate: number;
  freeAuditWithdrawAmt: number;
  freeUserChargeAmount: number;
  createTime: number;
  test: number;
  gas: null;
  isLegalMoney: boolean;
  reconciliationAmount: number;
  seqNum: string;
  chineseName: string;
  cnLink: string;
  enLink: string;
  logoUrl: string;
  fullLogoUrl: string;
  supportMarket: null;
  feeReferenceAsset: null;
  feeRate: null;
  feeDigit: number;
  assetDigit: number;
  trading: boolean;
  tags: string[];
  plateType: string;
  etf: boolean;
  isLedgerOnly: boolean;
  delisted: boolean;
}

export type BinanceApiReponse = BinanceAssetType[]|undefined;

export type TickerType = {
  symbol: string;
  priceChange: string;
  priceChangePercent: string;
  prevClosePrice: string;
  lastPrice: string;
  volume: string;
  quoteVolume: string;
};

export type TickerApiResponse = TickerType[];
