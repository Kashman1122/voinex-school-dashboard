import { DashboardLayout } from "@/components/dashboard-layout"
import  AIUsageDetailed  from "@/components/ai-usage-detailed"


export default function AIUsagePage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-balance">AI Usage Analytics</h1>
          <p className="text-muted-foreground text-lg">Detailed breakdown of your AI tool usage</p>
        </div>
        <AIUsageDetailed />
      </div>
    </DashboardLayout>
  )
}
