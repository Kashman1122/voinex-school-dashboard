import bcrypt from "bcryptjs"
import { getTeachersCollection } from "./mongodb"

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export async function registerTeacher(teacherData: {
  teacherName: string
  teacherEmail: string
  password: string
  teacherCode: string
  school: string
}) {
  const collection = await getTeachersCollection()

  // Check if email already exists
  const existingTeacher = await collection.findOne({ teacherEmail: teacherData.teacherEmail })
  if (existingTeacher) {
    throw new Error("Email already registered")
  }

  // Hash password
  const hashedPassword = await hashPassword(teacherData.password)

  // Create teacher document
  const teacher = {
    teacherName: teacherData.teacherName,
    teacherEmail: teacherData.teacherEmail,
    password: hashedPassword,
    teacherCode: teacherData.teacherCode,
    school: teacherData.school,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const result = await collection.insertOne(teacher)

  return {
    _id: result.insertedId,
    teacherName: teacher.teacherName,
    teacherEmail: teacher.teacherEmail,
    teacherCode: teacher.teacherCode,
    school: teacher.school,
  }
}

export async function loginTeacher(email: string, password: string) {
  const collection = await getTeachersCollection()

  const teacher = await collection.findOne({ teacherEmail: email })
  if (!teacher) {
    throw new Error("Invalid email or password")
  }

  const isPasswordValid = await verifyPassword(password, teacher.password)
  if (!isPasswordValid) {
    throw new Error("Invalid email or password")
  }

  return {
    _id: teacher._id,
    teacherName: teacher.teacherName,
    teacherEmail: teacher.teacherEmail,
    teacherCode: teacher.teacherCode,
    school: teacher.school,
  }
}
