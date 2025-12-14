"use client"

import { Card } from "@/components/ui/card"
import { Zap } from "lucide-react"

interface APIUsageCardProps {
  usage: {
    limit: number
    used: number
    remaining: number
  }
}

// export function APIUsageCard({ usage }: APIUsageCardProps) {
//   const usagePercent = (usage.used / usage.limit) * 100

//   return (
//     <Card className="bg-card border border-border p-4 sm:p-6 rounded-xl">
//       <div className="space-y-4">
//         <div className="flex items-center justify-between gap-3">
//           <h3 className="text-lg sm:text-xl font-bold text-foreground">API Usage</h3>
//           <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
//             <Zap size={20} className="text-primary" />
//           </div>
//         </div>

//         <div className="space-y-2">
//           <div className="flex justify-between text-xs sm:text-sm">
//             <span className="text-muted-foreground">API Hits Used</span>
//             <span className="text-foreground font-bold">{usagePercent.toFixed(1)}%</span>
//           </div>
//           <div className="w-full bg-input rounded-full h-2.5 overflow-hidden">
//             <div
//               className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
//               style={{ width: `${Math.min(usagePercent, 100)}%` }}
//             />
//           </div>
//         </div>

//         <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border">
//           <div>
//             <p className="text-xs text-muted-foreground mb-1">Used</p>
//             <p className="text-base sm:text-lg font-bold text-foreground">{usage.used.toLocaleString()}</p>
//           </div>
//           <div>
//             <p className="text-xs text-muted-foreground mb-1">Remaining</p>
//             <p className="text-base sm:text-lg font-bold text-primary">{usage.remaining.toLocaleString()}</p>
//           </div>
//           <div>
//             <p className="text-xs text-muted-foreground mb-1">Limit</p>
//             <p className="text-base sm:text-lg font-bold text-foreground">{usage.limit.toLocaleString()}</p>
//           </div>
//         </div>
//       </div>
//     </Card>
//   )
// }

export function APIUsageCard({ usage }: APIUsageCardProps) {
  const usagePercent = (usage.used / usage.limit) * 100;

  return (
    <Card className="bg-card border border-border p-4 sm:p-6 rounded-xl">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg sm:text-xl font-bold">API Usage</h3>
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/20 rounded-lg flex items-center justify-center">
            <Zap size={20} className="text-primary" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs sm:text-sm">
            <span className="text-muted-foreground">API Hits Used</span>
            <span className="font-bold">{usagePercent.toFixed(1)}%</span>
          </div>

          <div className="w-full bg-input rounded-full h-2.5 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
              style={{ width: `${Math.min(usagePercent, 100)}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Used</p>
            <p className="text-base sm:text-lg font-bold">{usage.used}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Remaining</p>
            <p className="text-base sm:text-lg font-bold text-primary">{usage.remaining}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Limit</p>
            <p className="text-base sm:text-lg font-bold">{usage.limit}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
