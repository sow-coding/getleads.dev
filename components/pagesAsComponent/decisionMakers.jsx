"use client"
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Image from "next/image"
import Link from "next/link"
import {
    CircleUser,
    File,
    History,
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
    Star,
    UserSearch,
    Users2,
    } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
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
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { logout } from '@/app/login/actions'
import CircularProgressComponent from '../nextui/circularProgress'

function DecisionMakersPage () {
    const searchParams = useSearchParams()
    const id = searchParams.get("id")
    const name = searchParams.get("name")
    const [loading, setLoading] = useState(true)
    const [decisionMakers, setDecisionMakers] = useState([])
    const router = useRouter()

    useEffect(() => {
        async function getDecisionMakers() {
            const response = await fetch(`/api/getDecisionMakers`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: id,
                })
            
            })
            const data = await response.json()
            setDecisionMakers(data?.people)
            setLoading(false)
        }
        async function getDecisionMakersWithDb() {
            const response = await fetch(`/api/getDecisionMakersWithDb?id=${id}`, {
              cache: "force-cache",
              next: {tags: ["decisionMakers"]},
              method: "GET",
              headers: {
                  "Content-Type": "application/json"
              }
            })
            const data = await response.json()
            if(!data.decisionMakers) {
                getDecisionMakers()
                return
            }
            setDecisionMakers(data.decisionMakers)
            setLoading(false)   
        }
        getDecisionMakersWithDb()
    }, [id])

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <div className="flex items-center">
            <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <UserSearch color="#0a55e1"/>
                  <span className="sr-only">getleads.dev</span>
                </Link>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="/search/organizations"
                  className="flex items-center gap-4 px-2.5 text-foreground"
                >
                  <Search className="h-5 w-5" />
                  Search
                </Link>
                <Link
                  href="/search"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <History className="h5 w-5" />
                  History
                </Link>
                <Link
                  href="/favorites"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Star className="h-5 w-5" />
                  Favorites
                </Link>
                <Link
                  href="/settings"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Settings className="h-5 w-5" />
                  Settings
                </Link>
              </nav>
            </SheetContent>
            </Sheet>
            <Breadcrumb className="hidden md:flex" style={{marginLeft: "10px"}}>
            <BreadcrumbList>
                <BreadcrumbItem>
                <BreadcrumbLink asChild>
                    <Link href="#">Search</Link>
                </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                <BreadcrumbLink asChild>
                    <Link href="#">Organization</Link>
                </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                <BreadcrumbPage>{id}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
            </Breadcrumb>
            </div>

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
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Tabs defaultValue="all">

            <div className="flex items-center">
                <TabsList>
                <TabsTrigger value="all">Decision-makers</TabsTrigger>
                </TabsList>
            </div>

            {loading ? <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <CircularProgressComponent />
      </main> : 
            <>
            <TabsContent value="all">
            <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
                <CardTitle>People - {name}</CardTitle>
                <CardDescription>
                    {` Don't `}waste your time and contact the right people directly, the decision makers.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Department</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>
                                Seniority
                            </TableHead>
                            <TableHead>
                                Linkedin
                            </TableHead>
                            <TableHead>
                                <span className="sr-only">Actions</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {decisionMakers
                          .filter(decisionMaker => 
                            decisionMaker?.departments?.includes("c_suite") ||
                            decisionMaker?.subdepartments?.includes("founder") ||
                            decisionMaker?.headline?.toLowerCase().includes("chief") ||
                            decisionMaker?.headline?.toLowerCase().includes("founder") ||
                            decisionMaker?.headline?.toLowerCase().includes("co-founder") ||
                            decisionMaker?.headline?.toLowerCase().includes("cto") ||
                            decisionMaker?.headline?.toLowerCase().includes("ceo") ||
                            decisionMaker?.headline?.toLowerCase().includes("director") ||
                            decisionMaker?.headline?.toLowerCase().includes("head") ||
                            decisionMaker?.title?.toLowerCase().includes("director") ||
                            decisionMaker?.title?.toLowerCase().includes("chief") ||
                            decisionMaker?.title?.toLowerCase().includes("founder") ||
                            decisionMaker?.title?.toLowerCase().includes("co-founder") ||
                            decisionMaker?.title?.toLowerCase().includes("cto") ||
                            decisionMaker?.title?.toLowerCase().includes("ceo") ||
                            decisionMaker?.title?.toLowerCase().includes("head") ||
                            decisionMaker?.seniority?.toLowerCase().includes == "founder" ||
                            decisionMaker?.seniority?.toLowerCase().includes == "director" ||
                            decisionMaker?.seniority?.toLowerCase().includes == "head" 
                          )
                          .map((decisionMaker) => (
                                <TableRow key={decisionMaker?.id}>
                                    <TableCell className="font-medium">
                                        {decisionMaker?.name}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{decisionMaker?.departments[0]}</Badge>
                                    </TableCell>
                                    <TableCell>{decisionMaker?.title}</TableCell>
                                    <TableCell>
                                        {decisionMaker?.seniority}
                                    </TableCell>
                                    <TableCell>
                                        <a target='_blank' href={`${decisionMaker?.linkedin_url}`}>
                                            <Button color='primary'>Linkedin</Button>
                                        </a>
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    aria-haspopup="true"
                                                    size="icon"
                                                    variant="ghost"
                                                >
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">Toggle menu</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem onClick={(e) => {
                                                    e.stopPropagation()
                                                    router.push(`/search/organization/decisionMakers/${decisionMaker?.name}?id=${decisionMaker?.id}`)
                                                }}>Contact</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </CardContent>

        </Card>
            </TabsContent>

            </>
            
            }
            </Tabs>
        </main>
        </div>
    </div>
    )
}


export default DecisionMakersPage