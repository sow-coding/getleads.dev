import ResultPage from "@/components/pagesAsComponent/result"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export default async function Result() {
  const supabase = createClient()
  
  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect("/login")
  } 

  return <ResultPage />
}
