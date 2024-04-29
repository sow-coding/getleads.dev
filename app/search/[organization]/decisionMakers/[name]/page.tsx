import DecisionMakerPage from "@/components/pagesAsComponent/decisionMaker"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export default async function Feedback() {
  const supabase = createClient()
  
  const { data, error } = await supabase.auth.getUser()

  let verifyRight = false

  if (error || !data?.user) {
    redirect("/login")
  } else if (data.user.user_metadata?.userType == "free") {
    redirect("/notInFreeTrial")
  } else if (data.user.user_metadata?.userType == "premium") {
    verifyRight = true
  }

  return <DecisionMakerPage verifyRight={verifyRight}/>
}
