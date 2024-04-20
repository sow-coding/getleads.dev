"use client"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"
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


function DecisionMaker () {
    const searchParams = useSearchParams()
    const id = searchParams.get("id")
    const [decisionMaker, setDecisionMaker] = useState([])
    const [loading, setLoading] = useState(true)
    const [email, setEmail] = useState({})
    const [deliverableEmail, setDeliverableEmail] = useState({})

    async function emailVerification() {
        const response = await fetch(`/api/emailVerification`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: decisionMaker?.person?.email
            })
        })
        if (!response.ok) {
            throw new Error("Failed to verify email" + response.text())
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
    
    useEffect(() => {
        async function getDecisionMakers() {
            const response = await fetch(`/api/getSoloDecisionMaker`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: id
                })
            
            })
            const data = await response.json()
            setDecisionMaker(data)
            setLoading(false)
        }
        getDecisionMakers()
    }, [id])

return (
    <div className="flex min-h-screen w-full flex-col">
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
            >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
            </Link>
            <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
            >
            Dashboard
            </Link>
            <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
            >
            Orders
            </Link>
            <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
            >
            Products
            </Link>
            <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
            >
            Customers
            </Link>
            <Link
            href="#"
            className="text-foreground transition-colors hover:text-foreground"
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
                <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
                >
                Dashboard
                </Link>
                <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
                >
                Orders
                </Link>
                <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
                >
                Products
                </Link>
                <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
                >
                Customers
                </Link>
                <Link href="#" className="hover:text-foreground">
                Settings
                </Link>
            </nav>
            </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                />
            </div>
            </form>
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
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
        </div>
        </header>
         { loading ? <h1>Loading...</h1> : 
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
                <Link href="#">{decisionMaker?.person?.city}</Link>
                </nav>
                <div className="grid gap-6">
                <Card x-chunk="dashboard-04-chunk-1">
                    <CardHeader>
                    <CardTitle>Contact</CardTitle>
                    <CardDescription>
                        Used to identify your store in the marketplace.
                    </CardDescription>
                    </CardHeader>
                    <CardContent>
                    <form>
                        <p>{decisionMaker?.person?.email}</p>
                    </form>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4">
                    <Button onClick={() => {
                        emailVerification()
                    }}>Verify</Button>
                    </CardFooter>
                </Card>
                </div>
            </div>

            { email?.data?.result && <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
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
                        getEmail()
                    }}>Get a deliverable email</Button>
                    </CardFooter>
                    }
                </Card>
                </div>
            </div>}

            { deliverableEmail?.data?.score && <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
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
                </div>
            </div>}
            </main>
         }
    </div>
    )
}

export default DecisionMaker