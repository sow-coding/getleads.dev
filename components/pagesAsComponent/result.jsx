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
import { logout } from '@/app/login/actions'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function ResultPage({truncated, userId, email}) {
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

      const response = await fetch(`/api/getSearchResult?searchId=${searchId}`, {
        next: {tags: ["resultPage"]},
        cache: "force-cache",
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
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
                href="/dashboard"
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
                className="hover:text-foreground"
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
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="text-3xl font-semibold">Filters</h1>
      </div>
      <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <nav
          className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0"
        >
        <Link href="#">
          {filters?.sizes?.length > 0 ? filters.sizes.map(size => size.replace(',', '-')).join(', ') : 'N/A'}
        </Link>
        <Link href="#">
          {filters?.stack?.length > 0 ? filters.stack.join(', ') : 'N/A'}
        </Link>
        <Link href="#">
          {filters?.industries?.length > 0 ? filters.industries.map(industry => industry.charAt(0).toUpperCase() + industry.slice(1)).join(', ') : 'N/A'}
        </Link>
        <Link href="#">
          {filters?.cities?.length > 0 ? filters.cities.join(', ') : 'N/A'}
        </Link>
        <Link href="#">
          {filters?.countries?.length > 0 ? filters.countries.join(', ') : 'N/A'}
        </Link>
        </nav>
        <div className="grid gap-6">
          {loading ? (
            <p>Loading...</p> // mettre progress spinner ici
          ) : (
            <>
              <ResultsTable organizations={searchResult} searchId={searchId} />
              {truncated && 
              <Card x-chunk="dashboard-04-chunk-2">
              <CardHeader>
                <CardTitle>Limited result</CardTitle>
                <CardDescription>
                getleads.dev truncates user results in free trial.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                The search results displayed and available to trial period users are limited and are only part of the results for this search. <br />
                To get full access to all results, please upgrade your account.
                </p>
                <div className="flex my-4 max-lg:flex-col">
                <Button type="button" variant={"outline"} className="w-1/2 max-lg:w-full">
                  <a href={`https://swos.lemonsqueezy.com/buy/b46b64ec-9c60-4e5f-968a-1b7ec399e3b0?checkout[custom][nkn]=${userId}&checkout[email]=${email}&checkout[custom][userType]=classic`}>Get classic getleads.dev</a>
                  </Button>
                  <Button type="button" className="w-1/2 max-lg:w-full lg:ml-4 max-lg:mt-4">
                    <a href={`https://swos.lemonsqueezy.com/buy/66a631bf-ef10-443f-9de3-d40ed38f358b?checkout[custom][nkn]=${userId}&checkout[email]=${email}&checkout[custom][userType]=premium`}>Get premium getleads.dev</a>
                  </Button>
                </div>
                <a href="/#pricing" className="mt-4 text-center" style={{textDecoration: "underline"}}>What is the difference between the two?</a>
              </CardContent>
            </Card>
              }
            </>
          )}
        </div>
      </div>
    </main>
  </div>
  )
}

export default ResultPage
