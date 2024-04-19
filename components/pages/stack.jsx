"use client"
import Link from "next/link"
import { CircleUser, Menu, Package2, Search } from "lucide-react"
import { saveSearchResults, verifyOrganizationsWithStack, verifyOrganizationsWithStackApollo } from "../../app/api/actions"
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
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import StackAutocomplete from "../nextui/stackAutocomplete"
import { useStackContext } from "@/contexts/stack.context"
import { useState } from "react"
import { useFiltersContext } from "@/contexts/filters.context"
import { useRouter } from "next/navigation"

export function StackPage () {
  const { stack } = useStackContext()
  const {countries, cities, sizes, industries} = useFiltersContext()
  const [stackHere, setStackHere] = useState([]);
  const router = useRouter()

  //integrer pour API Apollo
  const handleVerifyOrganizations = async () => {
    try {
      /*const response = await fetch('/api/searchOrganizations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          countries: countries,
          cities: cities,
          sizes: sizes,
          industries: industries
        })
      });*/
      const response = await fetch("/api/searchOrganizationsApollo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          countries: countries,
          sizes: sizes,
          industries: industries
        }),
      
      })
  
      if (!response.ok) {
        throw new Error(`Failed to fetch organizations: ${response.statusText}`);
      }
  
      //const crunchbaseResponse = await response.json();
      const apolloResponse = await response.json();
      const apolloOrganizations = apolloResponse.organizations;
      //const result = await verifyOrganizationsWithStack(crunchbaseResponse, stack);
      const result = await verifyOrganizationsWithStackApollo(apolloOrganizations, stack);
      const { id, entities } = result;  // Déstructuration pour obtenir l'ID et les entités
      console.log("Entities:", entities);
      const searchFilters = { countries, cities, sizes, industries, stack };  // Créer un objet de filtres de recherche
      entities?.length > 0 ? await saveSearchResults(id, entities, searchFilters) : router.push("/search?empty=yes") // Sauvegarder les résultats avec l'ID pour référence future
      router.push(`/search/results/search?id=${id}`);
    } catch (error) {
      console.error("Failed to verify organizations:", error);
      router.push("/error")
    }
  };
  
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
            Search
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
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Search</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav
            className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0"
          >
            <Link href="#">
              Organizations
            </Link>
            <Link href="#" className="font-semibold text-primary">Stack</Link>
            <Link href="#">People</Link>
            <Link href="#">Contact</Link>
          </nav>

          <div className="grid gap-6">
            <Card x-chunk="dashboard-04-chunk-1">
              <CardHeader>
                <CardTitle>Tech stack</CardTitle>
                <CardDescription>
                Filter your search: by programming language, frameworks or tools
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="flex max-lg:flex-col items-start">
                  <StackAutocomplete stackHere={stackHere} setStackHere={setStackHere} />
                </form>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button onClick={() => {
                  stack.length > 0 && handleVerifyOrganizations()
                }}>Save</Button>
                <Button style={{backgroundColor: "#FF0000"}} className="mx-4" onClick={() => {
                  setStackHere([])
                }}>Clean</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
