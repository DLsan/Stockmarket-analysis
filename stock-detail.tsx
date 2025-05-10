"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { Calendar, TrendingUp, TrendingDown, Briefcase, Globe, ArrowRight } from "lucide-react"
import type { Stock } from "@/lib/types"
import Link from "next/link"

interface StockDetailProps {
  stock: Stock
}

export function StockDetail({ stock }: StockDetailProps) {
  const [timeRange, setTimeRange] = useState("1M")

  // Mock chart data - in a real app, this would come from an API
  const chartData = [...Array(30)].map((_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (30 - i))

    // Generate a semi-random but trending price
    let basePrice = stock.price - Math.random() * 20
    if (stock.change > 0) {
      basePrice += (i / 30) * (stock.price * 0.1)
    } else {
      basePrice -= (i / 30) * (stock.price * 0.1)
    }

    return {
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      price: basePrice + (Math.random() * 5 - 2.5),
      volume: Math.floor(Math.random() * 10000000) + 500000,
    }
  })

  const keyStats = [
    {
      label: "Previous Close",
      value: `${stock.currency}${(stock.price - (stock.price * stock.change) / 100).toFixed(2)}`,
    },
    { label: "Open", value: `${stock.currency}${(stock.price - Math.random() * 5).toFixed(2)}` },
    {
      label: "Day's Range",
      value: `${stock.currency}${(stock.price - Math.random() * 10).toFixed(2)} - ${stock.currency}${(stock.price + Math.random() * 5).toFixed(2)}`,
    },
    {
      label: "52 Week Range",
      value: `${stock.currency}${(stock.price * 0.7).toFixed(2)} - ${stock.currency}${(stock.price * 1.3).toFixed(2)}`,
    },
    { label: "Volume", value: `${(Math.floor(Math.random() * 10000000) + 500000).toLocaleString()}` },
    { label: "Avg. Volume", value: `${(Math.floor(Math.random() * 15000000) + 1000000).toLocaleString()}` },
    {
      label: "Market Cap",
      value: `${stock.currency}${stock.marketCap >= 1e9 ? `${(stock.marketCap / 1e9).toFixed(2)}B` : `${(stock.marketCap / 1e6).toFixed(2)}M`}`,
    },
    { label: "P/E Ratio", value: `${(Math.random() * 30 + 5).toFixed(2)}` },
    { label: "EPS", value: `${stock.currency}${(stock.price / (Math.random() * 30 + 5)).toFixed(2)}` },
    { label: "Dividend Yield", value: `${(Math.random() * 5).toFixed(2)}%` },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center">
            {stock.name} ({stock.symbol})
            {stock.change >= 0 ? (
              <TrendingUp className="ml-2 h-5 w-5 text-green-500" />
            ) : (
              <TrendingDown className="ml-2 h-5 w-5 text-red-500" />
            )}
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-2xl font-bold">
              {stock.currency}
              {stock.price.toFixed(2)}
            </span>
            <span className={`text-sm font-medium ${stock.change >= 0 ? "text-green-500" : "text-red-500"}`}>
              {stock.change >= 0 ? "+" : ""}
              {stock.change.toFixed(2)}%
            </span>
          </div>
          <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Globe className="mr-1 h-4 w-4" />
              {stock.exchange}
            </div>
            <div className="flex items-center">
              <Calendar className="mx-1 h-4 w-4" />
              {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Briefcase className="mr-2 h-4 w-4" />
            Add to Portfolio
          </Button>
          <Button size="sm" asChild>
            <Link href={`/recommendations?stock=${stock.id}`} className="flex items-center">
              Get Recommendations
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="px-6 pt-6 pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>Stock Price</CardTitle>
            <div className="flex items-center space-x-1.5">
              {["1D", "1W", "1M", "3M", "1Y", "5Y"].map((range) => (
                <Button
                  key={range}
                  variant={timeRange === range ? "default" : "outline"}
                  size="sm"
                  className={`h-7 px-2.5 text-xs ${timeRange === range ? "bg-highlight text-black" : ""}`}
                  onClick={() => setTimeRange(range)}
                >
                  {range}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#faff00" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#faff00" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis
                  dataKey="date"
                  tick={{ fill: "#888" }}
                  tickLine={{ stroke: "#555" }}
                  axisLine={{ stroke: "#444" }}
                />
                <YAxis
                  domain={["auto", "auto"]}
                  tick={{ fill: "#888" }}
                  tickLine={{ stroke: "#555" }}
                  axisLine={{ stroke: "#444" }}
                  tickFormatter={(value) => `${stock.currency}${value.toFixed(0)}`}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: "#111", borderColor: "#333" }}
                  formatter={(value: any) => [`${stock.currency}${Number(value).toFixed(2)}`, "Price"]}
                />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="#faff00"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorPrice)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="stats">Key Stats</TabsTrigger>
          <TabsTrigger value="news">News</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About {stock.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {stock.description ||
                  `${stock.name} (${stock.symbol}) is a leading company in the ${stock.sector} sector. The company has shown ${stock.change >= 0 ? "positive" : "negative"} growth over recent periods and has a market capitalization of ${stock.currency}${stock.marketCap >= 1e9 ? `${(stock.marketCap / 1e9).toFixed(2)} billion` : `${(stock.marketCap / 1e6).toFixed(2)} million`}.`}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h3 className="font-medium mb-2">Sector Information</h3>
                  <p className="text-sm text-muted-foreground">
                    {stock.sector} - {stock.industry}
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Trading Information</h3>
                  <p className="text-sm text-muted-foreground">
                    Listed on {stock.exchange} with daily trading volumes averaging over{" "}
                    {(Math.floor(Math.random() * 15000000) + 1000000).toLocaleString()} shares.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Financial Highlights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-secondary p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground">Revenue (TTM)</div>
                  <div className="text-lg font-bold mt-1">
                    {stock.currency}
                    {(stock.marketCap * (Math.random() * 0.5 + 0.1)).toFixed(2)}B
                  </div>
                </div>

                <div className="bg-secondary p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground">Net Income</div>
                  <div className="text-lg font-bold mt-1">
                    {stock.currency}
                    {(stock.marketCap * (Math.random() * 0.05 + 0.01)).toFixed(2)}B
                  </div>
                </div>

                <div className="bg-secondary p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground">EPS (TTM)</div>
                  <div className="text-lg font-bold mt-1">
                    {stock.currency}
                    {(stock.price / (Math.random() * 30 + 5)).toFixed(2)}
                  </div>
                </div>

                <div className="bg-secondary p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground">Dividend Yield</div>
                  <div className="text-lg font-bold mt-1">{(Math.random() * 5).toFixed(2)}%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Key Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  {keyStats.map((stat, index) => (
                    <TableRow key={index} className="border-0">
                      <TableCell className="text-muted-foreground">{stat.label}</TableCell>
                      <TableCell className="text-right font-medium">{stat.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="news" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent News</CardTitle>
              <CardDescription>Latest news and updates about {stock.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="pb-4 border-b last:border-0">
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-1">
                        <h3 className="font-medium">
                          {
                            [
                              `${stock.name} Reports Q${Math.floor(Math.random() * 4) + 1} Earnings`,
                              `${stock.name} Announces New Product Line`,
                              `Analysts Raise ${stock.name} Price Target`,
                              `${stock.name} Expands into New Markets`,
                              `${stock.name} CEO Discusses Future Growth Plans`,
                            ][i]
                          }
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {
                            [
                              `The company reported strong earnings, beating analyst expectations by 15%.`,
                              `The new product line is expected to boost revenue by up to 20% next year.`,
                              `Several analysts have raised their price targets following positive performance.`,
                              `The expansion into new markets is part of the company's growth strategy.`,
                              `The CEO outlined plans for sustainable growth over the next five years.`,
                            ][i]
                          }
                        </p>
                      </div>
                      <div className="text-xs text-muted-foreground whitespace-nowrap">
                        {new Date(Date.now() - i * 86400000).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

