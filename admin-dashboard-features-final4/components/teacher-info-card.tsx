"use client"

import { Card } from "@/components/ui/card"
import { Mail, Code, Building2 } from "lucide-react"

interface TeacherInfoCardProps {
  teacher: {
    name: string
    email: string
    teacher_code: string
    institution: string
  }
}

export function TeacherInfoCard({ teacher }: TeacherInfoCardProps) {
  return (
    <Card className="bg-card border border-border p-4 sm:p-6 rounded-xl">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-foreground">{teacher.name}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">Teacher Account</p>
          </div>
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <Building2 size={20} className="text-primary" />
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t border-border">
          <div className="flex items-center gap-3">
            <Mail size={16} className="text-primary flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="text-sm font-medium text-foreground truncate">{teacher.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Code size={16} className="text-primary flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Teacher Code</p>
              <p className="text-sm font-medium text-foreground font-mono">{teacher.teacher_code}</p>
            </div>
          </div>

          {teacher.institution && (
            <div className="flex items-center gap-3">
              <Building2 size={16} className="text-primary flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Institution</p>
                <p className="text-sm font-medium text-foreground truncate">{teacher.institution}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
