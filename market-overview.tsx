import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingDown, TrendingUp } from "lucide-react"
import type { MarketData } from "@/lib/types"

interface MarketOverviewProps {
  data: MarketData
}

export function MarketOverview({ data }: MarketOverviewProps) {
  // Overall market state - simple calculation based on gainers vs losers
  const marketState = data.gainers.length > data.losers.length ? "positive" : "negative"

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-0.5">
              <CardTitle className="text-base">Main Index</CardTitle>
              <CardDescription>{data.mainIndex.name}</CardDescription>
            </div>
            {data.mainIndex.change >= 0 ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.mainIndex.value.toFixed(2)}</div>
            <div className={`text-sm ${data.mainIndex.change >= 0 ? "text-green-500" : "text-red-500"}`}>
              {data.mainIndex.change >= 0 ? "+" : ""}
              {data.mainIndex.change.toFixed(2)}%
            </div>
            <div className="mt-4 h-[80px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.mainIndex.chartData}>
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor={data.mainIndex.change >= 0 ? "#faff00" : "#ff0000"}
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor={data.mainIndex.change >= 0 ? "#faff00" : "#ff0000"}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={data.mainIndex.change >= 0 ? "#faff00" : "#ff0000"}
                    fillOpacity={1}
                    fill="url(#colorUv)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Top Gainers</CardTitle>
            <CardDescription>Stocks with highest % gain today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.gainers.slice(0, 3).map((gainer, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{gainer.symbol}</div>
                    <div className="text-xs text-muted-foreground">{gainer.name}</div>
                  </div>
                  <div className="text-green-500 font-medium">+{gainer.change.toFixed(2)}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Top Losers</CardTitle>
            <CardDescription>Stocks with largest % drop today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.losers.slice(0, 3).map((loser, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{loser.symbol}</div>
                    <div className="text-xs text-muted-foreground">{loser.name}</div>
                  </div>
                  <div className="text-red-500 font-medium">{loser.change.toFixed(2)}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sector Performance</CardTitle>
            <CardDescription>Performance by sector today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.sectorPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" tick={{ fill: "#888" }} />
                  <YAxis tickFormatter={(value) => `${value}%`} tick={{ fill: "#888" }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#111", borderColor: "#333" }}
                    formatter={(value: any) => [`${value}%`, "Change"]}
                  />
                  <Bar dataKey="change" fill={(data) => (data.change >= 0 ? "#faff00" : "#ff0000")} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Market Sentiment</CardTitle>
            <CardDescription>Current market mood and indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-6">
              <div className={`text-2xl font-bold ${marketState === "positive" ? "text-green-500" : "text-red-500"}`}>
                {marketState === "positive" ? "Bullish" : "Bearish"}
              </div>
              <div className="text-sm text-muted-foreground">
                Market sentiment is currently {marketState === "positive" ? "optimistic" : "cautious"} with{" "}
                {data.gainers.length} stocks advancing and {data.losers.length} declining.
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <div className="text-sm font-medium">Advance/Decline Ratio</div>
                  <div className="text-sm">{(data.gainers.length / data.losers.length).toFixed(2)}</div>
                </div>
                <div className="bg-secondary h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-highlight h-full"
                    style={{ width: `${(data.gainers.length / (data.gainers.length + data.losers.length)) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <div className="text-sm font-medium">Trading Volume</div>
                  <div className="text-sm">
                    {data.volume >= 1e9 ? `${(data.volume / 1e9).toFixed(2)}B` : `${(data.volume / 1e6).toFixed(2)}M`}
                  </div>
                </div>
                <div className="bg-secondary h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-highlight h-full"
                    style={{ width: `${(data.volume / data.averageVolume) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <div className="text-sm font-medium">Volatility Index</div>
                  <div className="text-sm">{data.volatilityIndex.toFixed(2)}</div>
                </div>
                <div className="bg-secondary h-2 rounded-full overflow-hidden">
                  <div className="bg-highlight h-full" style={{ width: `${(data.volatilityIndex / 50) * 100}%` }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

