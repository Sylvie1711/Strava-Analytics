"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { ChevronDown } from "lucide-react"

interface YearSelectorProps {
  selectedYear: string
  onYearChange: (year: string) => void
}

export function YearSelector({ selectedYear, onYearChange }: YearSelectorProps) {
  const currentYear = new Date().getFullYear()
  const years = []
  
  // Generate list of years from current year back to 2020
  for (let year = currentYear; year >= 2020; year--) {
    years.push(year.toString())
  }

  return (
    <Card className="border-border bg-card p-4">
      <div className="flex items-center gap-4">
        <label htmlFor="year-select" className="text-sm font-medium text-muted-foreground">
          Year:
        </label>
        <div className="relative">
          <select
            id="year-select"
            value={selectedYear}
            onChange={(e) => onYearChange(e.target.value)}
            className="appearance-none bg-background border border-border rounded-md px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>
      </div>
    </Card>
  )
}
