"use client"

import * as React from "react"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"

interface CalendarToggleProps {
  month: number
  year: number
  onMonthChange: (month: number) => void
  onYearChange: (year: number) => void
  minYear?: number
  maxYear?: number
}

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

export function CalendarToggle({
  month,
  year,
  onMonthChange,
  onYearChange,
  minYear = 1970,
  maxYear = new Date().getFullYear() + 20,
}: CalendarToggleProps) {
  const years = React.useMemo(() => {
    const arr = []
    for (let y = minYear; y <= maxYear; y++) arr.push(y)
    return arr
  }, [minYear, maxYear])

  return (
    <div className="flex items-center gap-2">
      <Select value={month.toString()} onValueChange={v => onMonthChange(Number(v))}>
        <SelectTrigger className="w-28">
          <SelectValue>{monthNames[month]}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {monthNames.map((name, idx) => (
            <SelectItem key={name} value={idx.toString()}>{name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={year.toString()} onValueChange={v => onYearChange(Number(v))}>
        <SelectTrigger className="w-20">
          <SelectValue>{year}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {years.map(y => (
            <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}