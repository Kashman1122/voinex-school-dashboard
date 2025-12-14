"use client"

import { Card } from "@/components/ui/card"
import { Users, Calendar, TrendingUp } from "lucide-react"

interface SchoolSubscription {
  id: string
  name: string
  activeUsers: number
  totalUsers: number
  endDate: string
  status: "active" | "expiring" | "expired"
}

const subscriptions: SchoolSubscription[] = [
  {
    id: "1",
    name: "Stanford University",
    activeUsers: 234,
    totalUsers: 500,
    endDate: "2025-06-15",
    status: "active",
  },
  {
    id: "2",
    name: "MIT",
    activeUsers: 189,
    totalUsers: 400,
    endDate: "2025-02-28",
    status: "expiring",
  },
  {
    id: "3",
    name: "Harvard University",
    activeUsers: 156,
    totalUsers: 350,
    endDate: "2025-09-10",
    status: "active",
  },
  {
    id: "4",
    name: "UC Berkeley",
    activeUsers: 198,
    totalUsers: 450,
    endDate: "2024-12-01",
    status: "expired",
  },
  {
    id: "5",
    name: "Caltech",
    activeUsers: 89,
    totalUsers: 200,
    endDate: "2025-08-20",
    status: "active",
  },
]

const getStatusColor = (status: SchoolSubscription["status"]) => {
  switch (status) {
    case "active":
      return "bg-primary/20 text-primary"
    case "expiring":
      return "bg-yellow-500/20 text-yellow-400"
    case "expired":
      return "bg-red-500/20 text-red-400"
    default:
      return "bg-muted text-muted-foreground"
  }
}

const getStatusLabel = (status: SchoolSubscription["status"]) => {
  switch (status) {
    case "active":
      return "Active"
    case "expiring":
      return "Expiring Soon"
    case "expired":
      return "Expired"
    default:
      return status
  }
}

export function SchoolSubscriptions() {
  const activeCount = subscriptions.filter((s) => s.status === "active").length
  const totalUsers = subscriptions.reduce((sum, s) => sum + s.totalUsers, 0)
  const activeUsers = subscriptions.reduce((sum, s) => sum + s.activeUsers, 0)

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">School Subscriptions</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card border border-border p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm mb-1">Active Subscriptions</p>
              <p className="text-3xl font-bold text-primary">{activeCount}</p>
            </div>
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
              <TrendingUp size={24} className="text-primary" />
            </div>
          </div>
        </Card>
        <Card className="bg-card border border-border p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm mb-1">Total Users</p>
              <p className="text-3xl font-bold text-primary">{totalUsers.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
              <Users size={24} className="text-primary" />
            </div>
          </div>
        </Card>
        <Card className="bg-card border border-border p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm mb-1">Active Users</p>
              <p className="text-3xl font-bold text-primary">{activeUsers.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
              <Users size={24} className="text-primary fill-primary" />
            </div>
          </div>
        </Card>
      </div>

      <Card className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-bold text-foreground">Subscription Details</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-input border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">School Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Active Users</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Total Users</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">End Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((sub) => (
                <tr key={sub.id} className="border-b border-border hover:bg-input/50 transition-colors">
                  <td className="px-6 py-4 text-sm text-foreground font-medium">{sub.name}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{sub.activeUsers}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{sub.totalUsers}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      {new Date(sub.endDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(sub.status)}`}
                    >
                      {getStatusLabel(sub.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
