import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { Dashboard } from '@/components/pagesAsComponent/dashboard';

export default async function PrivatePage() {
  const supabase = createClient()
  
  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect("/login")
  } 

  return <Dashboard userId={data.user.id}/>
}