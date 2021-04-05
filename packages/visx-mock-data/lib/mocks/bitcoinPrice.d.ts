export interface BitcoinPrice {
    price: string;
    time: string;
}
export interface BitcoinPrices {
    currency: string;
    prices: BitcoinPrice[];
}
declare const bitcoinPrice: BitcoinPrices;
export default bitcoinPrice;
//# sourceMappingURL=bitcoinPrice.d.ts.map