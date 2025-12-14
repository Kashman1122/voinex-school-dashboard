"use client"

import { Card } from "@/components/ui/card"
import { Bell, Users, Database, Shield, Globe } from "lucide-react"
import { useState } from "react"

export function SettingsPanel() {
  const [activeTab, setActiveTab] = useState("general")

  const settings = {
    schoolName: "Stanford University",
    email: "admin@stanford.edu",
    phone: "+1 (650) 723-2300",
    website: "www.stanford.edu",
    notifications: {
      emailAlerts: true,
      usageAlerts: true,
      securityAlerts: true,
      weeklyReport: true,
    },
    dataRetention: "12 months",
    twoFactor: true,
  }

  const tabs = [
    { id: "general", label: "General", icon: Globe },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "team", label: "Team Members", icon: Users },
    { id: "data", label: "Data & Privacy", icon: Database },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
      <div className="lg:col-span-1">
        <Card className="bg-card border border-border p-3 sm:p-4 rounded-xl lg:sticky lg:top-8">
          <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-colors text-left whitespace-nowrap lg:whitespace-normal flex-shrink-0 lg:flex-shrink ${
                    activeTab === tab.id ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-input"
                  }`}
                >
                  <Icon size={18} className="flex-shrink-0" />
                  <span className="font-medium text-xs sm:text-sm">{tab.label}</span>
                </button>
              )
            })}
          </nav>
        </Card>
      </div>

      <div className="lg:col-span-3 space-y-4 sm:space-y-6">
        {activeTab === "general" && (
          <div className="space-y-3 sm:space-y-4">
            <Card className="bg-card border border-border p-4 sm:p-6 rounded-xl">
              <h3 className="text-base sm:text-lg font-bold text-foreground mb-4 sm:mb-6">School Information</h3>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-foreground mb-2">School Name</label>
                  <input
                    type="text"
                    value={settings.schoolName}
                    readOnly
                    className="w-full bg-input border border-border rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-foreground mb-2">Admin Email</label>
                  <input
                    type="email"
                    value={settings.email}
                    readOnly
                    className="w-full bg-input border border-border rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-foreground mb-2">Phone</label>
                  <input
                    type="tel"
                    value={settings.phone}
                    readOnly
                    className="w-full bg-input border border-border rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-foreground mb-2">Website</label>
                  <input
                    type="url"
                    value={settings.website}
                    readOnly
                    className="w-full bg-input border border-border rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm text-foreground"
                  />
                </div>
              </div>
              <button className="mt-4 sm:mt-6 px-4 sm:px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity text-xs sm:text-sm">
                Save Changes
              </button>
            </Card>
          </div>
        )}

        {activeTab === "notifications" && (
          <Card className="bg-card border border-border p-4 sm:p-6 rounded-xl">
            <h3 className="text-base sm:text-lg font-bold text-foreground mb-4 sm:mb-6">Notification Preferences</h3>
            <div className="space-y-3 sm:space-y-4">
              {[
                { id: "emailAlerts", label: "Email Alerts", description: "Receive important alerts via email" },
                {
                  id: "usageAlerts",
                  label: "Usage Alerts",
                  description: "Get notified when usage reaches 80% of limit",
                },
                {
                  id: "securityAlerts",
                  label: "Security Alerts",
                  description: "Receive security-related notifications",
                },
                { id: "weeklyReport", label: "Weekly Report", description: "Receive weekly usage reports" },
              ].map((notif) => (
                <div
                  key={notif.id}
                  className="flex items-center justify-between py-2 sm:py-3 border-b border-border last:border-b-0"
                >
                  <div className="min-w-0">
                    <p className="font-medium text-sm sm:text-base text-foreground">{notif.label}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{notif.description}</p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked={settings.notifications[notif.id as keyof typeof settings.notifications]}
                    className="w-4 h-4 rounded flex-shrink-0 ml-2"
                  />
                </div>
              ))}
            </div>
          </Card>
        )}

        {activeTab === "security" && (
          <div className="space-y-3 sm:space-y-4">
            <Card className="bg-card border border-border p-4 sm:p-6 rounded-xl">
              <h3 className="text-base sm:text-lg font-bold text-foreground mb-4 sm:mb-6">Security Settings</h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 sm:py-3 border-b border-border gap-2">
                  <div className="min-w-0">
                    <p className="font-medium text-sm sm:text-base text-foreground">Two-Factor Authentication</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Additional security layer for your account
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${settings.twoFactor ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}
                  >
                    {settings.twoFactor ? "Enabled" : "Disabled"}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 sm:py-3 border-b border-border gap-2">
                  <div className="min-w-0">
                    <p className="font-medium text-sm sm:text-base text-foreground">Change Password</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Update your account password</p>
                  </div>
                  <button className="px-3 sm:px-4 py-2 border border-border rounded-lg text-foreground hover:bg-input transition-colors text-xs sm:text-sm flex-shrink-0">
                    Change
                  </button>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 sm:py-3 gap-2">
                  <div className="min-w-0">
                    <p className="font-medium text-sm sm:text-base text-foreground">Active Sessions</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Manage your login sessions</p>
                  </div>
                  <button className="px-3 sm:px-4 py-2 border border-border rounded-lg text-foreground hover:bg-input transition-colors text-xs sm:text-sm flex-shrink-0">
                    Manage
                  </button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === "team" && (
          <Card className="bg-card border border-border p-4 sm:p-6 rounded-xl">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-bold text-foreground">Team Members</h3>
              <button className="px-3 sm:px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity text-xs sm:text-sm flex-shrink-0">
                + Add Member
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-max sm:min-w-0">
                <thead className="bg-input border-b border-border">
                  <tr>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-muted-foreground">
                      Name
                    </th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-muted-foreground">
                      Email
                    </th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-muted-foreground">
                      Role
                    </th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-muted-foreground">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "John Admin", email: "john@stanford.edu", role: "Owner" },
                    { name: "Sarah Manager", email: "sarah@stanford.edu", role: "Admin" },
                  ].map((member, index) => (
                    <tr key={index} className="border-b border-border hover:bg-input/50 transition-colors">
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-foreground">
                        {member.name}
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-muted-foreground">
                        {member.email}
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-foreground">{member.role}</td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <button className="text-red-400 hover:underline text-xs sm:text-sm font-semibold">
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {activeTab === "data" && (
          <Card className="bg-card border border-border p-4 sm:p-6 rounded-xl">
            <h3 className="text-base sm:text-lg font-bold text-foreground mb-4 sm:mb-6">Data & Privacy</h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 sm:py-3 border-b border-border gap-2">
                <div className="min-w-0">
                  <p className="font-medium text-sm sm:text-base text-foreground">Data Retention Period</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">How long your data is kept</p>
                </div>
                <select className="bg-input border border-border rounded-lg px-3 py-2 text-xs sm:text-sm text-foreground flex-shrink-0">
                  <option>12 months</option>
                  <option>24 months</option>
                  <option>36 months</option>
                </select>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 sm:py-3 border-b border-border gap-2">
                <div className="min-w-0">
                  <p className="font-medium text-sm sm:text-base text-foreground">Export Data</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Download all your data in JSON format</p>
                </div>
                <button className="px-3 sm:px-4 py-2 border border-border rounded-lg text-foreground hover:bg-input transition-colors text-xs sm:text-sm flex-shrink-0">
                  Export
                </button>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 sm:py-3 gap-2">
                <div className="min-w-0">
                  <p className="font-medium text-sm sm:text-base text-foreground">Delete Account</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Permanently delete your account and data</p>
                </div>
                <button className="px-3 sm:px-4 py-2 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/10 transition-colors text-xs sm:text-sm flex-shrink-0">
                  Delete
                </button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
