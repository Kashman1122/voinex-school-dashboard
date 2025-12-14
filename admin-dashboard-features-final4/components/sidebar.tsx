"use client"

import Link from "next/link"
import { LayoutDashboard, Zap, Users, Settings, X } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { fetchTeacherCompleteData } from "@/lib/api-client"

interface SidebarProps {
  onClose?: () => void
}

// Helper function to capitalize name
const capitalizeName = (name: string): string => {
  if (!name) return ""
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

// Helper function to get initials
const getInitials = (name: string): string => {
  if (!name) return "U"
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')
}

export function Sidebar({ onClose }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true)
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [dashboardData, setDashboardData] = useState<any>(null)

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const token = localStorage.getItem("authToken")
        const teacherData = localStorage.getItem("teacherData")
        const teacherCode = localStorage.getItem("teacherCode")

        console.log("[Dashboard] Auth Token:", !!token)
        console.log("[Dashboard] Teacher Data:", teacherData)
        console.log("[Dashboard] Teacher Code in LS:", teacherCode)

        let finalTeacherCode = teacherCode

        if (teacherData && !finalTeacherCode) {
          try {
            const parsed = JSON.parse(teacherData)
            finalTeacherCode = parsed.teacherCode || parsed.teacher_code
            console.log("[Dashboard] Extracted teacher code:", finalTeacherCode)
          } catch (e) {
            console.error("[Dashboard] Error parsing teacherData:", e)
          }
        }

        if (!token) {
          console.error("[Dashboard] No auth token")
          router.push("/login")
          return
        }

        if (!finalTeacherCode) {
          console.error("[Dashboard] Teacher code missing")
          setError("Teacher code not found. Please login again.")
          setTimeout(() => router.push("/login"), 1500)
          return
        }

        console.log("[Dashboard] Using teacher code:", finalTeacherCode)
        const data = await fetchTeacherCompleteData(finalTeacherCode)
        console.log("[Dashboard] Data loaded:", data)
        setDashboardData(data)
      } catch (err: any) {
        console.error("[Dashboard] Error:", err)
        setError(err.message || "Failed to load dashboard data.")
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [router])

  const handleClose = () => {
    setIsOpen(!isOpen)
    onClose?.()
  }

  const teacherName = dashboardData?.teacher?.name || ""
  const teacherEmail = dashboardData?.teacher?.email || ""
  const capitalizedName = capitalizeName(teacherName)
  const initials = getInitials(teacherName)

  return (
    <div
      className={`${isOpen ? "w-64" : "w-20"} bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col h-screen sticky top-0 max-h-screen`}
    >
      {/* Logo */}
      <div className="p-4 sm:p-6 flex items-center justify-between border-b border-sidebar-border">
        <div className={`flex items-center gap-3 ${!isOpen && "justify-center w-full"}`}>
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-lg">{initials}</span>
          </div>
          {isOpen && (
            <span className="font-bold text-lg text-sidebar-foreground hidden sm:inline">
              {capitalizedName}
            </span>
          )}
        </div>
        <button 
          onClick={handleClose} 
          className="p-1 hover:bg-sidebar-accent rounded-lg transition-colors lg:hidden"
        >
          <X size={18} className="text-sidebar-foreground" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 sm:p-4 space-y-2 overflow-y-auto">
        {[
          { icon: LayoutDashboard, label: "Dashboard", href: "/" },
          { icon: Users, label: "Subscriptions", href: "/subscriptions" },
          { icon: Settings, label: "Settings", href: "/settings" },
        ].map(({ icon: Icon, label, href }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors group"
            onClick={onClose}
          >
            <Icon size={20} className="group-hover:text-primary transition-colors flex-shrink-0" />
            {isOpen && <span className="text-sm sm:text-base">{label}</span>}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 sm:p-4 border-t border-sidebar-border space-y-2">
        <div className={`flex items-center ${isOpen ? "gap-3" : "justify-center"}`}>
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 text-primary-foreground">
            {initials}
          </div>
          {isOpen && (
            <div className="flex-1 min-w-0 hidden sm:block">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                {capitalizedName}
              </p>
              <p className="text-xs text-muted-foreground truncate">{teacherEmail}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}