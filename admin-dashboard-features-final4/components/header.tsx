"use client"

import { Bell, Search, User, Menu, Sun, Moon } from "lucide-react"
import { useTheme } from "@/providers/theme-provider"
import { useEffect, useState } from "react"

interface HeaderProps {
  onMenuClick?: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <header className="bg-card border-b border-border px-4 sm:px-6 md:px-8 py-3 sm:py-4 flex items-center justify-between sticky top-0 z-10">
        <button
          onClick={onMenuClick}
          className="p-2 hover:bg-input rounded-lg transition-colors text-muted-foreground hover:text-foreground lg:hidden"
        >
          <Menu size={20} />
        </button>
        <div className="flex-1 flex items-center gap-2 sm:gap-4 ml-2 lg:ml-0">
          <div className="relative max-w-md hidden sm:block w-full">
            <Search size={18} className="absolute left-3 top-2.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-input border border-border rounded-lg pl-10 pr-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            />
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <button className="p-2 hover:bg-input rounded-lg transition-colors text-muted-foreground hover:text-foreground">
            <Bell size={18} className="sm:w-5 sm:h-5" />
          </button>
          <button className="p-2 hover:bg-input rounded-lg transition-colors text-muted-foreground hover:text-foreground">
            <User size={18} className="sm:w-5 sm:h-5" />
          </button>
        </div>
      </header>
    )
  }

  return (
    <header className="bg-card border-b border-border px-4 sm:px-6 md:px-8 py-3 sm:py-4 flex items-center justify-between sticky top-0 z-10">
      <button
        onClick={onMenuClick}
        className="p-2 hover:bg-input rounded-lg transition-colors text-muted-foreground hover:text-foreground lg:hidden"
      >
        <Menu size={20} />
      </button>

      <div className="flex-1 flex items-center gap-2 sm:gap-4 ml-2 lg:ml-0">
        <div className="relative max-w-md hidden sm:block w-full">
          <Search size={18} className="absolute left-3 top-2.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-input border border-border rounded-lg pl-10 pr-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 hover:bg-input rounded-lg transition-colors text-muted-foreground hover:text-foreground"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun size={18} className="sm:w-5 sm:h-5" />
          ) : (
            <Moon size={18} className="sm:w-5 sm:h-5" />
          )}
        </button>
        <button className="p-2 hover:bg-input rounded-lg transition-colors text-muted-foreground hover:text-foreground">
          <Bell size={18} className="sm:w-5 sm:h-5" />
        </button>
        <button className="p-2 hover:bg-input rounded-lg transition-colors text-muted-foreground hover:text-foreground">
          <User size={18} className="sm:w-5 sm:h-5" />
        </button>
      </div>
    </header>
  )
}
