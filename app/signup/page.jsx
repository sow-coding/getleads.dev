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
import { signup } from "../login/actions"
import { useState } from "react"
import {Checkbox} from "@nextui-org/react";


export default function SignUpForm() {
  const [isChecked, setIsChecked] = useState(false)

  function CheckboxComponent () {
    return (
      <div className="flex flex-col gap-2">
        <Checkbox isSelected={isChecked} onValueChange={setIsChecked}>
          I have read and agree to the Terms and Conditions.
        </Checkbox>
      </div>
    );
  }

  return (
    <>
      <Card className="mx-auto max-w-sm mt-6">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <form className="mx-4 my-4">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$" placeholder='Password' title="The password must contain at least one uppercase letter, one lowercase letter, one digit, one symbol and must be at least 8 characters long."/>
          </div>
          <CheckboxComponent />
          <Button formAction={signup} className={`w-full ${isChecked ? "" : "pointer-events-none opacity-40"}`}>
            Create an account
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Login
          </Link>
        </div>
        <div className="mt-4 text-center text-sm">
        <Link href="/terms" className="underline my-2">
            Terms and Conditions
          </Link>
        </div>
      </form>
    </Card>
    </>
  )
}
