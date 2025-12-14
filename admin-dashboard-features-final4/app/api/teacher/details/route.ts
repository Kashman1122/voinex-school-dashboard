// app/api/teacher/details/route.ts
import { type NextRequest, NextResponse } from "next/server"
import { getTeachersCollection } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const teacherCode = searchParams.get("teacherCode")

    if (!teacherCode) {
      return NextResponse.json(
        { error: "Teacher code is required" },
        { status: 400 }
      )
    }

    const teachersCollection = await getTeachersCollection()
    const teacher = await teachersCollection.findOne({ teacherCode })

    if (!teacher) {
      return NextResponse.json(
        { error: "Teacher not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      school: teacher.school || "",
      teacherName: teacher.teacherName || "",
      teacherEmail: teacher.teacherEmail || "",
      teacherCode: teacher.teacherCode || "",
    })
  } catch (error: any) {
    console.error("[API] Error fetching teacher details:", error)
    return NextResponse.json(
      { error: "Failed to fetch teacher details", details: error.message },
      { status: 500 }
    )
  }
}