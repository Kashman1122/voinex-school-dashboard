"use client"

import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"

interface Project {
  id: string
  userName: string
  email: string
  stars: number
  status: "active" | "inactive"
}

const projects: Project[] = [
  { id: "1", userName: "Sarah Anderson", email: "sarah.anderson@example.com", stars: 234, status: "active" },
  { id: "2", userName: "Michael Chen", email: "michael.chen@example.com", stars: 156, status: "active" },
  { id: "3", userName: "Emma Wilson", email: "emma.wilson@example.com", stars: 89, status: "inactive" },
  { id: "4", userName: "James Rodriguez", email: "james.rodriguez@example.com", stars: 412, status: "active" },
  { id: "5", userName: "Lisa Park", email: "lisa.park@example.com", stars: 123, status: "active" },
]

export function ProjectsOverview() {
  const totalProjects = projects.length
  const activeProjects = projects.filter((p) => p.status === "active").length

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-card border border-border p-6 rounded-xl">
          <p className="text-muted-foreground text-sm mb-2">Total Projects</p>
          <p className="text-4xl font-bold text-primary">{totalProjects}</p>
        </Card>
        <Card className="bg-card border border-border p-6 rounded-xl">
          <p className="text-muted-foreground text-sm mb-2">Active Projects</p>
          <p className="text-4xl font-bold text-primary">{activeProjects}</p>
        </Card>
      </div>

      <Card className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">Recent Projects</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-input border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">User Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Stars</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b border-border hover:bg-input/50 transition-colors">
                  <td className="px-6 py-4 text-sm text-foreground font-medium">{project.userName}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{project.email}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Star size={16} className="text-primary fill-primary" />
                      <span className="text-sm font-semibold text-foreground">{project.stars}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                        project.status === "active" ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
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
