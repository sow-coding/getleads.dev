import FeedbackPage from "@/components/pagesAsComponent/feedback"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export default async function Feedback() {
  const supabase = createClient()
  
  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect("/login")
  } 

  return <FeedbackPage />
}
