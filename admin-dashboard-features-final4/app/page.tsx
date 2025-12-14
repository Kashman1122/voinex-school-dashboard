// "use client"

// import { useEffect } from "react"
// import { useRouter } from "next/navigation"

// export default function Home() {
//   const router = useRouter()

//   useEffect(() => {
//     const token = localStorage.getItem("authToken")
//     if (token) {
//       router.push("/dashboard")
//     } else {
//       router.push("/login")
//     }
//   }, [router])

//   return null
// }

"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("authToken")
    router.replace(token ? "/dashboard" : "/login")
  }, [router])

  return <p>Redirecting...</p>
}
