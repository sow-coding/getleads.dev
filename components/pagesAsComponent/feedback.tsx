"use client"
import Link from "next/link"
import { CircleUser, Menu, Package2, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useRouter } from "next/navigation"
import { logout } from "@/app/login/actions"

export default function FeedbackPage () {
    const router = useRouter()
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">getleads.dev</span>
          </Link>
          <Link
            href="/dashboard"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Dashboard
          </Link>
          <Link
            href="/search/organizations"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Search
          </Link>
          <Link
            href="/search"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            History
          </Link>
          <Link
            href="/favorites"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Favorites
          </Link>
          <Link
            href="#"
            className="text-foreground transition-colors hover:text-foreground"
          >
            Feedback
          </Link>
          <Link
            href="/settings"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Settings
          </Link>
        </nav>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">getleads.dev</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                Dashboard
              </Link>
              <Link
                href="/search/organizations"
                className="text-muted-foreground hover:text-foreground"
              >
                Search
              </Link>
              <Link
                href="/search"
                className="text-muted-foreground hover:text-foreground"
              >
                History
              </Link>
              <Link
                href="/favorites"
                className="text-muted-foreground hover:text-foreground"
              >
                Favorites
              </Link>
              <Link
                href="/feedback"
                className="hover:text-foreground"
              >
                Feedback
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex justify-end w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => {
                router.push("/settings")
              }}>Settings</DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                router.push("/support")
              }}>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => {
                logout()
              }}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Feedback</h1>
        </div>
        <div className="mx-auto w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <div className="grid gap-6 w-full">
            <Card x-chunk="dashboard-04-chunk-1 w-full">
              <CardHeader>
                <CardTitle>Contact</CardTitle>
                <CardDescription>
                    {`Don't`} hesitate to leave me feedback and ask me for new features by contacting me at this email address:
                </CardDescription>
              </CardHeader>
              <CardContent>
                <h1 className="text-3xl font-semibold">saikou@getleads.dev</h1>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}