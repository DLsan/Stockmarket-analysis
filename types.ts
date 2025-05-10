export interface Stock {
  id: string
  symbol: string
  name: string
  price: number
  change: number
  marketCap: number
  exchange: string
  currency: string
  sector: string
  industry: string
  description?: string
}

export interface MarketData {
  mainIndex: {
    name: string
    value: number
    change: number
    chartData: { time: string; value: number }[]
  }
  gainers: {
    symbol: string
    name: string
    change: number
  }[]
  losers: {
    symbol: string
    name: string
    change: number
  }[]
  sectorPerformance: {
    name: string
    change: number
  }[]
  volume: number
  averageVolume: number
  volatilityIndex: number
}

export interface RecommendationParams {
  stocks: Stock[]
  investmentAmount: number
  riskTolerance: number
  timePeriod: string
}

export interface StockAllocation {
  stock: Stock
  allocation: number
  amount: number
  expectedReturn: number
  riskScore: number
}

export interface RecommendationResult {
  stocks: StockAllocation[]
  expectedReturn: number
  riskScore: number
  totalInvested: number
  totalStocksAnalyzed: number
}

