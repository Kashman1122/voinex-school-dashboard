import { type NextRequest, NextResponse } from "next/server"
import { loginTeacher } from "@/lib/auth-utils"
import jwt from "jsonwebtoken"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const teacher = await loginTeacher(email, password)

    const teacherResponse = {
      _id: teacher._id,
      teacherName: teacher.teacherName,
      teacherEmail: teacher.teacherEmail,
      teacherCode: teacher.teacherCode,
      school: teacher.school,
    }

    // Create JWT token
    const token = jwt.sign(
      {
        id: teacher._id,
        email: teacher.teacherEmail,
        teacherCode: teacher.teacherCode,
        school: teacher.school,
      },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "7d" },
    )

    return NextResponse.json({ token, teacher: teacherResponse }, { status: 200 })
  } catch (error: any) {
    console.error("[v0] Login error:", error)
    return NextResponse.json({ error: error.message || "Login failed" }, { status: 401 })
  }
}
