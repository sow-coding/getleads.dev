import ResultPage from "@/components/pagesAsComponent/result"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export default async function Result() {
  const supabase = createClient()
  let truncated = false
  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect("/login")
  } else if (data.user.user_metadata?.userType === 'free') {
    truncated = true
  }

  return <ResultPage truncated={truncated} userId={data.user.id} email={data.user.email} />
}
