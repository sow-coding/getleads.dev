import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import {SearchPage} from '@/components/pagesAsComponent/search'

export default async function OrganizationSearch() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  } else if (data.user.user_metadata?.userType == "free") {
    if (data.user.user_metadata?.searches === 2) {
      redirect('/upgrade')
    }
  }

  return <SearchPage />
}