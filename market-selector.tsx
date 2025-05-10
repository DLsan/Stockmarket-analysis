"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface MarketSelectorProps {
  value: string
  onChange: (value: string) => void
}

export function MarketSelector({ value, onChange }: MarketSelectorProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Market" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="india">Indian Markets</SelectItem>
        <SelectItem value="us">US Markets</SelectItem>
        <SelectItem value="europe">European Markets</SelectItem>
        <SelectItem value="asia">Asian Markets</SelectItem>
      </SelectContent>
    </Select>
  )
}

