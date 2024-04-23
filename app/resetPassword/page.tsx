"use client"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function ResetPassword() {
    const [email, setEmail] = useState("")
    const router = useRouter()
    async function forgotPassword() {
      const response = await fetch("/api/resetPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email
      })
    })
    if (response.ok) {
      alert("Password reset email sent")
      router.push("/login")
    }
  }
  return (
    <Card className="mx-auto max-w-sm mt-6">
      <CardHeader>
        <CardTitle className="text-2xl">Reset your password</CardTitle>
        <CardDescription>
          Enter a new password for your account
        </CardDescription>
      </CardHeader>
      <form className='mx-4 my-4'>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name='email'
              placeholder="m@example.com"
              required
              onChange={(e) => {
                setEmail(e.currentTarget.value)
              }}
            />
          </div>
          <Button onClick={() => {
            forgotPassword()
          }} type="button" className="w-full">
            Reset my password
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="underline">
            Sign up
          </Link>
        </div>
      </form>
    </Card>
  )
}