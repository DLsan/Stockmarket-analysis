"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarketSelector } from "@/components/market-selector"
import { StockList } from "@/components/stock-list"
import { StockDetail } from "@/components/stock-detail"
import { MarketOverview } from "@/components/market-overview"
import { Button } from "@/components/ui/button"
import { ArrowRightCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { fetchStockData, fetchMarketOverview } from "@/lib/api"
import type { Stock, MarketData } from "@/lib/types"

export default function AnalysisPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [market, setMarket] = useState("india")
  const [loading, setLoading] = useState(true)
  const [stocks, setStocks] = useState<Stock[]>([])
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null)
  const [marketData, setMarketData] = useState<MarketData | null>(null)

  const stockId = searchParams.get("id")

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      try {
        // In a real app, we would pass the market parameter to the API
        const stocksData = await fetchStockData(market)
        const marketOverview = await fetchMarketOverview(market)

        setStocks(stocksData)
        setMarketData(marketOverview)

        if (stockId) {
          const stock = stocksData.find((s) => s.id === stockId)
          if (stock) setSelectedStock(stock)
        }
      } catch (error) {
        console.error("Failed to load stock data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [market, stockId])

  const handleMarketChange = (value: string) => {
    setMarket(value)
    setSelectedStock(null)
    router.push("/analysis")
  }

  const handleStockSelect = (stock: Stock) => {
    setSelectedStock(stock)
    router.push(`/analysis?id=${stock.id}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-4xl font-bold">
            Market <span className="highlight">Analysis</span>
          </h1>
          <MarketSelector value={market} onChange={handleMarketChange} />
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-[50vh]">
            <Loader2 className="h-8 w-8 animate-spin text-highlight" />
          </div>
        ) : (
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Market Overview</TabsTrigger>
              <TabsTrigger value="stocks">Stocks</TabsTrigger>
              {selectedStock && <TabsTrigger value="detail">{selectedStock.symbol}</TabsTrigger>}
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              {marketData && <MarketOverview data={marketData} />}

              <div className="flex justify-end mt-8">
                <Button asChild>
                  <Link href="/recommendations" className="flex items-center gap-2">
                    Get Recommendations
                    <ArrowRightCircle className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="stocks">
              <StockList stocks={stocks} onSelectStock={handleStockSelect} selectedStockId={selectedStock?.id} />
            </TabsContent>

            {selectedStock && (
              <TabsContent value="detail">
                <StockDetail stock={selectedStock} />
              </TabsContent>
            )}
          </Tabs>
        )}
      </div>
    </div>
  )
}

