// {
//     "e": "24hrMiniTicker",  // Event type
//     "E": 123456789,         // Event time
//     "s": "BNBBTC",          // Symbol
//     "c": "0.0025",          // Close price
//     "o": "0.0010",          // Open price
//     "h": "0.0025",          // High price
//     "l": "0.0010",          // Low price
//     "v": "10000",           // Total traded base asset volume
//     "q": "18"               // Total traded quote asset volume
// }

export type DataTickerWsType = {
    e: string;
    E: number;
    s: string;
    c: string;
    o: string;
    h: string;
    l: string;
    v: string;
    q: string;
};
