"use client"
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
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
import { ResultsTable } from "@/components/nextui/resultsTable"

function Result() {
  const searchparams = useSearchParams()
  const searchId = searchparams.get('id')
  const [searchResult, setSearchResult] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [filters, setFilters] = React.useState({})
  const router = useRouter()
  
  useEffect(() => {
    const getSearchResult = async () => {
      if (!searchId) {
        // Si aucun searchId n'est fourni, rediriger ou gérer l'erreur
        router.push("/search")
        return;
      }

      const response = await fetch('/api/getSearchResult', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ searchId })
      });

      if (!response.ok) {
        console.error(`Failed to fetch search results: ${response.statusText}`);
        // Gérer l'erreur ici, par exemple en affichant un message d'erreur à l'utilisateur
        setLoading(false);
        return;
      }

      const data = await response.json();
      setSearchResult(data.organizations_searched);
      setFilters(data.filters);
      setLoading(false);
    };

    getSearchResult();
  }, [searchId, router]);

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
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="text-3xl font-semibold">Filters</h1>
      </div>
      <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <nav
          className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0"
        >
          {/* Afficher filtres de recherche ici
          */}
          <Link href="#">
            {filters?.sizes?.map((size) => (
              <span key={size}>{size}</span>
            ))}
          </Link>
          <Link href="#">
            {filters?.stack?.map((stack) => (
              <span key={stack}>{stack}</span>
            ))}
          </Link>
          <Link href="#">
            {filters?.industries?.map((industry) => (
              <span key={industry}>{industry}</span>
            ))}
          </Link>
          <Link href="#">
            {filters?.cities?.map((city) => (
              <span key={city}>{city}</span>
            ))}
          </Link>
          <Link href="#">
            {filters?.countries?.map((country) => (
              <span key={country}>{country}</span>
            ))}
          </Link>
        </nav>
        <div className="grid gap-6">
          {loading ? (
            <p>Loading...</p> // mettre progress spinner ici
          ) : (
            <ResultsTable organizations={searchResult} searchId={searchId} />
          )}
        </div>
      </div>
    </main>
  </div>
  )
}

export default Result