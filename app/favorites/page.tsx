import {Favorites} from "@/components/pages/favorites"
import { createClient } from "@/utils/supabase/server"

export default async function FavoritesPage () {
  const supabase = createClient()
  
  const { data, error } = await supabase.auth.getUser()

  return <Favorites userId={data?.user?.id}/>
}
