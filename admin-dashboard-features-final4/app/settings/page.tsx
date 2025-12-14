import { DashboardLayout } from "@/components/dashboard-layout"
import { SettingsPanel } from "@/components/settings-panel"

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-balance">Settings</h1>
          <p className="text-muted-foreground text-lg">Manage your school account and preferences</p>
        </div>
        <SettingsPanel />
      </div>
    </DashboardLayout>
  )
}
