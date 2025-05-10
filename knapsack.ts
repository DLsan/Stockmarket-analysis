import type { RecommendationParams, RecommendationResult, StockAllocation } from "./types"

// Simplified greedy knapsack algorithm implementation for stock recommendations
export async function getRecommendations(params: RecommendationParams): Promise<RecommendationResult> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  const { stocks, investmentAmount, riskTolerance, timePeriod } = params

  // Calculate expected returns and risk scores for each stock
  // In a real app, these would come from actual market data and analysis
  const stocksWithMetrics = stocks.map((stock) => {
    // Generate expected returns based on time period
    // In a real app, these would be based on actual analysis
    let expectedReturn = 0
    let riskScore = 0

    // Add some randomization but keep it somewhat realistic
    switch (timePeriod) {
      case "short":
        // Short term is more volatile
        expectedReturn = Math.random() * 0.4 - 0.2 + stock.change / 100 // -20% to +20% plus current trend
        riskScore = Math.random() * 4 + 6 // 6-10 risk score for short term
        break
      case "medium":
        // Medium term is more balanced
        expectedReturn = Math.random() * 0.3 - 0.1 + stock.change / 200 // -10% to +20% plus half of current trend
        riskScore = Math.random() * 5 + 3 // 3-8 risk score for medium term
        break
      case "long":
        // Long term favors fundamentals
        expectedReturn = Math.random() * 0.25 + 0.05 // 5% to 30% positive returns
        riskScore = Math.random() * 5 + 1 // 1-6 risk score for long term
        break
      default:
        expectedReturn = Math.random() * 0.2 // 0-20% returns
        riskScore = Math.random() * 10 // 0-10 risk score
    }

    // Adjust expected return based on risk tolerance
    // Conservative investors get lower but more certain returns
    if (riskTolerance < 0.3) {
      expectedReturn = Math.min(expectedReturn, 0.15)
      riskScore = Math.min(riskScore, 5)
    }
    // Aggressive investors get potentially higher but riskier returns
    else if (riskTolerance > 0.7) {
      expectedReturn = Math.max(expectedReturn, 0.05)
    }

    return {
      stock,
      expectedReturn,
      riskScore,
    }
  })

  // Calculate a value/risk ratio for each stock
  const stocksWithRatio = stocksWithMetrics.map((item) => ({
    ...item,
    valueRiskRatio: (item.expectedReturn + 0.2) / (item.riskScore / 10), // Adding 0.2 to avoid negative ratios
  }))

  // Sort stocks by value/risk ratio (greedy algorithm approach)
  const sortedStocks = [...stocksWithRatio].sort((a, b) => b.valueRiskRatio - a.valueRiskRatio)

  // Determine how many stocks to include based on risk tolerance
  // Higher risk tolerance means fewer stocks (more concentrated portfolio)
  const numStocks = Math.max(3, Math.min(10, Math.round(10 - riskTolerance * 5)))

  // Select the top N stocks
  const selectedStocks = sortedStocks.slice(0, numStocks)

  // Allocate investment amounts based on value/risk ratio
  const totalRatio = selectedStocks.reduce((sum, item) => sum + item.valueRiskRatio, 0)

  const allocations: StockAllocation[] = selectedStocks.map((item) => {
    const allocation = item.valueRiskRatio / totalRatio
    return {
      stock: item.stock,
      allocation,
      amount: Math.round(investmentAmount * allocation),
      expectedReturn: item.expectedReturn,
      riskScore: item.riskScore,
    }
  })

  // Calculate portfolio metrics
  const totalInvested = allocations.reduce((sum, item) => sum + item.amount, 0)
  const weightedReturn = allocations.reduce((sum, item) => sum + item.expectedReturn * item.allocation, 0)
  const weightedRisk = allocations.reduce((sum, item) => sum + item.riskScore * item.allocation, 0)

  return {
    stocks: allocations,
    expectedReturn: weightedReturn,
    riskScore: weightedRisk,
    totalInvested,
    totalStocksAnalyzed: stocks.length,
  }
}

