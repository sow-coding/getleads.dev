"use client"
import {  useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import { CircleUser, Facebook, Linkedin, Menu, Package2, Search, Star, Twitter, UserSearch } from "lucide-react"

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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { logout } from "@/app/login/actions"
import X from "@mui/icons-material/X"
import { Badge } from "../ui/badge"
import CircularProgressComponent from "../nextui/circularProgress"

function OrganizationPage() {
  const searchParams = useSearchParams()
  const searchId = searchParams.get("searchId")
  const id = searchParams.get("id")
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [entity, setEntity] = useState()
  const [favorite, setFavorite] = useState(false)
  const [technologies, setTechnologies] = useState([])

  async function deleteFavorites () {
    const response = await fetch('/api/deleteFavorites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: id })
    });
    if (!response.ok) {
      console.error(`Failed to fetch search results: ${response.statusText}`);
    }
  }

  async function postFavorites () {
    const reponseUserId = await fetch("/api/getUserId", {
      next: {tags: ["userId"]},
      cache: "force-cache"
    })
    const userId = await reponseUserId.json()
    const response = await fetch('/api/postFavorites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId: userId, id: id, organization: entity })
    });
    if (!response.ok) {
      console.error(`Failed to fetch search results: ${response.statusText}`);
    }
  }

  useEffect(() => {
    const getOrganization = async () => {
        if (!searchId) {
          // Si aucun searchId n'est fourni, rediriger ou gérer l'erreur
          router.push("/search")
          return;
        }
        const response = await fetch(`/api/getOrganization?searchId=${searchId}&id=${id}`, {
          next: {tags: ["organization"]},
          cache: "force-cache",
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });
  
        if (!response.ok) {
          console.error(`Failed to fetch search results: ${response.statusText}`);
          // Gérer l'erreur ici, par exemple en affichant un message d'erreur à l'utilisateur
          setLoading(false);
          return;
        }
        
        setLoading(false);
        const data = await response.json();
        return data;    
    }
    const enrichOrganization = async () => {
      const domain = await getOrganization()
      const response = await fetch(`/api/enrichOrganizationByDb?id=${id}`, {
        cache: "force-cache",
        next: {tags: ["enrichOrganization"]},
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        const response = await fetch('/api/enrichOrganization', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ domain: domain})
        });
        if (!response.ok) {
          console.error(`Failed to fetch search results: ${response.statusText}`);
          // Gérer l'erreur ici, par exemple en affichant un message d'erreur à l'utilisateur
        }
        const data = await response.json();
        setEntity(data?.organization);
        setLoading(false);
        return;
      }
      const data = await response.json();
      setEntity(data?.organization);

      const faouriteRes = await fetch(`/api/isFavorite?id=${id}`, {
        cache: "force-cache",
        next: {tags: ["isFavorite"]},
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        console.error(`Failed to fetch search results: ${response.statusText}`);
      }
      const favouriteData = await faouriteRes.json();
      if (favouriteData?.isFavorite) {
        setFavorite(true)
      }
      setLoading(false);
    }
    enrichOrganization()
  }, [searchId, id, router, entity?.website_url])

  useEffect(() => {
    async function getTechnologies () {
      const response = await fetch(`/api/getTechnologies?website=${entity?.website_url}`, {
        cache: "force-cache",
        next: {tags: ["technologies"]},
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        console.error(`Failed to fetch search results: ${response.statusText}`);
      }
      const data = await response.json();
      setTechnologies(data?.technologies);
    }
    if (entity) {
      const fetchTechnologies = async () => {
        await getTechnologies();
      };

      fetchTechnologies();
    }
  }, [entity]);

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
                href="/dashboard"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <UserSearch color="#0a55e1"/>
                <span className="sr-only">getleads.dev</span>
              </Link>
              <Link href="dashboard" className="text-muted-foreground hover:text-foreground">
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
        {loading ?  <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <CircularProgressComponent />
      </main> : <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto flex justify-between w-full max-w-6xl gap-2 max-sm:flex-col">
            <h1 className="text-3xl font-semibold">{entity?.name}</h1>
            <div className="actions flex items-center max-sm:my-4">
            <Button onClick={() => {
              router.push(`/search/${entity?.name}/decisionMakers?id=${entity?.id}&name=${entity?.name}&searchId=${searchId}`)
            }}>See the decision-makers</Button>
            { favorite ? <Star className="ml-5 cursor-pointer" color="#8400db" onClick={() => {
              deleteFavorites()
              setFavorite(false)
            }}/> : <Star className="ml-5 cursor-pointer" onClick={() => {
              postFavorites()
              //changer ce revalidateIsFavorite pour revalidate
              revalidateIsFavorite()
              setFavorite(true)
            }}/>}
            </div>
        </div>
        <div className="grid gap-6">
            <Card x-chunk="dashboard-04-chunk-1">
              <CardHeader>
                <CardTitle>Informations</CardTitle>
                <CardDescription>
                Some general information about {`${entity?.name}`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">

                  {entity?.short_description && <div className="description">
                    <p>{entity?.short_description}</p>
                  </div>}

                  {entity?.raw_address && <div className="locations flex items-center">
                    <p>{entity?.raw_address}</p>
                  </div>}
                  {entity?.industries?.length > 0 && <div className="industries flex items-center flex-wrap">
                    {entity?.industries?.map((industry, index) => (
                      <span key={index} className="inline-block mr-3 px-2 py-1 text-xs font-semibold bg-primary text-primary-foreground rounded-full">
                        {industry}
                      </span>
                    ))}
                  </div>}
                  {entity?.estimated_num_employees && <div className="employees flex items-center">
                    <p>Estimated number of employees: </p>
                    <span className="ml-3 inline-block px-2 py-1 text-xs font-semibold bg-primary text-primary-foreground rounded-full">
                          {entity?.estimated_num_employees}
                    </span>
                  </div>}
                  {entity?.primary_domain && <div className="domain">
                    <Button size="sm" onClick={() => {
                      window.open(`https://${entity?.primary_domain}`, '_blank')
                    } }>
                      {entity?.primary_domain}
                    </Button>
                  </div>}
                </div>
              </CardContent>
            </Card>

            <Card x-chunk="dashboard-04-chunk-2">
              <CardHeader>
                <CardTitle>Social networks</CardTitle>
                <CardDescription>
                Go check {`${entity?.name}'s`} networks to find out more about them
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center w-full">
                                
                {entity?.facebook_url && <a className="mx-2" href={`${entity?.facebook_url}`} target="_blank">
                <Facebook />
                </a>}
                
                {entity?.linkedin_url && <a className="mx-2" href={`${entity?.linkedin_url}`} target="_blank">
                <Linkedin />
                </a>}

                {entity?.twitter_url && <a className="mx-2" href={`${entity?.twitter_url}`} target="_blank">
                <X />
                </a>}

                </div>
              </CardContent>
            </Card>

            <Card x-chunk="dashboard-04-chunk-3">
              <CardHeader>
                <CardTitle>Full stack</CardTitle>
                <CardDescription>
                Here are the stack elements found for {`${entity?.name}`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center w-full flex-wrap">
                    {technologies?.length > 0 && technologies?.map((technology, index) => (
                      <Badge className="mx-2 my-2" key={technology.slug}>{technology.name}</Badge>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        }
    </div>
  )
}

export default OrganizationPage