"use client"
import {  useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import { CircleUser, Menu, Package2, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
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
import {Chip} from "@nextui-org/react";

function Organization() {
  const searchParams = useSearchParams()
  const searchId = searchParams.get("searchId")
  const uuid = searchParams.get("uuid")
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [entity, setEntity] = useState({})

  useEffect(() => {
    const getOrganization = async () => {
        if (!searchId) {
          // Si aucun searchId n'est fourni, rediriger ou gérer l'erreur
          router.push("/search")
          return;
        }
        const response = await fetch('/api/getOrganization', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ searchId: searchId, entityUuid: uuid})
        });
  
        if (!response.ok) {
          console.error(`Failed to fetch search results: ${response.statusText}`);
          // Gérer l'erreur ici, par exemple en affichant un message d'erreur à l'utilisateur
          setLoading(false);
          return;
        }
        
        setLoading(false);
        const data = await response.json();
        setEntity(data);
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });       
    }
    getOrganization()
  }, [searchId, uuid, router])

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
        {loading ?  <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
            <h1 className="text-3xl font-semibold">Loading...</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
            
        </div>
        </main> : <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto flex justify-between w-full max-w-6xl gap-2">
            <h1 className="text-3xl font-semibold">{entity?.properties?.identifier?.value}</h1>
            <Button onClick={() => {
              router.push(`/search/${entity?.properties?.identifier?.value}/decisionMakers?domain=${entity?.properties?.website_url}&id=${entity?.uuid}`)
            }}>See the decision-makers</Button>
        </div>

        <div className="mx-auto flex flex-col">

            <div className="description flex w-full">
              <p className="w-full font-semibold">{entity?.properties?.short_description}</p>
            </div>

            <div style={{margin: "10px 0"}}>
              <h1 style={{fontSize: "20px", fontWeight: "bold"}}>Industries</h1>
              <div style={{display: "flex", width: "100%"}} className="industries">
              {entity?.properties?.categories.map((industry, index) => (
                <Chip style={{margin: "10px 5px"}} key={index}>{industry.value}</Chip>
              ))}
              </div>
            </div>

            <div style={{margin: "10px 0"}}>
              <h1 style={{fontSize: "20px", fontWeight: "bold"}}>Locations</h1>
              <div style={{display: "flex", width: "100%"}} className="locations">
              {entity?.properties?.location_identifiers.map((location, index) => (
                <Chip style={{margin: "10px 5px"}} key={index}>{location.value}</Chip>
              ))}
              </div>
            </div>

        </div>

        </main>
        }
    </div>
  )
}

export default Organization