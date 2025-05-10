import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import type { RecommendationResult } from "@/lib/types"

interface RecommendationChartProps {
  recommendations: RecommendationResult
}

export function RecommendationChart({ recommendations }: RecommendationChartProps) {
  // Generate custom colors for the chart (fluorescent yellow to darker shades)
  const baseColor = "#faff00"
  const COLORS = recommendations.stocks.map((_, index) => {
    const opacity = 1 - (index * 0.6) / recommendations.stocks.length
    return `rgba(250, 255, 0, ${opacity})`
  })

  const data = recommendations.stocks.map((item) => ({
    name: item.stock.symbol,
    value: item.amount,
    allocation: (item.allocation * 100).toFixed(1),
  }))

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/90 border border-white/10 p-3 rounded-lg shadow-lg">
          <p className="font-bold">{payload[0].name}</p>
          <p className="text-sm">{`Amount: ${payload[0].payload.allocation}%`}</p>
          <p className="text-sm">{`Amount: $${payload[0].value.toLocaleString()}`}</p>
        </div>
      )
    }

    return null
  }

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={120}
            paddingAngle={2}
            dataKey="value"
            nameKey="name"
            label={({ name, allocation }) => `${name} (${allocation}%)`}
            labelLine={{ stroke: "#666" }}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend layout="horizontal" verticalAlign="bottom" align="center" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

