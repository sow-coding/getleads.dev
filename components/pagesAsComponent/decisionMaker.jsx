"use client"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import {
    File,
    Home,
    LineChart,
    ListFilter,
    MoreHorizontal,
    Package,
    Package2,
    PanelLeft,
    PlusCircle,
    Search,
    Settings,
    ShoppingCart,
    UserSearch,
    Users2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { CircleUser, Menu } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { logout } from "@/app/login/actions"
import CircularProgressComponent from "../nextui/circularProgress"


function DecisionMakerPage ({ verifyRight }) {
    const searchParams = useSearchParams()
    const id = searchParams.get("id")
    const [decisionMaker, setDecisionMaker] = useState([])
    const [loading, setLoading] = useState(true)
    const [email, setEmail] = useState({})
    const [deliverableEmail, setDeliverableEmail] = useState({})
    const router = useRouter()
    async function emailVerification() {
        const response = await fetch(`/api/emailVerification`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id,
                email: decisionMaker?.person?.email
            })
        })
        if (!response.ok) {
            throw new Error("Failed to verify email" + response.text())
        }
        const data = await response.json()
        setEmail(data)    
    }

    async function emailVerificationByDb() {
        const response = await fetch(`/api/emailVerificationByDb?id=${id}`, {
            next: {tags: ["emailVerificationByDb"]},
            cache: "force-cache",
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        if (!response.ok) {
            emailVerification()
        }
        const data = await response.json()
        setEmail(data)    
    }

    async function getEmail () {
        const response = await fetch(`/api/getEmail`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName: decisionMaker?.person?.first_name,
                lastName: decisionMaker?.person?.last_name,
                domain: decisionMaker?.person?.organization?.primary_domain
            })
        })
        if (!response.ok) {
            throw new Error("Failed to verify email" + response.text())
        }
        const data = await response.json()
        setDeliverableEmail(data)   
    }

    async function getEmailByDb () {
        const response = await fetch(`/api/getDeliverableEmailByDb?id=${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        if (!response.ok) {
            getEmail()
        }
        const data = await response.json()
        setDeliverableEmail(data)
    }
    
    useEffect(() => {
        async function getDecisionMaker() {
            const userIdResponse = await fetch("/api/getUserId")
            const userId = await userIdResponse.json()
            const response = await fetch(`/api/getSoloDecisionMaker`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: id,
                    userId: userId
                })
            })
            if (!response.ok) {
                throw new Error("Failed to verify email" + response.text())
            }
            const data = await response.json()
            setDecisionMaker(data)
            setLoading(false)
        }
        async function getDecisionMakerByDb() {
            const response = await fetch(`/api/getSoloDecisionMakerByDb?id=${id}`, {
                next: {tags: ["soloDecisionMaker"]},
                cache: "force-cache",
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            })
            if (!response.ok) {
                getDecisionMaker()
            }
            const data = await response.json()
            setDecisionMaker(data)
            setLoading(false)
        }
        getDecisionMakerByDb()
    }, [id])

    return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <UserSearch color="#0a55e1"/>
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
            className="text-foreground transition-colors hover:text-foreground"
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
                <UserSearch color="#0a55e1"/>
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
         { loading ? <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <CircularProgressComponent />
      </main> : 
            <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
            <div className="mx-auto grid w-full max-w-6xl gap-2">
                <h1 className="text-3xl font-semibold">{decisionMaker?.person?.name}</h1>
            </div>
            <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                <nav
                className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0"
                >
                <Link href="#">
                    {decisionMaker?.person?.title}
                </Link>
                <Link href="#">{decisionMaker?.person?.organization?.name}</Link>
                <Link href="#">{decisionMaker?.person?.city}</Link>
                <Link href="#">{decisionMaker?.person?.country}</Link>
                {decisionMaker?.person?.linkedin_url && <a href={`${decisionMaker?.person?.linkedin_url}`} target="_blank">
                  <Badge variant={"outline"}>Linkedin</Badge>
                  </a>}
                <a href={`${decisionMaker?.person?.organization?.website_url}`} target="_blank">
                  <Badge variant={"outline"}>{decisionMaker?.person?.organization?.primary_domain}</Badge>
                </a>
                </nav>
                <div className="grid gap-6">
                <Card x-chunk="dashboard-04-chunk-1">
                    <CardHeader>
                    <CardTitle>Contact</CardTitle>
                    <CardDescription>
                        Ok, now {`it's`} in your hands
                    </CardDescription>
                    </CardHeader>
                    <CardContent>
                    <form>
                        <p>{decisionMaker?.person?.email}</p>
                    </form>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4">
                    <Button onClick={() => {
                        verifyRight ? emailVerificationByDb() : router.push("/onlyPremium")
                    }}>Verify</Button>
                    </CardFooter>
                </Card>

                { email?.data?.result && 
                <div className="grid gap-6">
                <Card x-chunk="dashboard-04-chunk-1">
                    <CardHeader>
                    <CardTitle>Email verification</CardTitle>
                    <CardDescription>
                        {`Your turn now :)`}
                    </CardDescription>
                    </CardHeader>
                    <CardContent>
                    <form>
                        <p>{email?.data?.result.charAt(0).toUpperCase() + email?.data?.result.slice(1)}</p>
                        <div className="flex items-center">
                            <p style={{margin: "5px 7px 5px 0"}}>Score</p>
                            <Badge>{email?.data?.score}</Badge>
                        </div>
                    </form>
                    </CardContent>
                    { email?.data?.result == "undeliverable" && 
                    <CardFooter className="border-t px-6 py-4">
                    <Button onClick={() => {
                        getEmailByDb()
                    }}>Get a deliverable email</Button>
                    </CardFooter>
                    }
                </Card>
                </div>}

            { deliverableEmail?.data?.score && 
                <div className="grid gap-6">
                <Card x-chunk="dashboard-04-chunk-1">
                    <CardHeader>
                    <CardTitle>Deliverable email</CardTitle>
                    <CardDescription>
                        {`You're almost there`}
                    </CardDescription>
                    </CardHeader>
                    <CardContent>
                    <form>
                        <p>{deliverableEmail?.data?.email}</p>
                        <div className="flex items-center">
                            <p style={{margin: "5px 7px 5px 0"}}>Score</p>
                            <Badge>{deliverableEmail?.data?.score}</Badge>
                        </div>
                    </form>
                    </CardContent>
                </Card>
                </div>}
                </div>
            </div>
            </main>
         }
    </div>
    )
}

export default DecisionMakerPage