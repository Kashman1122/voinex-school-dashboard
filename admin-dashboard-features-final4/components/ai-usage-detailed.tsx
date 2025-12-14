// "use client"

// import { Card } from "@/components/ui/card"
// import { Zap, TrendingDown, Clock, AlertTriangle } from "lucide-react"
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// const usageData = [
//   { date: "Mon", projectBuilder: 450, daminiAI: 240 },
//   { date: "Tue", projectBuilder: 520, daminiAI: 320 },
//   { date: "Wed", projectBuilder: 480, daminiAI: 280 },
//   { date: "Thu", projectBuilder: 610, daminiAI: 450 },
//   { date: "Fri", projectBuilder: 690, daminiAI: 520 },
//   { date: "Sat", projectBuilder: 450, daminiAI: 310 },
//   { date: "Sun", projectBuilder: 380, daminiAI: 280 },
// ]

// interface AIService {
//   name: string
//   remaining: number
//   total: number
//   usage: number
//   lastUsed: string
//   dailyAverage: number
// }

// const aiServices: AIService[] = [
//   {
//     name: "Project Builder",
//     remaining: 4500,
//     total: 10000,
//     usage: 5500,
//     lastUsed: "2 hours ago",
//     dailyAverage: 532,
//   },
//   {
//     name: "Damini AI",
//     remaining: 2300,
//     total: 5000,
//     usage: 2700,
//     lastUsed: "45 minutes ago",
//     dailyAverage: 385,
//   },
// ]

// export function AIUsageDetailed() {
//   return (
//     <div className="space-y-6 sm:space-y-8">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
//         {aiServices.map((service) => {
//           const usagePercent = (service.usage / service.total) * 100
//           const remainingPercent = (service.remaining / service.total) * 100

//           return (
//             <Card key={service.name} className="bg-card border border-border p-4 sm:p-6 rounded-xl space-y-4">
//               <div className="flex items-center justify-between gap-3">
//                 <div className="flex items-center gap-2 sm:gap-3 min-w-0">
//                   <div className="w-9 h-9 sm:w-10 sm:h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
//                     <Zap size={18} className="text-primary sm:w-5 sm:h-5" />
//                   </div>
//                   <div className="min-w-0">
//                     <p className="font-semibold text-sm sm:text-base text-foreground truncate">{service.name}</p>
//                     <p className="text-xs text-muted-foreground">AI Tool</p>
//                   </div>
//                 </div>
//                 <span className="text-lg sm:text-2xl font-bold text-primary flex-shrink-0">
//                   {service.remaining.toLocaleString()}
//                 </span>
//               </div>

//               <div className="space-y-2">
//                 <div className="flex justify-between text-xs sm:text-sm">
//                   <span className="text-muted-foreground">Remaining</span>
//                   <span className="text-foreground font-medium">{remainingPercent.toFixed(1)}%</span>
//                 </div>
//                 <div className="w-full bg-input rounded-full h-2 overflow-hidden">
//                   <div
//                     className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
//                     style={{ width: `${remainingPercent}%` }}
//                   />
//                 </div>
//               </div>

//               <div className="pt-2 border-t border-border space-y-3">
//                 <div className="grid grid-cols-2 gap-3 sm:gap-4">
//                   <div>
//                     <p className="text-xs text-muted-foreground mb-1">Used</p>
//                     <p className="text-base sm:text-lg font-bold text-foreground">{service.usage.toLocaleString()}</p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-muted-foreground mb-1">Total</p>
//                     <p className="text-base sm:text-lg font-bold text-foreground">{service.total.toLocaleString()}</p>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border">
//                   <div className="flex items-start gap-2">
//                     <Clock size={14} className="text-muted-foreground mt-0.5 flex-shrink-0" />
//                     <div className="min-w-0">
//                       <p className="text-xs text-muted-foreground">Last Used</p>
//                       <p className="text-xs sm:text-sm font-medium text-foreground truncate">{service.lastUsed}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-start gap-2">
//                     <TrendingDown size={14} className="text-muted-foreground mt-0.5 flex-shrink-0" />
//                     <div className="min-w-0">
//                       <p className="text-xs text-muted-foreground">Daily Avg</p>
//                       <p className="text-xs sm:text-sm font-medium text-foreground">{service.dailyAverage}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </Card>
//           )
//         })}
//       </div>

//       <Card className="bg-card border border-border p-4 sm:p-6 rounded-xl">
//         <h3 className="text-base sm:text-lg font-bold text-foreground mb-4 sm:mb-6">Weekly Usage Trend</h3>
//         <div className="overflow-x-auto">
//           <ResponsiveContainer width="100%" height={250} minWidth={300}>
//             <LineChart data={usageData}>
//               <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
//               <XAxis dataKey="date" stroke="var(--color-muted-foreground)" />
//               <YAxis stroke="var(--color-muted-foreground)" />
//               <Tooltip
//                 contentStyle={{
//                   backgroundColor: "var(--color-card)",
//                   border: "1px solid var(--color-border)",
//                   borderRadius: "0.5rem",
//                 }}
//               />
//               <Legend />
//               <Line
//                 type="monotone"
//                 dataKey="projectBuilder"
//                 stroke="var(--color-primary)"
//                 name="Project Builder"
//                 strokeWidth={2}
//                 dot={{ fill: "var(--color-primary)" }}
//               />
//               <Line
//                 type="monotone"
//                 dataKey="daminiAI"
//                 stroke="var(--color-accent)"
//                 name="Damini AI"
//                 strokeWidth={2}
//                 dot={{ fill: "var(--color-accent)" }}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </Card>

//       <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 bg-primary/10 border border-primary/30 rounded-lg p-3 sm:p-4">
//         <AlertTriangle size={20} className="text-primary mt-0.5 flex-shrink-0" />
//         <div className="min-w-0">
//           <p className="font-semibold text-foreground text-sm sm:text-base">Usage Alert</p>
//           <p className="text-xs sm:text-sm text-muted-foreground mt-1">
//             You've used 55% of your Project Builder credits. Consider upgrading your subscription soon.
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }


"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Zap, TrendingDown, Clock, AlertTriangle, Loader2 } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { fetchTeacherCompleteData, type TeacherCompleteData } from "@/lib/api-client";

const API_BASE_URL = "https://www.voinex.in/api"

interface TeacherData {
  api_usage: {
    limit: number
    used: number
    remaining: number
    usage_percentage: number
    reset_date: string
  }
  summary: {
    total_api_hits: number
  }
  subscription: {
    is_active: boolean
    days_remaining: number
  }
}

async function fetchTeacherData(teacherCode: string): Promise<TeacherData> {
  const response = await fetch(`${API_BASE_URL}/teacher/${teacherCode}/complete/`)
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`)
  }
  const data = await response.json()
  
  // Ensure api_usage exists
  if (!data.api_usage) {
    data.api_usage = {
      limit: 0,
      used: 0,
      remaining: 0,
      usage_percentage: 0,
      reset_date: new Date().toISOString()
    }
  }
  
  return data
}

export default function AIUsageDetailed() {
  const [teacherData, setTeacherData] = useState<TeacherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [teacherCode, setTeacherCode] = useState("")
  const [dashboardData, setDashboardData] = useState<TeacherCompleteData | null>(null);

  useEffect(() => {
    // Get teacher code from localStorage, URL params, or wherever you store it
    const code = localStorage.getItem('teacher_code') || 'TCHAE761B319' // Default for testing
    setTeacherCode(code)
    loadData(code)
  }, [])

  const loadData = async (code: string) => {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchTeacherData(code)
      setTeacherData(data)
    } catch (err: any) {
      setError(err.message)
      console.error("Error loading teacher data:", err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-3">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Loading AI usage data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <Card className="bg-destructive/10 border-destructive/30 p-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-destructive">Failed to load usage data</p>
            <p className="text-sm text-muted-foreground mt-1">{error}</p>
            <button
              onClick={() => loadData(teacherCode)}
              className="mt-3 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90"
            >
              Retry
            </button>
          </div>
        </div>
      </Card>
    )
  }

  if (!teacherData) {
    return null
  }

  const { api_usage, summary, subscription } = teacherData
  const usagePercent = api_usage.usage_percentage || 0
  const remainingPercent = 100 - usagePercent

  // Calculate daily average (used / days since start of month)
  const daysInMonth = new Date().getDate()
  const dailyAverage = Math.round(api_usage.used / daysInMonth)

  // Format reset date
  const resetDate = new Date(api_usage.reset_date)
  const daysUntilReset = Math.ceil((resetDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))

  // Generate weekly usage data (mock data for now - you can add this to your API later)
  const generateWeeklyData = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    return days.map(day => ({
      date: day,
      usage: Math.floor(dailyAverage * 0.8 + Math.random() * dailyAverage * 0.4)
    }))
  }

  const weeklyData = generateWeeklyData()

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Main AI Usage Card */}
      <Card className="bg-card border border-border p-4 sm:p-6 rounded-xl space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Zap size={18} className="text-primary sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-sm sm:text-base text-foreground truncate">AI API Usage</p>
              <p className="text-xs text-muted-foreground">Monthly Limit</p>
            </div>
          </div>
          <span className="text-lg sm:text-2xl font-bold text-primary flex-shrink-0">
            {api_usage.remaining.toLocaleString()}
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs sm:text-sm">
            <span className="text-muted-foreground">Remaining API Calls</span>
            <span className="text-foreground font-medium">{remainingPercent.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-input rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
              style={{ width: `${remainingPercent}%` }}
            />
          </div>
        </div>

        <div className="pt-2 border-t border-border space-y-3">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Used</p>
              <p className="text-base sm:text-lg font-bold text-foreground">{api_usage.used.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Total Limit</p>
              <p className="text-base sm:text-lg font-bold text-foreground">{api_usage.limit.toLocaleString()}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border">
            <div className="flex items-start gap-2">
              <Clock size={14} className="text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Resets In</p>
                <p className="text-xs sm:text-sm font-medium text-foreground truncate">
                  {daysUntilReset} days
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <TrendingDown size={14} className="text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Daily Avg</p>
                <p className="text-xs sm:text-sm font-medium text-foreground">{dailyAverage}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Student API Hits Summary */}
      <Card className="bg-card border border-border p-4 sm:p-6 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base sm:text-lg font-bold text-foreground">Total Student API Usage</h3>
          <span className="text-2xl font-bold text-accent">{summary.total_api_hits.toLocaleString()}</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Combined API calls from all your students
        </p>
      </Card>

      {/* Weekly Usage Trend */}
      <Card className="bg-card border border-border p-4 sm:p-6 rounded-xl">
        <h3 className="text-base sm:text-lg font-bold text-foreground mb-4 sm:mb-6">Weekly Usage Trend</h3>
        <div className="overflow-x-auto">
          <ResponsiveContainer width="100%" height={250} minWidth={300}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.5rem",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="usage"
                stroke="hsl(var(--primary))"
                name="API Calls"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--primary))" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Usage Alert */}
      {usagePercent > 80 && (
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 bg-primary/10 border border-primary/30 rounded-lg p-3 sm:p-4">
          <AlertTriangle size={20} className="text-primary mt-0.5 flex-shrink-0" />
          <div className="min-w-0">
            <p className="font-semibold text-foreground text-sm sm:text-base">High Usage Alert</p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              You've used {usagePercent.toFixed(1)}% of your monthly API limit. 
              {api_usage.remaining < 1000 && " Consider upgrading your subscription soon."}
            </p>
          </div>
        </div>
      )}

      {/* Subscription Status */}
      {!subscription.is_active && (
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 bg-destructive/10 border border-destructive/30 rounded-lg p-3 sm:p-4">
          <AlertTriangle size={20} className="text-destructive mt-0.5 flex-shrink-0" />
          <div className="min-w-0">
            <p className="font-semibold text-foreground text-sm sm:text-base">Subscription Expired</p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Your subscription has expired. Please renew to continue using AI features.
            </p>
          </div>
        </div>
      )}

      {/* Subscription Expiring Soon */}
      {subscription.is_active && subscription.days_remaining <= 7 && (
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 sm:p-4">
          <AlertTriangle size={20} className="text-amber-500 mt-0.5 flex-shrink-0" />
          <div className="min-w-0">
            <p className="font-semibold text-foreground text-sm sm:text-base">Subscription Expiring Soon</p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Your subscription expires in {subscription.days_remaining} days. Renew now to avoid interruption.
            </p>
          </div>
        </div>
      )}

      {/* Refresh Button */}
      <div className="flex justify-end">
        <button
          onClick={() => loadData(teacherCode)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh Data
        </button>
      </div>
    </div>
  )
}