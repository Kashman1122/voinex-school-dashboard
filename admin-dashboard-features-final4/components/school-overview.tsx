"use client"

import { Card } from "@/components/ui/card"
import { Users, TrendingUp, Calendar } from "lucide-react"

export function SchoolOverview() {
  const schoolData = {
    name: "Stanford University",
    activeUsers: 342,
    totalUsers: 500,
    subscriptionEndDate: "2025-12-15",
    status: "active",
    monthlyGrowth: 12,
  }

  const getStatusColor = (status: string) => {
    return status === "active" ? "bg-primary/20 text-primary" : "bg-red-500/20 text-red-400"
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-xl sm:text-2xl font-bold text-foreground">School Overview</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="bg-card border border-border p-4 sm:p-6 rounded-xl">
          <div className="flex items-center justify-between gap-2 sm:gap-0">
            <div className="min-w-0">
              <p className="text-muted-foreground text-xs sm:text-sm mb-1">Active Users</p>
              <p className="text-2xl sm:text-3xl font-bold text-primary">{schoolData.activeUsers}</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Users size={20} className="text-primary" />
            </div>
          </div>
        </Card>

        <Card className="bg-card border border-border p-4 sm:p-6 rounded-xl">
          <div className="flex items-center justify-between gap-2 sm:gap-0">
            <div className="min-w-0">
              <p className="text-muted-foreground text-xs sm:text-sm mb-1">Total Users</p>
              <p className="text-2xl sm:text-3xl font-bold text-primary">{schoolData.totalUsers}</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Users size={20} className="text-primary fill-primary" />
            </div>
          </div>
        </Card>

        <Card className="bg-card border border-border p-4 sm:p-6 rounded-xl">
          <div className="flex items-center justify-between gap-2 sm:gap-0">
            <div className="min-w-0">
              <p className="text-muted-foreground text-xs sm:text-sm mb-1">Monthly Growth</p>
              <p className="text-2xl sm:text-3xl font-bold text-primary">+{schoolData.monthlyGrowth}%</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <TrendingUp size={20} className="text-primary" />
            </div>
          </div>
        </Card>

        <Card className="bg-card border border-border p-4 sm:p-6 rounded-xl">
          <div className="flex items-center justify-between gap-2 sm:gap-0">
            <div className="min-w-0">
              <p className="text-muted-foreground text-xs sm:text-sm mb-1">Sub. End Date</p>
              <p className="text-xs sm:text-sm font-bold text-primary">
                {new Date(schoolData.subscriptionEndDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Calendar size={20} className="text-primary" />
            </div>
          </div>
        </Card>
      </div>

      <Card className="bg-card border border-border p-4 sm:p-6 rounded-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-base sm:text-lg font-bold text-foreground mb-1">Subscription Status</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">Your subscription is active and running smoothly</p>
          </div>
          <span
            className={`inline-flex items-center px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold flex-shrink-0 ${getStatusColor(schoolData.status)}`}
          >
            {schoolData.status === "active" ? "Active" : "Inactive"}
          </span>
        </div>
      </Card>
    </div>
  )
}
