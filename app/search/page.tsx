import SearchHistory from "@/components/pages/searchHistory";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function SearchHistoryPage () {
  const supabase = createClient()
  
  const { data, error } = await supabase.auth.getUser()
  const userId = data.user?.id

  if (error || !data?.user) {
    redirect("/login")
  } 
  
  return <SearchHistory userId={userId} />
}
