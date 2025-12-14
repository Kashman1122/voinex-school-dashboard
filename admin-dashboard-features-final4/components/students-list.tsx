// "use client"

// import { Card } from "@/components/ui/card"
// import { Users } from "lucide-react"

// interface Student {
//   student_id: number
//   username: string
//   name: string
//   email: string
//   subscription: string
//   joined_at: string
//   last_active: string
//   activities: {
//     total_ideas: number
//     total_chats: number
//     total_api_hits: number
//     total_projects: number
//     monthly_activities: number
//   }
// }

// interface StudentsListProps {
//   students: Student[]
// }

// export function StudentsList({ students }: StudentsListProps) {
//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//     })
//   }

//   return (
//     <div className="space-y-4 sm:space-y-6">
//       <div className="flex items-center justify-between gap-3">
//         <h2 className="text-xl sm:text-2xl font-bold text-foreground">Students</h2>
//         <div className="flex items-center gap-2 px-3 py-1 bg-primary/20 rounded-full">
//           <Users size={16} className="text-primary" />
//           <span className="text-sm font-bold text-primary">{students.length}</span>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 gap-3 sm:gap-4">
//         {students.map((student) => (
//           <Card
//             key={student.student_id}
//             className="bg-card border border-border p-4 sm:p-6 rounded-xl hover:border-primary/30 transition-colors"
//           >
//             <div className="space-y-3">
//               <div className="flex items-start justify-between gap-3">
//                 <div className="min-w-0">
//                   <h3 className="text-base sm:text-lg font-bold text-foreground">{student.name}</h3>
//                   <p className="text-xs sm:text-sm text-muted-foreground truncate">{student.email}</p>
//                 </div>
//                 <span
//                   className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${student.subscription === "free" ? "bg-input text-muted-foreground" : "bg-primary/20 text-primary"}`}
//                 >
//                   {student.subscription}
//                 </span>
//               </div>

//               <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
//                 <div className="p-2 bg-input rounded border border-border">
//                   <p className="text-muted-foreground text-xs mb-0.5">Ideas</p>
//                   <p className="font-bold text-foreground">{student.activities.total_ideas}</p>
//                 </div>
//                 {/* <div className="p-2 bg-input rounded border border-border">
//                   <p className="text-muted-foreground text-xs mb-0.5">Chats</p>
//                   <p className="font-bold text-foreground">{student.activities.total_chats}</p>
//                 </div>
//                 <div className="p-2 bg-input rounded border border-border">
//                   <p className="text-muted-foreground text-xs mb-0.5">Projects</p>
//                   <p className="font-bold text-foreground">{student.activities.total_projects}</p>
//                 </div> */}
//                 <div className="p-2 bg-input rounded border border-border">
//                   <p className="text-muted-foreground text-xs mb-0.5">Joined</p>
//                   <p className="font-bold text-foreground text-xs">{formatDate(student.joined_at)}</p>
//                 </div>
//               </div>
//             </div>
//           </Card>
//         ))}
//       </div>

//       {students.length === 0 && (
//         <Card className="bg-card border border-border p-8 sm:p-12 rounded-xl text-center">
//           <Users size={32} className="text-muted-foreground mx-auto mb-3 opacity-50" />
//           <p className="text-muted-foreground">No students enrolled yet</p>
//         </Card>
//       )}
//     </div>
//   )
// }


"use client";

import { Card } from "@/components/ui/card";
import { Users } from "lucide-react";

interface Student {
  student_id: number;
  username: string;
  name: string;
  email: string;
  subscription: string;
  joined_at: string;
  last_active: string;
  activities: {
    total_ideas: number;
    total_chats: number;
    total_api_hits: number;
    total_projects: number;
    monthly_activities: number;
    damini_ai_calls: number;
    project_builder_calls: number;
    damini_usage: number;
    project_builder_usage: number;
  };
}

interface StudentsListProps {
  students: Student[];
}

export function StudentsList({ students }: StudentsListProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground">Students</h2>
        <div className="flex items-center gap-2 px-3 py-1 bg-primary/20 rounded-full">
          <Users size={16} className="text-primary" />
          <span className="text-sm font-bold text-primary">{students.length}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:gap-4">
        {students.map((student) => (
          <Card
            key={student.student_id}
            className="bg-card border border-border p-4 sm:p-6 rounded-xl hover:border-primary/30 transition-colors"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg font-bold text-foreground">
                    {student.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">
                    {student.email}
                  </p>
                </div>
                <span
                  className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${
                    student.subscription === "free"
                      ? "bg-input text-muted-foreground"
                      : "bg-primary/20 text-primary"
                  }`}
                >
                  {student.subscription}
                </span>
              </div>

              {/* Activity Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="p-2 bg-input rounded border border-border">
                  <p className="text-muted-foreground text-xs mb-0.5">Ideas</p>
                  <p className="font-bold text-foreground">
                    {student.activities.total_ideas}
                  </p>
                </div>
                <div className="p-2 bg-input rounded border border-border">
                  <p className="text-muted-foreground text-xs mb-0.5">Chats</p>
                  <p className="font-bold text-foreground">
                    {student.activities.total_chats}
                  </p>
                </div>
                <div className="p-2 bg-input rounded border border-border">
                  <p className="text-muted-foreground text-xs mb-0.5">Projects</p>
                  <p className="font-bold text-foreground">
                    {student.activities.total_projects}
                  </p>
                </div>
                <div className="p-2 bg-input rounded border border-border">
                  <p className="text-muted-foreground text-xs mb-0.5">Joined</p>
                  <p className="font-bold text-foreground text-xs">
                    {formatDate(student.joined_at)}
                  </p>
                </div>
              </div>

              {/* NEW: API Usage Breakdown */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 bg-blue-500/10 rounded border border-blue-500/30">
                  <p className="text-blue-600 text-xs mb-0.5">Damini AI</p>
                  <p className="font-bold text-blue-700">
                    {student.activities.damini_usage || 0}
                  </p>
                </div>
                <div className="p-2 bg-purple-500/10 rounded border border-purple-500/30">
                  <p className="text-purple-600 text-xs mb-0.5">Project Builder</p>
                  <p className="font-bold text-purple-700">
                    {student.activities.project_builder_usage || 0}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {students.length === 0 && (
        <Card className="bg-card border border-border p-8 sm:p-12 rounded-xl text-center">
          <Users size={32} className="text-muted-foreground mx-auto mb-3 opacity-50" />
          <p className="text-muted-foreground">No students enrolled yet</p>
        </Card>
      )}
    </div>
  );
}