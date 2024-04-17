"use client"
import { useSearchParams } from "next/navigation"

function Organization() {
  const searchParams = useSearchParams()
  const uuid = searchParams.get("uuid")

  return (
    <h1>{uuid}</h1>
  )
}

export default Organization