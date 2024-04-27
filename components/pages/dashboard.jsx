"use client"
import Link from "next/link"
import {
  Activity,
  ArrowUpRight,
  Building2,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  UserRound,
  Users,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
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
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useRouter } from "next/navigation"
import { logout } from "@/app/login/actions"
import { useEffect, useState } from "react"

export function Dashboard({userId}) {
  const router = useRouter()
  const [userDecisionMakers, setUserDecisionMakers] = useState([])
  const [organizations, setOrganizations] = useState([])
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    async function fetchUserDecisionMakers() {
      const res = await fetch(`/api/getUserDecisionMakers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId }),
      })
      const data = await res.json()
      setUserDecisionMakers(data)
    }
    async function fetchUserSearches() {
      const res = await fetch(`/api/getUserSearches`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId }),
      })
      const data = await res.json()
      setOrganizations(data)
    }
    async function getFavorites() {
      const res = await fetch(`/api/getFavorites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId }),
      })
      const data = await res.json()
      setFavorites(data)
    }
    fetchUserDecisionMakers()
    fetchUserSearches()
    getFavorites()
  }, [userId])

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
            href="#"
            className="text-foreground transition-colors hover:text-foreground"
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
            href="/feedback"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Feedback
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
              <Link href="#" className="hover:text-foreground">
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
                className="text-muted-foreground hover:text-foreground"
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
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {organizations.slice(0, 3).map((organization, index) => (
            <Card key={index} className="cursor-pointer" x-chunk="dashboard-01-chunk-0" onClick={() => {
              router.push(`/search/organization?searchId=${organization?.searchId}&id=${organization?.organizations_searched[0]?.id}`)
            }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {organization?.organizations_searched[0]?.name}
              </CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="flex flex-col justify-between h-3/5">
              <div className="text-2xl font-bold">{organization?.organizations_searched[0]?.primary_domain}</div>
              
              <div className="flex items-center flex-wrap">
              {organization?.filters?.stack?.map((stack, index) => (
                <Badge key={index} className="text-xs mr-2 mt-2" variant="outline">
                  {stack}
                </Badge>
              ))}
              </div>
            </CardContent>
          </Card>
          ))}
            <Card className="cursor-pointer" x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-2xl font-bold">
                Actions
              </CardTitle>
              <Search className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <Button className="mr-4 mb-3" onClick={() => {
                router.push(`/search/organizations`)
              }}>Start a new search</Button>
              <Button onClick={() => {
                router.push(`/search`)
              }} variant={"outline"}>
                Go to previous search
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card
            className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
          >
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>People</CardTitle>
                <CardDescription>
                  Here are the last people you found.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Decision-makers</TableHead>
                    <TableHead className="hidden xl:table-column">
                      Type
                    </TableHead>
                    <TableHead className="hidden xl:table-column">
                      Status
                    </TableHead>
                    <TableHead className="hidden xl:table-column">
                      Date
                    </TableHead>
                    {userDecisionMakers.length > 0 && <TableHead className="text-right">Company</TableHead>}
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {userDecisionMakers.length > 0 ? userDecisionMakers.slice(0, 5).map((decisionMaker, index) => (
                    <TableRow key={index} className="cursor-pointer" onClick={() => {
                      router.push(`/search/organization/decisionMakers/${decisionMaker?.person?.name}?id=${decisionMaker?.person?.id}`)
                    }}>
                      <TableCell>
                        <div className="font-medium">{decisionMaker?.person?.name}</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          {decisionMaker?.person?.email}
                        </div>
                      </TableCell>
                      <TableCell className="hidden xl:table-column">
                        Sale
                      </TableCell>
                      <TableCell className="hidden xl:table-column">
                        <Badge className="text-xs" variant="outline">
                          Approved
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                        2023-06-23
                      </TableCell>
                      <TableCell className="text-right">{decisionMaker?.person?.organization?.name}</TableCell>
                    </TableRow>
                  )) : <TableRow>
                      <div className="flex flex-col justify-center items-center mt-14 w-full">
                        <h1 className="text-center">
                        You {`haven't`} found any decision makers yet, start a search to remedy this</h1>
                        <Button className="my-4" onClick={() => {
                          router.push(`/search/organizations`)
                        }}>Start a search</Button>  
                      </div>  
                  </TableRow>}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card x-chunk="dashboard-01-chunk-5">
            <CardHeader>
              <CardTitle>Favorites</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
              {favorites.length > 0 ? favorites.slice(0, 5).map((favorite, index) => (
                <div key={index} className="flex items-center gap-4 cursor-pointer">
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                      {favorite?.organization?.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {favorite?.organization?.city}
                    </p>
                  </div>
                  <div className="ml-auto font-medium">
                    <Badge className="text-xs" variant="outline">{favorite?.organization?.industry}</Badge>
                  </div>
                </div>
              )) : <div className="flex items-center gap-4 cursor-pointer">
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                      You {`haven't`} favorited any organizations yet
                    </p>
                  </div>
              </div>}
            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  )
}
