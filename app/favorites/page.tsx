import {Favorites} from "@/components/pagesAsComponent/favorites"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export default async function FavoritesPage () {
  const supabase = createClient()
  
  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect("/login")
  } 

  return <Favorites userId={data?.user?.id}/>
}
