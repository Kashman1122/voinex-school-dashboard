"use client"

import { Card } from "@/components/ui/card"
import { Zap } from "lucide-react"

interface AIService {
  name: string
  remaining: number
  total: number
  usage: number
}

const aiServices: AIService[] = [
  { name: "Project Builder", remaining: 4500, total: 10000, usage: 5500 },
  { name: "Damini AI", remaining: 2300, total: 5000, usage: 2700 },
]

export function AIUsageStatistics() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-xl sm:text-2xl font-bold text-foreground">AI Usage Statistics</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {aiServices.map((service) => {
          const usagePercent = (service.usage / service.total) * 100
          const remainingPercent = (service.remaining / service.total) * 100

          return (
            <Card key={service.name} className="bg-card border border-border p-4 sm:p-6 rounded-xl space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap size={18} className="text-primary sm:w-5 sm:h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm sm:text-base text-foreground truncate">{service.name}</p>
                    <p className="text-xs text-muted-foreground">AI Tool</p>
                  </div>
                </div>
                <span className="text-lg sm:text-2xl font-bold text-primary flex-shrink-0">
                  {service.remaining.toLocaleString()}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-muted-foreground">Remaining Hits</span>
                  <span className="text-foreground font-medium">{remainingPercent.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-input rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                    style={{ width: `${remainingPercent}%` }}
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-border grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Used</p>
                  <p className="text-base sm:text-lg font-bold text-foreground">{service.usage.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Total</p>
                  <p className="text-base sm:text-lg font-bold text-foreground">{service.total.toLocaleString()}</p>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
