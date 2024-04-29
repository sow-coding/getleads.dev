import DecisionMakersPage from "@/components/pagesAsComponent/decisionMakers"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export default async function Feedback() {
  const supabase = createClient()
  
  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect("/login")
  } else if (data.user.user_metadata?.userType == "free") {
    redirect("/notInFreeTrial")
  }
  return <DecisionMakersPage />
}
