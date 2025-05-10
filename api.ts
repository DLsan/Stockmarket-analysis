import type { Stock, MarketData } from "./types"

// Mock data for demo purposes
// In a real app, this would be replaced with actual API calls

export async function fetchStockData(market = "india"): Promise<Stock[]> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Sample data for different markets
  const stocksByMarket: Record<string, Stock[]> = {
    india: [
      {
        id: "reliance",
        symbol: "RELIANCE",
        name: "Reliance Industries",
        price: 2587.45,
        change: 1.27,
        marketCap: 1750000000000,
        exchange: "NSE",
        currency: "₹",
        sector: "Energy",
        industry: "Oil & Gas",
      },
      {
        id: "tcs",
        symbol: "TCS",
        name: "Tata Consultancy Services",
        price: 3456.7,
        change: -0.89,
        marketCap: 1260000000000,
        exchange: "NSE",
        currency: "₹",
        sector: "Technology",
        industry: "IT Services",
      },
      {
        id: "hdfcbank",
        symbol: "HDFCBANK",
        name: "HDFC Bank",
        price: 1678.3,
        change: 0.45,
        marketCap: 930000000000,
        exchange: "NSE",
        currency: "₹",
        sector: "Financial Services",
        industry: "Banking",
      },
      {
        id: "infy",
        symbol: "INFY",
        name: "Infosys",
        price: 1478.6,
        change: -1.32,
        marketCap: 635000000000,
        exchange: "NSE",
        currency: "₹",
        sector: "Technology",
        industry: "IT Services",
      },
      {
        id: "icicibank",
        symbol: "ICICIBANK",
        name: "ICICI Bank",
        price: 945.2,
        change: 0.78,
        marketCap: 680000000000,
        exchange: "NSE",
        currency: "₹",
        sector: "Financial Services",
        industry: "Banking",
      },
      {
        id: "hul",
        symbol: "HUL",
        name: "Hindustan Unilever",
        price: 2576.45,
        change: -0.32,
        marketCap: 590000000000,
        exchange: "NSE",
        currency: "₹",
        sector: "Consumer Goods",
        industry: "FMCG",
      },
      {
        id: "bajfinance",
        symbol: "BAJFINANCE",
        name: "Bajaj Finance",
        price: 6783.25,
        change: 1.56,
        marketCap: 410000000000,
        exchange: "NSE",
        currency: "₹",
        sector: "Financial Services",
        industry: "NBFC",
      },
      {
        id: "bhartiartl",
        symbol: "BHARTIARTL",
        name: "Bharti Airtel",
        price: 865.9,
        change: 0.23,
        marketCap: 490000000000,
        exchange: "NSE",
        currency: "₹",
        sector: "Communication",
        industry: "Telecom",
      },
      {
        id: "asianpaint",
        symbol: "ASIANPAINT",
        name: "Asian Paints",
        price: 3245.75,
        change: -1.05,
        marketCap: 310000000000,
        exchange: "NSE",
        currency: "₹",
        sector: "Consumer Goods",
        industry: "Paints",
      },
      {
        id: "maruti",
        symbol: "MARUTI",
        name: "Maruti Suzuki",
        price: 9876.3,
        change: 2.14,
        marketCap: 295000000000,
        exchange: "NSE",
        currency: "₹",
        sector: "Automobile",
        industry: "Passenger Vehicles",
      },
    ],
    us: [
      {
        id: "aapl",
        symbol: "AAPL",
        name: "Apple Inc.",
        price: 187.32,
        change: 1.43,
        marketCap: 2950000000000,
        exchange: "NASDAQ",
        currency: "$",
        sector: "Technology",
        industry: "Consumer Electronics",
      },
      {
        id: "msft",
        symbol: "MSFT",
        name: "Microsoft Corporation",
        price: 415.5,
        change: 0.78,
        marketCap: 3100000000000,
        exchange: "NASDAQ",
        currency: "$",
        sector: "Technology",
        industry: "Software",
      },
      {
        id: "googl",
        symbol: "GOOGL",
        name: "Alphabet Inc.",
        price: 152.78,
        change: -0.54,
        marketCap: 1920000000000,
        exchange: "NASDAQ",
        currency: "$",
        sector: "Technology",
        industry: "Internet Content & Services",
      },
      {
        id: "amzn",
        symbol: "AMZN",
        name: "Amazon.com Inc.",
        price: 178.42,
        change: 1.23,
        marketCap: 1850000000000,
        exchange: "NASDAQ",
        currency: "$",
        sector: "Consumer Cyclical",
        industry: "Internet Retail",
      },
      {
        id: "nvda",
        symbol: "NVDA",
        name: "NVIDIA Corporation",
        price: 925.75,
        change: 2.87,
        marketCap: 2280000000000,
        exchange: "NASDAQ",
        currency: "$",
        sector: "Technology",
        industry: "Semiconductors",
      },
      {
        id: "meta",
        symbol: "META",
        name: "Meta Platforms Inc.",
        price: 485.39,
        change: 0.93,
        marketCap: 1240000000000,
        exchange: "NASDAQ",
        currency: "$",
        sector: "Technology",
        industry: "Internet Content & Services",
      },
      {
        id: "tsla",
        symbol: "TSLA",
        name: "Tesla, Inc.",
        price: 178.82,
        change: -1.76,
        marketCap: 570000000000,
        exchange: "NASDAQ",
        currency: "$",
        sector: "Consumer Cyclical",
        industry: "Auto Manufacturers",
      },
      {
        id: "v",
        symbol: "V",
        name: "Visa Inc.",
        price: 275.96,
        change: 0.32,
        marketCap: 560000000000,
        exchange: "NYSE",
        currency: "$",
        sector: "Financial Services",
        industry: "Credit Services",
      },
      {
        id: "jpm",
        symbol: "JPM",
        name: "JPMorgan Chase & Co.",
        price: 195.15,
        change: 0.87,
        marketCap: 560000000000,
        exchange: "NYSE",
        currency: "$",
        sector: "Financial Services",
        industry: "Banks",
      },
      {
        id: "wmt",
        symbol: "WMT",
        name: "Walmart Inc.",
        price: 59.85,
        change: 0.45,
        marketCap: 480000000000,
        exchange: "NYSE",
        currency: "$",
        sector: "Consumer Defensive",
        industry: "Discount Stores",
      },
    ],
    europe: [
      // Europe market data would go here in a real app
      {
        id: "nesn",
        symbol: "NESN",
        name: "Nestlé S.A.",
        price: 95.42,
        change: 0.23,
        marketCap: 258000000000,
        exchange: "SIX",
        currency: "CHF",
        sector: "Consumer Defensive",
        industry: "Packaged Foods",
      },
      {
        id: "asml",
        symbol: "ASML",
        name: "ASML Holding N.V.",
        price: 874.1,
        change: 1.56,
        marketCap: 345000000000,
        exchange: "Euronext",
        currency: "€",
        sector: "Technology",
        industry: "Semiconductor Equipment",
      },
    ],
    asia: [
      // Asia market data would go here in a real app
      {
        id: "005930",
        symbol: "005930",
        name: "Samsung Electronics Co., Ltd.",
        price: 72800,
        change: 0.69,
        marketCap: 435000000000000,
        exchange: "KRX",
        currency: "₩",
        sector: "Technology",
        industry: "Consumer Electronics",
      },
      {
        id: "9988",
        symbol: "9988",
        name: "Alibaba Group Holding Limited",
        price: 72.35,
        change: -0.83,
        marketCap: 1480000000000,
        exchange: "HKEX",
        currency: "HK$",
        sector: "Consumer Cyclical",
        industry: "Internet Retail",
      },
    ],
  }

  return stocksByMarket[market] || stocksByMarket.india
}

export async function fetchMarketOverview(market = "india"): Promise<MarketData> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Generate mock market data based on the selected market
  const mainIndexData = {
    india: {
      name: "NIFTY 50",
      value: 22458.75,
      change: 0.87,
    },
    us: {
      name: "S&P 500",
      value: 5246.18,
      change: 0.45,
    },
    europe: {
      name: "STOXX 600",
      value: 510.24,
      change: -0.32,
    },
    asia: {
      name: "NIKKEI 225",
      value: 38500.58,
      change: 1.23,
    },
  }

  const mainIndex = mainIndexData[market as keyof typeof mainIndexData] || mainIndexData.india

  // Generate random chart data for main index
  const chartData = [...Array(20)].map((_, i) => {
    const baseValue = mainIndex.value - mainIndex.value * 0.05
    const trend = mainIndex.change >= 0 ? 1 : -1
    return {
      time: `${i + 1}:00`,
      value: baseValue + trend * (i / 20) * mainIndex.value * 0.05 + Math.random() * mainIndex.value * 0.01,
    }
  })

  // Get stock data for this market to generate gainers and losers
  const stocks = await fetchStockData(market)

  // Sort stocks by change percentage to get gainers and losers
  const sortedStocks = [...stocks].sort((a, b) => b.change - a.change)

  const gainers = sortedStocks.slice(0, 5).map((stock) => ({
    symbol: stock.symbol,
    name: stock.name,
    change: stock.change,
  }))

  const losers = sortedStocks
    .slice(-5)
    .reverse()
    .map((stock) => ({
      symbol: stock.symbol,
      name: stock.name,
      change: stock.change,
    }))

  // Generate sector performance data
  const sectors = [
    "Technology",
    "Financial Services",
    "Healthcare",
    "Consumer Cyclical",
    "Communication Services",
    "Industrials",
    "Energy",
  ]

  const sectorPerformance = sectors.map((name) => ({
    name,
    change: Math.random() * 6 - 3,
  }))

  return {
    mainIndex: {
      ...mainIndex,
      chartData,
    },
    gainers,
    losers,
    sectorPerformance,
    volume: Math.floor(Math.random() * 9000000000) + 1000000000,
    averageVolume: Math.floor(Math.random() * 8000000000) + 2000000000,
    volatilityIndex: Math.random() * 30 + 10,
  }
}

