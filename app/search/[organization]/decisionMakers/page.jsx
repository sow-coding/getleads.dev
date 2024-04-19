"use client"
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
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

function DecisionMakers() {
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
                    id: id
                })
            
            })
            const data = await response.json()
            setDecisionMakers(data?.people)
            setLoading(false)
        }
        getDecisionMakers()
    }, [id])

return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <Sheet>
            <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
                <nav className="grid gap-6 text-lg font-medium">
                <Link
                    href="#"
                    className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                    <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                    <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                    href="#"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                    <Home className="h-5 w-5" />
                    Dashboard
                </Link>
                <Link
                    href="#"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                    <ShoppingCart className="h-5 w-5" />
                    Orders
                </Link>
                <Link
                    href="#"
                    className="flex items-center gap-4 px-2.5 text-foreground"
                >
                    <Package className="h-5 w-5" />
                    Products
                </Link>
                <Link
                    href="#"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                    <Users2 className="h-5 w-5" />
                    Customers
                </Link>
                <Link
                    href="#"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                    <LineChart className="h-5 w-5" />
                    Settings
                </Link>
                </nav>
            </SheetContent>
            </Sheet>
            <Breadcrumb className="hidden md:flex">
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
            <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
            />
            </div>
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
                >
                <Image
                    src="/placeholder-user.jpg"
                    width={36}
                    height={36}
                    alt="Avatar"
                    className="overflow-hidden rounded-full"
                />
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
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Tabs defaultValue="all">

            <div className="flex items-center">
                <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Decision-makers</TabsTrigger>
                {/* RAJOUTER LE FILTRAGE */}
                </TabsList>
                <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-7 gap-1">
                        <ListFilter className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Filter
                        </span>
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>
                        Active
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                        Archived
                    </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Button size="sm" variant="outline" className="h-7 gap-1">
                    <File className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Export
                    </span>
                </Button>
                <Button size="sm" className="h-7 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Product
                    </span>
                </Button>
                </div>
            </div>

            {loading ? <h1>Loading...</h1> : 
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
                        <TableHead className="hidden w-[100px] sm:table-cell">
                            <span className="sr-only">Image</span>
                        </TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead className="hidden md:table-cell">
                            Seniority
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                            Linkedin
                        </TableHead>
                        <TableHead>
                            <span className="sr-only">Actions</span>
                        </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        
                        {decisionMakers.map((decisionMaker) => (
                            <TableRow key={decisionMaker?.id} onClick={() => {
                                router.push(`/search/organization/decisionMakers/${decisionMaker?.name}?id=${decisionMaker?.id}`)
                            }}>
                                <TableCell className="font-medium">
                                    {decisionMaker?.name}
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline">{decisionMaker?.departments[0]}</Badge>
                                </TableCell>
                                <TableCell>{decisionMaker?.title}</TableCell>
                                <TableCell className="hidden md:table-cell">
                                    {decisionMaker?.seniority}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
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
                                        <DropdownMenuItem>Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </CardContent>
                <CardFooter>
                </CardFooter>
                </Card>
            </TabsContent>
            }
            </Tabs>
        </main>
        </div>
    </div>
    )
}


export default DecisionMakers