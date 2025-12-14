import { DashboardLayout } from "@/components/dashboard-layout"
import { SubscriptionManagement } from "@/components/subscription-management"

export default function SubscriptionsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-balance">Subscription Management</h1>
          <p className="text-muted-foreground text-lg">Manage your school subscription and billing</p>
        </div>
        <SubscriptionManagement />
      </div>
    </DashboardLayout>
  )
}
