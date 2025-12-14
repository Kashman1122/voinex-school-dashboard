"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { CreditCard, Download, RotateCw, AlertCircle } from "lucide-react"

const API_BASE_URL = "https://www.voinex.in/api"

interface TeacherCompleteData {
  teacher: {
    id: number
    username: string
    name: string
    email: string
    teacher_code: string
    invitation_code: string
    institution: string
  }
  subscription: {
    start_date: string
    end_date: string
    days_remaining: number
    is_active: boolean
  }
  api_usage: {
    limit: number
    used: number
    remaining: number
    usage_percentage: number
    reset_date: string
  }
}

interface TeacherMongoData {
  school?: string
  teacherName?: string
  teacherEmail?: string
}

async function fetchTeacherCompleteData(teacherCode: string): Promise<TeacherCompleteData> {
  const url = `${API_BASE_URL}/teacher/${teacherCode}/complete/`
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`)
  }

  return await response.json()
}

async function fetchTeacherMongoData(teacherCode: string): Promise<TeacherMongoData> {
  const response = await fetch(`/api/teacher/details?teacherCode=${teacherCode}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error(`MongoDB API Error: ${response.status}`)
  }

  return await response.json()
}

export function SubscriptionManagement() {
  const [data, setData] = useState<TeacherCompleteData | null>(null)
  const [mongoData, setMongoData] = useState<TeacherMongoData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [teacherCode, setTeacherCode] = useState<string>("")

  useEffect(() => {
    // Get teacher code and school from localStorage
    const storedTeacherCode = localStorage.getItem("teacherCode")
    const storedTeacherData = localStorage.getItem("teacherData")
    
    if (storedTeacherCode) {
      setTeacherCode(storedTeacherCode)
    }
    
    if (storedTeacherData) {
      try {
        const parsed = JSON.parse(storedTeacherData)
        if (parsed.teacherCode) {
          setTeacherCode(parsed.teacherCode)
        }
        // If school is already in teacherData from login/register, use it immediately
        if (parsed.school) {
          setMongoData({
            school: parsed.school,
            teacherName: parsed.teacherName,
            teacherEmail: parsed.teacherEmail,
          })
        }
      } catch (e) {
        console.error("Error parsing teacherData:", e)
      }
    }
  }, [])

  useEffect(() => {
    if (!teacherCode) return

    async function loadData() {
      try {
        setLoading(true)
        
        // Fetch API data
        const apiResult = await fetchTeacherCompleteData(teacherCode)
        setData(apiResult)
        
        // Fetch MongoDB data only if not already loaded from localStorage
        if (!mongoData?.school) {
          try {
            const mongoResult = await fetchTeacherMongoData(teacherCode)
            setMongoData(mongoResult)
          } catch (mongoError) {
            console.warn("MongoDB fetch failed, using data from API:", mongoError)
          }
        }
        
        setError(null)
      } catch (err: any) {
        setError(err.message || "Failed to load data")
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [teacherCode])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading subscription data...</p>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="bg-card border border-border p-8 rounded-xl max-w-md">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-foreground mb-2">Error Loading Data</h3>
            <p className="text-muted-foreground">{error || "Failed to load subscription data"}</p>
            {!teacherCode && (
              <p className="text-xs text-muted-foreground mt-2">
                No teacher code found. Please log in again.
              </p>
            )}
          </div>
        </Card>
      </div>
    )
  }

  const subscription = data.subscription
  const apiUsage = data.api_usage
  const teacher = data.teacher

  // Use school from MongoDB/localStorage, fall back to institution from API
  const schoolName = mongoData?.school || teacher.institution || "Not specified"

  // Calculate plan based on API limit
  const planName = apiUsage.limit >= 10000 ? "Professional" : apiUsage.limit >= 5000 ? "Standard" : "Basic"
  const price = apiUsage.limit >= 10000 ? "$2,999" : apiUsage.limit >= 5000 ? "$1,499" : "$499"

  const features = [
    { name: "API Usage Limit", value: apiUsage.limit.toLocaleString(), included: true },
    { name: "API Remaining", value: apiUsage.remaining.toLocaleString(), included: true },
    { name: "Subscription Days", value: `${subscription.days_remaining} days left`, included: true },
    { name: "School/Institution", value: schoolName, included: true },
    { name: "Teacher Code", value: teacher.teacher_code, included: true },
    { name: "Invitation Code", value: teacher.invitation_code, included: true },
  ]

  const invoices = [
    { 
      id: "INV-2024-001", 
      date: subscription.start_date, 
      amount: price, 
      status: "paid" 
    },
  ]

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <Card className="bg-card border border-border p-4 sm:p-6 md:p-8 rounded-xl">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-0 mb-4 sm:mb-6">
              <div className="min-w-0">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-1 sm:mb-2">{planName} Plan</h2>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {teacher.name} - {teacher.email}
                </p>
                {schoolName !== "Not specified" && (
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <span className="font-medium">School:</span> {schoolName}
                  </p>
                )}
              </div>
              <span
                className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold flex-shrink-0 ${subscription.is_active ? "bg-primary/20 text-primary" : "bg-red-500/20 text-red-400"}`}
              >
                {subscription.is_active ? "Active" : "Inactive"}
              </span>
            </div>

            <div className="text-3xl sm:text-4xl font-bold text-primary mb-4 sm:mb-6">{price}</div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-border">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground mb-1">Subscription Started</p>
                <p className="text-sm sm:text-base text-foreground font-semibold">
                  {new Date(subscription.start_date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground mb-1">Subscription Ends</p>
                <p className="text-sm sm:text-base text-foreground font-semibold">
                  {new Date(subscription.end_date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground mb-1">Days Remaining</p>
                <p className="text-sm sm:text-base text-foreground font-semibold">
                  {subscription.days_remaining} days
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <input type="checkbox" checked={subscription.is_active} readOnly className="w-4 h-4 rounded" />
              <label className="text-foreground text-xs sm:text-sm">
                Subscription is <span className="font-semibold text-primary">{subscription.is_active ? "active" : "inactive"}</span>
              </label>
            </div>
          </Card>

          <Card className="bg-card border border-border p-4 sm:p-6 rounded-xl">
            <h3 className="text-base sm:text-lg font-bold text-foreground mb-4 sm:mb-6">Subscription Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 sm:gap-3 pb-3 sm:pb-4 border-b border-border last:border-b-0"
                >
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm sm:text-base text-foreground">{feature.name}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground break-words">{feature.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <Card className="bg-card border border-border p-4 sm:p-6 rounded-xl">
            <h3 className="font-bold text-foreground mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
              <CreditCard size={18} className="text-primary flex-shrink-0" />
              Quick Actions
            </h3>
            <div className="space-y-2 flex flex-col">
              <button className="px-3 sm:px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 text-xs sm:text-sm">
                <RotateCw size={16} />
                Upgrade Plan
              </button>
              <button className="px-3 sm:px-4 py-2 rounded-lg border border-border text-foreground font-semibold hover:bg-input transition-colors text-xs sm:text-sm">
                Manage Billing
              </button>
              <button className="px-3 sm:px-4 py-2 rounded-lg border border-border text-foreground font-semibold hover:bg-input transition-colors text-xs sm:text-sm">
                View Invoices
              </button>
            </div>
          </Card>

          <Card className="bg-primary/10 border border-primary/30 p-3 sm:p-4 rounded-xl">
            <div className="flex items-start gap-2 sm:gap-3">
              <AlertCircle size={16} className="text-primary mt-0.5 flex-shrink-0 sm:w-4 sm:h-4" />
              <div className="min-w-0">
                <p className="font-semibold text-foreground text-xs sm:text-sm mb-1">API Usage</p>
                <p className="text-xs text-muted-foreground">
                  {apiUsage.used.toLocaleString()} / {apiUsage.limit.toLocaleString()} used ({apiUsage.usage_percentage.toFixed(2)}%)
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Resets: {new Date(apiUsage.reset_date).toLocaleDateString("en-US")}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Card className="bg-card border border-border p-4 sm:p-6 rounded-xl">
        <h3 className="text-base sm:text-lg font-bold text-foreground mb-4 sm:mb-6">Billing History</h3>
        <div className="overflow-x-auto">
          <table className="w-full min-w-max sm:min-w-0">
            <thead className="bg-input border-b border-border">
              <tr>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-muted-foreground">
                  Invoice
                </th>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-muted-foreground">
                  Date
                </th>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-muted-foreground">
                  Amount
                </th>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-muted-foreground">
                  Status
                </th>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-muted-foreground">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-border hover:bg-input/50 transition-colors">
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-foreground">
                    {invoice.id}
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-muted-foreground">
                    {new Date(invoice.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-foreground">
                    {invoice.amount}
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-semibold bg-primary/20 text-primary">
                      Paid
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <button className="text-primary hover:underline font-semibold flex items-center gap-1 text-xs sm:text-sm">
                      <Download size={14} />
                      <span className="hidden sm:inline">Download</span>
                    </button>
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