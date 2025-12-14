// // API utility to fetch teacher data from external API
// const API_BASE_URL = "http://127.0.0.1:8000/api"

// export interface TeacherCompleteData {
//   teacher: {
//     id: number
//     username: string
//     name: string
//     email: string
//     teacher_code: string
//     invitation_code: string
//     institution: string
//   }
//   subscription: {
//     start_date: string
//     end_date: string
//     days_remaining: number
//     is_active: boolean
//   }
//   api_usage: {
//     limit: number
//     used: number
//     remaining: number
//   }
//   summary: {
//     total_students: number
//     total_ideas: number
//     total_chats: number
//     total_api_hits: number
//     total_projects: number
//     total_damini_calls:number
//     total_project_calls:number
//   }
//   students: Array<{
//     student_id: number
//     username: string
//     name: string
//     email: string
//     subscription: string
//     joined_at: string
//     last_active: string
//     activities: {
//       total_ideas: number
//       total_chats: number
//       total_api_hits: number
//       total_projects: number
//       monthly_activities: number
//     }
//     ideas: any[]
//     project_searches: any[]
//     recent_chats: any[]
//   }>
// }

// // export async function fetchTeacherCompleteData(teacherCode: string): Promise<TeacherCompleteData> {
// //   try {
// //     if (!teacherCode || teacherCode.trim() === "") {
// //       throw new Error("Teacher code is empty or invalid")
// //     }

// //     console.log("[v0] Fetching data for teacher code:", teacherCode)

// //     const url = `${API_BASE_URL}/teacher/${teacherCode}/complete/`
// //     console.log("[v0] API URL:", url)

// //     const response = await fetch(url)

// //     console.log("[v0] API Response status:", response.status)

// //     if (!response.ok) {
// //       const errorData = await response.text()
// //       console.error("[v0] API Error response:", errorData)
// //       throw new Error(`API Error: ${response.status} - ${errorData}`)
// //     }

// //     const data = await response.json()
// //     console.log("[v0] Successfully fetched data:", data)
// //     return data
// //   } catch (error: any) {
// //     console.error("[v0] Error fetching teacher data:", error.message)
// //     throw error
// //   }
// // }

// export async function fetchTeacherCompleteData(
//   teacherCode: string
// ): Promise<TeacherCompleteData> {
//   if (!teacherCode || teacherCode.trim() === "") {
//     throw new Error("Teacher code is empty or invalid");
//   }

//   try {
//     console.log("[v0] Fetching data for teacher code:", teacherCode);

//     const url = `${API_BASE_URL}/teacher/${teacherCode}/complete/`;
//     console.log("[v0] API URL:", url);

//     const response = await fetch(url, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     console.log("[v0] API Response status:", response.status);

//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error("[v0] API Error response:", errorText);

//       throw new Error(`API Error: ${response.status} - ${errorText}`);
//     }

//     const data = await response.json();
//     console.log("[v0] Successfully fetched data:", data);

//     // 🔥 Important validation to avoid undefined api_usage on frontend
//     if (!data.api_usage) {
//       console.warn("[v0] WARNING: api_usage missing from backend response!");
//       data.api_usage = {
//         limit: 0,
//         used: 0,
//         remaining: 0,
//       };
//     }

//     return data;
//   } catch (error: any) {
//     console.error("[v0] Error fetching teacher data:", error.message || error);
//     throw new Error(error.message || "Failed to fetch teacher data");
//   }
// }
const API_BASE_URL = "https://www.voinex.in/api";

export interface TeacherCompleteData {
  teacher: {
    id: number;
    username: string;
    name: string;
    email: string;
    teacher_code: string;
    invitation_code: string;
    institution: string;
  };
  subscription: {
    start_date: string;
    end_date: string;
    days_remaining: number;
    is_active: boolean;
  };
  api_usage: {
    limit: number;
    used: number;
    remaining: number;
    usage_percentage: number;
    reset_date: string;
    // Chat message counts (for reference)
    damini_ai: {
      total_calls: number;
      student_calls: number;
      teacher_calls: number;
      description: string;
    };
    project_builder: {
      total_calls: number;
      student_calls: number;
      teacher_calls: number;
      description: string;
    };
    // NEW: Actual API usage
    damini_usage: {
      total_usage: number;
      student_usage: number;
      teacher_usage: number;
      percentage: number;
      description: string;
    };
    project_builder_usage: {
      total_usage: number;
      student_usage: number;
      teacher_usage: number;
      percentage: number;
      description: string;
    };
  };
  summary: {
    total_students: number;
    total_ideas: number;
    total_chats: number;
    total_api_hits: number;
    total_projects: number;
    // Chat message counts
    total_damini_calls: number;
    total_project_builder_calls: number;
    // NEW: Actual API usage
    total_damini_usage: number;
    total_project_builder_usage: number;
    total_api_usage: number;
  };
  students: Array<{
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
      // Chat message counts
      damini_ai_calls: number;
      project_builder_calls: number;
      // NEW: Actual API usage
      damini_usage: number;
      project_builder_usage: number;
    };
    ideas: any[];
    project_searches: any[];
    recent_chats: any[];
  }>;
}

export async function fetchTeacherCompleteData(
  teacherCode: string
): Promise<TeacherCompleteData> {
  if (!teacherCode || teacherCode.trim() === "") {
    throw new Error("Teacher code is empty or invalid");
  }

  try {
    console.log("[API] Fetching data for teacher code:", teacherCode);

    const url = `${API_BASE_URL}/teacher/${teacherCode}/complete/`;
    console.log("[API] URL:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("[API] Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[API] Error response:", errorText);
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log("[API] Successfully fetched data:", data);

    // Validation to avoid undefined api_usage
    if (!data.api_usage) {
      console.warn("[API] WARNING: api_usage missing from backend!");
      data.api_usage = {
        limit: 0,
        used: 0,
        remaining: 0,
        usage_percentage: 0,
        reset_date: new Date().toISOString(),
        damini_ai: { total_calls: 0, student_calls: 0, teacher_calls: 0, description: "" },
        project_builder: { total_calls: 0, student_calls: 0, teacher_calls: 0, description: "" },
        damini_usage: { total_usage: 0, student_usage: 0, teacher_usage: 0, percentage: 0, description: "" },
        project_builder_usage: { total_usage: 0, student_usage: 0, teacher_usage: 0, percentage: 0, description: "" },
      };
    }

    return data;
  } catch (error: any) {
    console.error("[API] Error:", error.message || error);
    throw new Error(error.message || "Failed to fetch teacher data");
  }
}