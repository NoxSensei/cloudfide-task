export interface RawAggregatedTrade {
  // Aggregate tradeId
  a: number;

  // Price
  p: string;

  // Quantity
  q: string;

  // First tradeId
  f: number;

  // Last tradeId
  l: number;

  // Timestamp
  T: number;

  // Was the buyer the maker?
  m: boolean;

  // Was the trade the best price match
  M: boolean;
}
