import { MongoClient } from "mongodb"

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb+srv://voinex:Harekrishna123@voinex.vglp6qk.mongodb.net/?appName=voinex"

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable")
}

let client: MongoClient | null = null
let db: any = null

export async function connectToDatabase() {
  try {
    if (client && db) {
      return { client, db }
    }

    client = new MongoClient(MONGODB_URI)
    await client.connect()
    db = client.db("voinex")

    console.log("[v0] Connected to MongoDB")
    return { client, db }
  } catch (error) {
    console.error("[v0] MongoDB connection error:", error)
    throw error
  }
}

export async function getTeachersCollection() {
  const { db } = await connectToDatabase()
  return db.collection("teachers")
}
