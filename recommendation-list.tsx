import { TrendingDown, TrendingUp, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { RecommendationResult } from "@/lib/types"
import Link from "next/link"

interface RecommendationListProps {
  recommendations: RecommendationResult
}

export function RecommendationList({ recommendations }: RecommendationListProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Recommended Stocks</h2>
        <p className="text-sm text-muted-foreground">
          {recommendations.stocks.length} stocks selected out of {recommendations.totalStocksAnalyzed}
        </p>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Symbol</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Allocation</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Current Price</TableHead>
              <TableHead className="text-right">Expected Return</TableHead>
              <TableHead className="text-right">Risk Score</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recommendations.stocks.map((item) => (
              <TableRow key={item.stock.id}>
                <TableCell className="font-medium">{item.stock.symbol}</TableCell>
                <TableCell>{item.stock.name}</TableCell>
                <TableCell className="text-right">{(item.allocation * 100).toFixed(1)}%</TableCell>
                <TableCell className="text-right font-mono">
                  {item.stock.currency}
                  {item.amount.toLocaleString()}
                </TableCell>
                <TableCell className="text-right font-mono">
                  {item.stock.currency}
                  {item.stock.price.toFixed(2)}
                </TableCell>
                <TableCell className="text-right">
                  <span
                    className={`flex items-center justify-end ${
                      item.expectedReturn >= 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {item.expectedReturn >= 0 ? (
                      <TrendingUp className="mr-1 h-4 w-4" />
                    ) : (
                      <TrendingDown className="mr-1 h-4 w-4" />
                    )}
                    {(item.expectedReturn * 100).toFixed(2)}%
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="flex items-center justify-end w-full">
                        <div className="flex items-center gap-1">
                          {item.riskScore.toFixed(1)}
                          <Info className="h-3 w-3 text-muted-foreground" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">Risk score from 1 (low) to 10 (high)</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell className="text-right">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/analysis?id=${item.stock.id}`}>View</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

