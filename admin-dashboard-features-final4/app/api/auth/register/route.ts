import { type NextRequest, NextResponse } from "next/server"
import { registerTeacher } from "@/lib/auth-utils"
import jwt from "jsonwebtoken"

export async function POST(request: NextRequest) {
  try {
    const { teacherName, teacherEmail, password, teacherCode, school } = await request.json()

    if (!teacherName || !teacherEmail || !password || !teacherCode || !school) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    const teacher = await registerTeacher({
      teacherName,
      teacherEmail,
      password,
      teacherCode,
      school,
    })


    console.log(teacher)

    
    // Create JWT token
    const token = jwt.sign(
      {
        id: teacher._id,
        email: teacher.teacherEmail,
        school: teacher.school,
      },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "7d" },
    )

    return NextResponse.json({ token, teacher }, { status: 201 })
  } catch (error: any) {
    console.error("[v0] Registration error:", error)
    return NextResponse.json({ error: error.message || "Registration failed" }, { status: 400 })
  }
}
