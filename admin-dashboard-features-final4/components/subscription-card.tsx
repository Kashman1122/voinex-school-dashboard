"use client"

import { Card } from "@/components/ui/card"
import { Clock, CheckCircle } from "lucide-react"

interface SubscriptionCardProps {
  subscription: {
    start_date: string
    end_date: string
    days_remaining: number
    is_active: boolean
  }
}

export function SubscriptionCard({ subscription }: SubscriptionCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <Card className="bg-card border border-border p-4 sm:p-6 rounded-xl">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg sm:text-xl font-bold text-foreground">Subscription</h3>
          <div
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${subscription.is_active ? "bg-primary/20" : "bg-red-500/20"}`}
          >
            <CheckCircle size={20} className={subscription.is_active ? "text-primary" : "text-red-500"} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Start Date</p>
            <p className="text-sm font-bold text-foreground">{formatDate(subscription.start_date)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">End Date</p>
            <p className="text-sm font-bold text-foreground">{formatDate(subscription.end_date)}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg border border-primary/20">
          <Clock size={18} className="text-primary flex-shrink-0" />
          <div>
            <p className="text-xs text-muted-foreground">Days Remaining</p>
            <p className="text-lg font-bold text-primary">{subscription.days_remaining} days</p>
          </div>
        </div>

        <div>
          <p
            className={`text-xs sm:text-sm font-semibold inline-flex items-center px-3 py-1 rounded-full ${subscription.is_active ? "bg-primary/20 text-primary" : "bg-red-500/20 text-red-400"}`}
          >
            {subscription.is_active ? "Active" : "Inactive"}
          </p>
        </div>
      </div>
    </Card>
  )
}
