"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, Search, TrendingDown, TrendingUp } from "lucide-react"
import type { Stock } from "@/lib/types"

interface StockListProps {
  stocks: Stock[]
  onSelectStock: (stock: Stock) => void
  selectedStockId?: string
}

export function StockList({ stocks, onSelectStock, selectedStockId }: StockListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<{ column: keyof Stock; direction: "asc" | "desc" }>({
    column: "symbol",
    direction: "asc",
  })

  const filteredStocks = stocks.filter(
    (stock) =>
      stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const sortedStocks = [...filteredStocks].sort((a, b) => {
    const aValue = a[sortBy.column]
    const bValue = b[sortBy.column]

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortBy.direction === "asc" ? aValue - bValue : bValue - aValue
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortBy.direction === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    return 0
  })

  const handleSort = (column: keyof Stock) => {
    if (sortBy.column === column) {
      setSortBy({
        column,
        direction: sortBy.direction === "asc" ? "desc" : "asc",
      })
    } else {
      setSortBy({
        column,
        direction: "asc",
      })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search stocks by name or symbol..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">
                <Button variant="ghost" size="sm" onClick={() => handleSort("symbol")}>
                  Symbol
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" size="sm" onClick={() => handleSort("name")}>
                  Name
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button variant="ghost" size="sm" onClick={() => handleSort("price")}>
                  Price
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button variant="ghost" size="sm" onClick={() => handleSort("change")}>
                  Change
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button variant="ghost" size="sm" onClick={() => handleSort("marketCap")}>
                  Market Cap
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedStocks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                  No stocks found matching your search
                </TableCell>
              </TableRow>
            ) : (
              sortedStocks.map((stock) => (
                <TableRow
                  key={stock.id}
                  className={`cursor-pointer transition-colors ${stock.id === selectedStockId ? "bg-muted/50" : ""}`}
                  onClick={() => onSelectStock(stock)}
                >
                  <TableCell className="font-medium">{stock.symbol}</TableCell>
                  <TableCell>{stock.name}</TableCell>
                  <TableCell className="text-right font-mono">
                    {stock.currency}
                    {stock.price.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    <span
                      className={`flex items-center justify-end ${
                        stock.change >= 0 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {stock.change >= 0 ? (
                        <TrendingUp className="mr-1 h-4 w-4" />
                      ) : (
                        <TrendingDown className="mr-1 h-4 w-4" />
                      )}
                      {Math.abs(stock.change).toFixed(2)}%
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    {stock.marketCap >= 1e9
                      ? `${(stock.marketCap / 1e9).toFixed(2)}B`
                      : `${(stock.marketCap / 1e6).toFixed(2)}M`}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

